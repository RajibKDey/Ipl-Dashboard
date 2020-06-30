import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'

import CustomPopup from '../CustomPopup'
import BatsmanPerformance from '../BatsmanPerformance'


export default function TopTenBatsman(props){
    let batsmanNames = Object.keys(props.batsmanData)

    const [openPopup, setOpenPopup] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState('')
    const [selectedPlayerMatchdata, setSelectedPlayerMatchData] = useState('')
    
    let batsmanAverageRunAndStrikeRate = []
    batsmanNames.forEach(batsman => {
        let battingDataByPlayer = _.get(props.batsmanData, batsman, '-')
        let runScoredByPlayer = []
        let strikeRateByPlayer = []
        props.matchId.forEach(match => {
            let battingDataByPlayerAndMatch = _.get(battingDataByPlayer, match, '-')
            if(battingDataByPlayerAndMatch !== '-'){
                runScoredByPlayer.push(_.get(battingDataByPlayerAndMatch, 'runs', '-'))
                strikeRateByPlayer.push((_.get(battingDataByPlayerAndMatch, 'runs', '-')/(_.get(battingDataByPlayerAndMatch, 'balls', '-'))*100))
            }
        })
        batsmanAverageRunAndStrikeRate.push({'playerId': batsman, 'runs': (runScoredByPlayer.reduce((a, b) => a + b, 0)/runScoredByPlayer.length).toFixed(2),
                                            'strikeRate': (strikeRateByPlayer.reduce((a, b) => a + b, 0)/strikeRateByPlayer.length).toFixed(2)})
    })
    
    batsmanAverageRunAndStrikeRate = _.sortBy(batsmanAverageRunAndStrikeRate, [function(o) { return parseInt(o.runs); }])

    let topTenId = []
    let topTenRuns = []
    let topTenStrikeRate = []
    for(let i=batsmanAverageRunAndStrikeRate.length - 1; i > batsmanAverageRunAndStrikeRate.length - 11; i--){
        topTenId.push(batsmanAverageRunAndStrikeRate[i].playerId)
        topTenRuns.push(batsmanAverageRunAndStrikeRate[i].runs)
        topTenStrikeRate.push(batsmanAverageRunAndStrikeRate[i].strikeRate)
    }

    let series = [
        {
          name: 'Runs',
          data: topTenRuns
        },
        {
          name: 'Strike Rate',
          data: topTenStrikeRate
        },
    ]

    let options = {
        chart: {
          type: 'area',
          height: 300,
          stacked: true,
          events: {
            click: function(event, chartContext, config) {
                if(config.dataPointIndex !== -1){
                  setSelectedPlayer(topTenId[config.dataPointIndex])
                  setSelectedPlayerMatchData(_.get(props.batsmanData, topTenId[config.dataPointIndex], '-'))
                  setOpenPopup(true)
                }
                // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            }
          },
          toolbar: {
            tools:{
            zoomin: false,
            zoomout: false,
            zoom: false,
            pan: false,
            reset: false,
            download: false,
            },
          }
        },
        title: {
            text: 'Top 10 Batsman By Average Run'
        },
        colors: ['#008FFB', '#00E396'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8,
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        xaxis: {
            categories: topTenId,
            title: {
              text: 'Teams'
            },
        },
        yaxis: {
            title: {
                text: 'Average Runs'
            },
        },
        responsive: [{
            breakpoint: 1280,
            options: {
              chart: {
                width: 420,
                heigth: 480,
              }
            },
          },{
            breakpoint: 960,
            options: {
              chart: {
                width: 550,
                heigth: 550,
              }
            },
          },{
            breakpoint: 600,
            options: {
              chart: {
                width: 350,
                heigth: 350,
              }
            },
          }]
      }

    return (
        <>
            <Grid container justify='center'>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justify='center'>
                        <ReactApexChart options={options} series={series} type="area" height={350} width={600} />
                    </Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justify='center'>
                        <Typography variant='caption'>Click Chart Segments To View More</Typography>
                    </Grid>
                </Grid>
            </Grid>


            { selectedPlayer !=='' && selectedPlayerMatchdata !==''?
              <CustomPopup titleText={selectedPlayer} maxWidth={'sm'} open={openPopup} fullWidth={true} handleClose={() => {setOpenPopup(false); setSelectedPlayer(''); setSelectedPlayerMatchData('')}}>
                  <BatsmanPerformance data={selectedPlayerMatchdata} />
              </CustomPopup>
              :null
            }
        </>
    )
}