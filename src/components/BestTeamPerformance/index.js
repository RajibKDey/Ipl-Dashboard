import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import ReactApexChart from 'react-apexcharts'
import _ from 'lodash'

import CustomPopup from '../../components/CustomPopup'
import TeamMatchWiseScores from '../TeamMatchWiseScores'

export default function BestTeamPerformance(props){
    
    const [selectedTeam, setSelectedTeam] = useState('')
    const [selectedTeamScores, setSelectedTeamScores] = useState('')
    const [openPopup, setOpenPopup] = useState(false)
    let teamsList = Object.keys(props.teamMatchRuns)
    let averageTeamScores = []
    teamsList.forEach(team => {
      let teamsAllMatchScore = _.get(props.teamMatchRuns, team, '-')
      let scoreByMatch = []
      props.matchId.forEach( match => {
        let matchData = _.get(teamsAllMatchScore, match, '-')
        if(matchData !== '-'){
          scoreByMatch.push(matchData.runs + matchData.extras)
        }
      })
      averageTeamScores.push((scoreByMatch.reduce((a, b) => a + b, 0)/scoreByMatch.length).toFixed(2))
    })

    let options =  {
                    chart: {
                      type: 'bar',
                      height: 350,
                      events:{
                        click: function(event, chartContext, config) {
                          setOpenPopup(true)
                          setSelectedTeam(config.dataPointIndex)
                          setSelectedTeamScores(_.get(props.teamMatchRuns,teamsList[config.dataPointIndex], ''))
                        }
                    }
                    },
                    plotOptions: {
                      bar: {
                        vertical: true
                      }
                    },
                    title: {
                      text: 'Average Run Of Teams'
                    },
                    dataLabels: {
                      enabled: false
                    },
                    xaxis: {
                      categories: teamsList,
                      title: {
                        text: 'Team Names'
                      },
                    },
                    yaxis: {
                      title: {
                        text: 'Runs'
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
                          width: 400,
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
                    <ReactApexChart options={options} series={[{data: averageTeamScores}]} type="bar" height={350} width={500}/>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid container justify='center'>
                        <Typography variant='caption'>Click Chart Segments To View More</Typography>
                    </Grid>
                </Grid>
          </Grid>
          


          { selectedTeam !=='' && selectedTeamScores !== ''?
              <CustomPopup titleText={teamsList[selectedTeam]} maxWidth={'sm'} open={openPopup} fullWidth={true} handleClose={() => {setOpenPopup(false); setSelectedTeam(''); setSelectedTeamScores('')}}>
                  <TeamMatchWiseScores data={selectedTeamScores} />
              </CustomPopup>
              :null
          }
        </>
    )
}