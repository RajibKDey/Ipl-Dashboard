import React from 'react'
import { Grid } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'


export default function TeamMatchWiseScores(props){

    // console.log(props.data)
    let matches = Object.keys(props.data)
    let teamScorePerMatch = []
    matches.forEach(match => {
        teamScorePerMatch.push(props.data[match]['runs'] + props.data[match]['extras'])
    })
    console.log(teamScorePerMatch)

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
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        yaxis: {
            title: {
                text: 'Runs'
            },
        }
      }

    return (
        <>
            <Grid container justify='center'>
                <ReactApexChart options={options} series={[{data: teamScorePerMatch}]} type="line" height={350} />
            </Grid>
            
        </>
    )
}