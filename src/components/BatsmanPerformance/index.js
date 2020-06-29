import React from 'react'
import { Grid } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'

export default function BatsmanPerformance(props){

    console.log(props.data)
    let matchId = Object.keys(props.data)

    let runs = []
    let strikeRate = []
    let fours = []
    let sixes = []
    matchId.forEach( match => {
        let matchData = _.get(props.data, match, '-')
        runs.push(matchData.runs)
        strikeRate.push(((matchData.runs/matchData.balls)*100).toFixed(2))
        fours.push(matchData.fours)
        sixes.push(matchData.sixes)
    })

    let series = [{
        name: 'Strike Rate',
        data: strikeRate
      }, {
        name: 'Runs',
        data: runs
      }, {
        name: 'Fours',
        data: fours
      }, {
        name: 'Sixes',
        data: sixes
      }]

    let options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: matchId,
          title: {
            text: 'Count'
          }
        },
        yaxis: {
          title: {
            text: 'Match'
          }
        },
        fill: {
          opacity: 1
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
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </Grid>
        </>
    )
}