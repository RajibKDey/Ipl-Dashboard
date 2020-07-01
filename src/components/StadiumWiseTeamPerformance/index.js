import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'


export default function StadiumWiseTeamPerformance(props){

    const [stadiumMatches, setStadiumMatches] = useState([])
    useEffect(() => {
        if(!_.isEmpty(props.data)){
            setStadiumMatches(props.data)
        }
    }, [props.data])
    let teamWinLoss = {}
    for(let i=0; i<stadiumMatches.length; i++){
        let opponent = stadiumMatches[i].Opponent_Team_Id
        let team = stadiumMatches[i].Team_Name_Id
        let winner = stadiumMatches[i].Match_Winner_Id
        if(team === winner){
            let valTeam = _.get(teamWinLoss, team, '-')
            let ValOpponent = _.get(teamWinLoss, opponent, '-')
            if(valTeam !== '-'){
                teamWinLoss[team] = {...teamWinLoss[team], 'wins': _.get(teamWinLoss[team], 'wins', 0) + 1}
            } else {
                teamWinLoss[team] = {'wins': 1, 'losses': 0}
            }
            if(ValOpponent !== '-'){
                teamWinLoss[opponent] = {...teamWinLoss[opponent], 'losses': _.get(teamWinLoss[opponent], 'losses', 0) + 1}
            } else {
                teamWinLoss[opponent] = {'wins': 0, 'losses': 1}
            }
        } else {
            let valTeam = _.get(teamWinLoss, team, '-')
            let ValOpponent = _.get(teamWinLoss, opponent, '-')
            if(valTeam !== '-'){
                teamWinLoss[team] = {...teamWinLoss[team], 'losses': _.get(teamWinLoss[team], 'losses', 0) + 1}
            } else {
                teamWinLoss[team] = {'wins': 0, 'losses': 1}
            }
            if(ValOpponent !== '-'){
                teamWinLoss[opponent] = {...teamWinLoss[opponent], 'wins': _.get(teamWinLoss[opponent], 'wins', 0) + 1}
            } else {
                teamWinLoss[opponent] = {'wins': 1, 'losses': 0}
            }
        }
    }
    
    let teamList = Object.keys(teamWinLoss)
    let winArray = []
    let lossArray = []
    teamList.forEach(row => {
        winArray.push(teamWinLoss[row].wins)
        lossArray.push(teamWinLoss[row].losses)
    })
    

    let series = [{ name: 'Wins', data: winArray}, 
                 {name: 'Losses', data: lossArray}]
    let options = {
        chart: {
          type: 'bar',
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: 'Win-Loss Graph Of Teams'
        },
        xaxis: {
          categories: teamList,
          labels: {
            formatter: function (val) {
              return val
            }
          },
          title: {
            text: 'Match Count'
          },
        },
        yaxis: {
          title: {
            text: 'Teams'
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        },
        responsive: [{
          breakpoint: 960,
          options: {
            chart: {
              width: 500,
            }
          },
        },{
          breakpoint: 600,
          options: {
            chart: {
              width: 300,
            }
          },
        }]
      }
    
    
    return (
        <>
          <Grid container justify='center'>
              <ReactApexChart options={options} series={series} type="bar" height={350} width={600}/>
          </Grid>
        </>
    )
}