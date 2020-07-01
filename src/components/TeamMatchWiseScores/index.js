import React from 'react'
import { Grid } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'


export default function TeamMatchWiseScores(props){

    let matches = Object.keys(props.data)
    let teamScorePerMatch = []
    matches.forEach(match => {
        teamScorePerMatch.push(props.data[match]['runs'] + props.data[match]['extras'])
    })

    let options = {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Team Score Per Match ',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], 
            opacity: 0.5
          },
        },
        yaxis: {
          title: {
              text: 'Runs'
          },
        },
        xaxis: {
          title: {
            text: 'Match Count'
          },
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
                <ReactApexChart options={options} series={[{data: teamScorePerMatch}]} type="line" height={350} />
            </Grid>
            
        </>
    )
}