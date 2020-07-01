import React from 'react'
import { Grid } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'

export default function BowlerPerformance(props){
    let matchId = Object.keys(props.data)

    let economies = []
    let overs = []
    let wickets = []
    matchId.forEach( match => {
        let matchData = _.get(props.data, match, '-')
        economies.push((matchData.runs/matchData.balls).toFixed(2))
        overs.push((matchData.balls/6).toFixed(2))
        wickets.push(matchData.wickets)
    })
    
    let series = [{
        name: 'Economy',
        data: economies
      }, {
        name: 'Overs',
        data: overs
      }, {
        name: 'Wickets',
        data: wickets
      }]

    let options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            vertical: true,
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
          title: {
            text: 'Match'
          }
        },
        yaxis: {
          title: {
            text: 'Count'
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