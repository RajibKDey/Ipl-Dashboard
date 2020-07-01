import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Chart from 'react-apexcharts'
import _ from 'lodash'


const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});


export default function TeamWin(props){

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
              legend: {
                markers: {
                  height: '6px',
                  width: '6px',
                },
                position: 'bottom',
                itemMargin: {
                  horizontal: 10,
                  vertical: 5,
                }
              },
              responsive: [{
                breakpoint: 1280,
                options: {
                  chart: {
                    width: 400,
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
            <Grid container justify='center'>
                <Chart options={options} series={series} type='pie' width='600' height='350'/>
            </Grid>
        </>
    )
}