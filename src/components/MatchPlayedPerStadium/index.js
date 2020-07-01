import React, { useState } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import Chart from 'react-apexcharts'

import StadiumWiseTeamPerformance from '../StadiumWiseTeamPerformance'
import CustomPopup from '../CustomPopup'
import TeamWinLossData from '../TeamWinLossData'

const useStyles = makeStyles( theme => ({
    smDown: {
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.spacing(3),
          }
    }
}))

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export default function MatchPlayedPerStadium(props){
    const classes = useStyles()
    const [stadium, setStadium] = useState('')
    const [stadiumName, setStadiumName] = useState('')
    const [openPopup, setOpenPopup] = useState(false)

    const stadiumMatches = groupBy('Venue_Name')
    let stadiumWiseMatches = stadiumMatches(props.data)
    let stadiumNames = Object.keys(stadiumWiseMatches)
    
    let options = {}
    let series = []
    if(stadiumWiseMatches && stadiumNames) {

        for(let i=0; i<stadiumNames.length; i++){
            series.push(stadiumWiseMatches[stadiumNames[i]].length)
        }

        options = {
            labels: stadiumNames,
            title: {
                text: 'Stadium-Wise Match Count'
            },
            legend: {
                show: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '45%',
                        labels: {
                        }
                    }
                }
            },
            chart:{
                events:{
                    dataPointSelection: function(event, chartContext, config) {
                        if(config.dataPointIndex !== undefined){
                            setStadium(stadiumWiseMatches[stadiumNames[config.dataPointIndex]])
                            setStadiumName(stadiumNames[config.dataPointIndex])
                            setOpenPopup(true)
                        }
                    }
                }
            },
            responsive: [{
              breakpoint: 1280,
              options: {
                chart: {
                  width: 480,
                }
              },
            },{
              breakpoint: 960,
              options: {
                chart: {
                  width: 550,
                }
              },
            },{
              breakpoint: 600,
              options: {
                chart: {
                  width: 350,
                }
              },
            }]
        }
    }

    return (
        <>
        <Grid container justify='center' alignItems='center'>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Grid container justify='center'>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container justify='center'>
                            <Chart className={classes.chart} options={options} series={series} type='donut' width='600' height='300'/>
                        </Grid>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Grid container justify='center'>
                            <Typography variant='caption'>Click Chart Segments To View More</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xl={5} lg={5} md={6} sm={12} xs={12} className={classes.smDown}>
                <Grid container justify='center'>
                    <TeamWinLossData data={props.data} />
                </Grid>
            </Grid>
        </Grid>
            

            { stadiumName && stadium?
                <CustomPopup titleText={stadiumName} maxWidth={'sm'} open={openPopup} fullWidth={true} handleClose={() => {setOpenPopup(false); setStadium(''); setStadiumName('')}}>
                    <StadiumWiseTeamPerformance data={stadium}/>
                </CustomPopup>
                :null            }
        </>
    )
}