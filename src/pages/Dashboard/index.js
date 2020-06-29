import React, { useState } from 'react'
import { Grid, Typography, Paper, makeStyles, Divider } from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';


// import Background from '../../static/background1.jpg';

import MatchPlayedPerStadium from '../../components/MatchPlayedPerStadium'
import TossWinMatchWin from '../../components/TossWinMatchWin'
import TeamWin from '../../components/TeamWin'
import BestTeamPerformance from '../../components/BestTeamPerformance'


import { DataCalculater } from '../../helperFunctions'
// import classnames from 'classnames'
import _ from 'lodash'


const useStyles = makeStyles(theme => ({
    padding: {
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(2),
    },
    width: {
      width: '100%',
    },
    flex: {
        flex: 1,
    },
    height: {
        height: '350px'
    },
    border: {
        border: '1px solid black'
    },
    background: {
        position: 'fixed',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        '& img': {
          position: 'absolute',
          top: 0, 
          left: 0, 
          right: 0,
          bottom: 0,
          margin: 'auto', 
          minWidth: '50%',
          minHeight: '50%',
          opacity: 0.75,
        }
    }
  })
  )


const yearData = {}


export default function Dashboard(){
    const classes = useStyles()
    const [season, setSeason] = useState(1)
    const yearToSeason = {'2008': 1, '2009': 2, '2010': 3, '2011': 4, '2012': 5, '2013': 6, '2014': 7, '2015': 8, '2016': 9, 'All': 10}
    const seasonKey = Object.entries(yearToSeason)
    
    let matchCount, teamwiseBatting, matchId 

    if(typeof yearData[season] !== 'undefined'){
      matchCount = yearData[season][0]
      teamwiseBatting  = yearData[season][1]
      matchId = yearData[season][2]
    } else {
      const matchDataByYear = DataCalculater(season)
      yearData[season] = matchDataByYear
      matchCount = matchDataByYear[0]
      teamwiseBatting = matchDataByYear[1]
      matchId = matchDataByYear[2]
    }

    return (
      <>
        <Paper elevation={0} className={classes.backgroundImage}>
          <Grid container alignItems='center'>
  
            <Grid item xl={2} lg={2} md={2}>
              <Grid container alignItems='center' className={classes.padding}>
                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Grid container justify='center'>
                    <Typography variant='h6'>Total Matches</Typography>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Grid container justify='center'>
                    <Typography variant='h6'>{matchCount.length}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
  
            <Grid item className={classes.flex}>
                <Grid container justify='center'>
                    <ToggleButtonGroup
                    value={season}
                    exclusive
                    onChange={e => setSeason(yearToSeason[e.target.textContent])}
                    aria-label="text alignment"
                    >
                        {
                          seasonKey.map((row, index) => 
                            (
                              <ToggleButton key={row[0]} value={row[1]}>
                                  <Typography variant='body2'>{row[0]}</Typography>
                              </ToggleButton>
                            )
                          )
                        }
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
  
            <Grid item xl={2} lg={2} md={2}>
              <Grid container alignItems='center' className={classes.padding}>
                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Grid container justify='center'>
                    <Typography variant='h6'>IPL Season</Typography>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12}>
                  <Grid container justify='center'>
                    {
                      season < 10?
                      <Typography variant='h6'>{(_.invert(yearToSeason))[season]}</Typography>
                      :<Typography variant='h6'>1-9</Typography>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
  
          </Grid>
          <Divider/>
          <Grid container  justify='center'>
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} className={classes.padding}>
              <MatchPlayedPerStadium data={matchCount} />
            </Grid>
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} className={classes.padding}>
              <TossWinMatchWin data={matchCount} />
            </Grid>
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} className={classes.padding}>
              <TeamWin data={matchCount} />
            </Grid>
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} className={classes.padding}>
              <BestTeamPerformance teamMatchRuns={teamwiseBatting} matchId={matchId} />
            </Grid>
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} className={classes.padding}>
                    2
            </Grid>
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12}  className={classes.padding}>
                    3
            </Grid>
          </Grid>
        </Paper>
      </>
    )
}