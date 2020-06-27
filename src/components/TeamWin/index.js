import React, { useState, useEffect } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import Chart from 'react-apexcharts'
import _ from 'lodash'


const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

const useStyles = makeStyles( theme => ({

}))

export default function TeamWin(props){
    const classes = useStyles()

    const [seasonMatches, setSeasonMatches] = useState([])
    useEffect(() => {
        if(!_.isEmpty(props.data)){
            setSeasonMatches(props.data)
        }
    }, [props.data])

    let winFunction = groupBy('Match_Winner_Id')
    let winsArray = winFunction(seasonMatches)
    let teamList = Object.keys(winsArray)

    let options = {}
    let series = []
    if(!_.isEmpty(winsArray) && !_.isEmpty(teamList)) {

        for(let i=0; i<teamList.length; i++){
            series.push(winsArray[teamList[i]].length)
        }

        options = {
            labels: teamList,
            title: {
                text: 'Team-Wise Win Chart'
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
        }
    }

    console.log('props', seasonMatches)
    console.log('props',series, teamList)


    return (
        <>
            <Grid container justify='center'>
                <Chart className={classes.chart} options={options} series={series} type='donut' width='380' />
            </Grid>
        </>
    )
}