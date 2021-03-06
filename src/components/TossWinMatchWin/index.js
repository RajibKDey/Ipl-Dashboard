import React from 'react'
import { Grid } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'


export default function TossWinMatchWin(props){

    let tossData = {}
    for(let i=0; i<props.data.length; i++){
        let winner = props.data[i].Match_Winner_Id
        if(props.data[i].Toss_Winner_Id === winner){
            let teamId = _.get(tossData, winner, '-')
            if(props.data[i].Toss_Decision === 'field'){
                if(teamId !== '-'){
                    tossData[winner] = {...tossData[winner], field: tossData[winner].field + 1}
                } else {
                    tossData[winner] = {bat: 0, field: 1}
                }
            } else {
                if(teamId !== '-'){
                    tossData[winner] = {...tossData[winner], bat: tossData[winner].bat + 1}
                } else {
                    tossData[winner] = {bat: 1, field: 0}
                }
            }
        }
    }

    let teamList = Object.keys(tossData)
    let batArray = []
    let fieldArray = []
    teamList.forEach(row => {
        batArray.push(tossData[row].bat)
        fieldArray.push(tossData[row].field)
    })

    let series = [{ name: 'Bat', data: batArray}, 
                 {name: 'Field', data: fieldArray}]
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
          text: 'Won Toss And Match'
        },
        xaxis: {
          categories: teamList,
          title:{
            text: 'Match Count'
          },
          labels: {
            formatter: function (val) {
              return val
            }
          }
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
          markers: {
            height: '6px',
            width: '6px',
          },
          itemMargin : {
            horizontal: 20,
          },
          position: 'top',
          horizontalAlign: 'center',
        },
        responsive: [{
          breakpoint: 1280,
          options: {
            chart: {
              width: 420,
              height: 400,
            }
          },
        },{
          breakpoint: 960,
          options: {
            chart: {
              width: 550,
              height: 400,
            }
          },
        },{
          breakpoint: 600,
          options: {
            chart: {
              width: 350,
              height: 400,
            }
          },
        }]
      }

    return (
        <>
          <Grid container justify='center'>
            <ReactApexChart options={options} series={series} type="bar" width='500' heigth= '400'/>
          </Grid>
        </>
    )
}