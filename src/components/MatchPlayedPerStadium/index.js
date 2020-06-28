import React, { useState } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import Chart from 'react-apexcharts'

import StadiumWiseTeamPerformance from '../StadiumWiseTeamPerformance'
import CustomPopup from '../CustomPopup'

const useStyles = makeStyles( theme => ({
    chart: {
        '& div': {
            '& svg': {
                '& foreignObject': {
                    '& div': {
                        width: '170px',
                        height: '200px',
                    },
                },
            },
        },
    },
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
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true
                        }
                    }
                }
            },
            chart:{
                events:{
                    click: function(event, chartContext, config) {
                        if(event.explicitOriginalTarget.parentElement.attributes[4] !== undefined){
                            setStadium(stadiumWiseMatches[stadiumNames[event.explicitOriginalTarget.parentElement.attributes[4].value]])
                            setStadiumName(stadiumNames[event.explicitOriginalTarget.parentElement.attributes[4].value])
                            setOpenPopup(true)
                        }
                        // console.log(event.explicitOriginalTarget.parentElement.attributes[4].value)
                        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                    }
                }
            }
        }
    }

    return (
        <>
            <Grid container justify='center'>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justify='center'>
                        <Chart className={classes.chart} options={options} series={series} type='donut' width='500' />
                    </Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justify='center'>
                        <Typography variant='caption'>Click Chart Segments To View More</Typography>
                    </Grid>
                </Grid>
            </Grid>

            { stadiumName && stadium?
                <CustomPopup titleText={stadiumName} maxWidth={'sm'} open={openPopup} fullWidth={true} handleClose={() => {setOpenPopup(false); setStadium(''); setStadiumName('')}}>
                    <StadiumWiseTeamPerformance data={stadium}/>
                </CustomPopup>
                :null
            }
        </>
    )
}