import React, { useState } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'

import CustomPopup from '../CustomPopup'
import BowlerPerformance from '../BowlerPerformance'

const useStyles= makeStyles(theme => ({
  xs: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
  },
  }
}))


export default function TopTenBowler(props){
    const classes = useStyles()
    let bowlerNames = Object.keys(props.bowlerData)

    const [openPopup, setOpenPopup] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState('')
    const [selectedPlayerMatchdata, setSelectedPlayerMatchData] = useState('')

    let BowlerAverageEconomyAndWicket = []
    bowlerNames.forEach(bowler => {
        let bowlingDataByPlayer = _.get(props.bowlerData, bowler, '-')
        let bowlingEconomy = []
        let wickets = []
        props.matchId.forEach(match => {
            let bowlingDataByPlayerAndMatch = _.get(bowlingDataByPlayer, match, '-')
            if(bowlingDataByPlayerAndMatch !== '-'){
                bowlingEconomy.push(_.get(bowlingDataByPlayerAndMatch, 'runs', '-')/(_.get(bowlingDataByPlayerAndMatch, 'balls', '-')/6))
                wickets.push(_.get(bowlingDataByPlayerAndMatch, 'wickets', '-'))
            }
        })
        BowlerAverageEconomyAndWicket.push({'playerId': bowler, 'runs': (bowlingEconomy.reduce((a, b) => a + b, 0)/bowlingEconomy.length).toFixed(2),
                                            'wickets': (wickets.reduce((a, b) => a + b, 0)/wickets.length).toFixed(2)})
    })

    BowlerAverageEconomyAndWicket.sort(function (a, b) {
        return a.runs - b.runs || b.wickets - a.wickets;
    });

    let topTenId = []
    let topTenEconomy = []
    let topTenWicket = []
    for(let i=0; i<10; i++){
        topTenId.push(BowlerAverageEconomyAndWicket[i].playerId)
        topTenEconomy.push(BowlerAverageEconomyAndWicket[i].runs)
        topTenWicket.push(BowlerAverageEconomyAndWicket[i].wickets)
    }

    let series = [
        {
          name: "Average Economy",
          data: topTenEconomy
        },
        {
          name: "Average Wickets",
          data: topTenWicket
        }
    ]

    let options = {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          },
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
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Average Economy and Wicket',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: topTenId,
          title: {
            text: 'Players'
          }
        },
        yaxis: {
          title: {
            text: 'Count'
          },
          min: 0,
          max: 10
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
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
                        <ReactApexChart options={options} series={series} type="line" height={350} width={600}/>
                    </Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.xs}>
                    <Grid container justify='center'>
                        <Typography variant='caption'>Click Chart Segments To View More</Typography>
                    </Grid>
                </Grid>
            </Grid>


            { selectedPlayer !=='' && selectedPlayerMatchdata !==''?
              <CustomPopup titleText={selectedPlayer} maxWidth={'sm'} open={openPopup} fullWidth={true} handleClose={() => {setOpenPopup(false); setSelectedPlayer(''); setSelectedPlayerMatchData('')}}>
                  <BowlerPerformance data={selectedPlayerMatchdata} />
              </CustomPopup>
              :null
            }
        </>
    )
}