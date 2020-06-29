import React, { useState } from 'react'
import { Grid, Typography, Paper, makeStyles, Divider, TextField } from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';

// import Background from '../../static/background1.jpg';

import MatchPlayedPerStadium from '../../components/MatchPlayedPerStadium'
import TossWinMatchWin from '../../components/TossWinMatchWin'
import TeamWin from '../../components/TeamWin'
import BestTeamPerformance from '../../components/BestTeamPerformance'
import TopTenBatsman from '../../components/TopTenBatsman'
import TopTenBowler from '../../components/TopTenBowler'

import { DataCalculater } from '../../helperFunctions'

import classnames from 'classnames'


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
    },
    mdToXl: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    smToXs: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      }
    },
    xs: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      }
    },
    xsplus: {
      [theme.breakpoints.up('xs')]: {
        display: 'none',
      }
    },
    xsDown: {
      [theme.breakpoints.down('xs')]: {
        '& button': {
          padding: '2px',
        },
      }
    },
    text: {
      [theme.breakpoints.down('xs')]: {
        fontSize: '16px',
        fontWeight: '500',
      }
    },
    textColor: {
      color: 'white',
    },
    background: {
      backgroundColor: '#363636',
    },
    paddingBottom: {
      paddingBottom: theme.spacing(2),
    },
    xsJustify: {
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      }
    },
  })
  )


const yearData = {}


export default function Dashboard(){
    const classes = useStyles()
    const [season, setSeason] = useState(1)
    const yearToSeason = {'2008': 1, '2009': 2, '2010': 3, '2011': 4, '2012': 5, '2013': 6, '2014': 7, '2015': 8, '2016': 9, 'All': 10}
    const seasonKey = Object.entries(yearToSeason)
    
    let matchCount, teamwiseBatting, matchId, batsmanScoreByMatch, bowlerWicketsAndDeliveriesByMatch

    if(typeof yearData[season] !== 'undefined'){
      matchCount = yearData[season][0]
      teamwiseBatting  = yearData[season][1]
      matchId = yearData[season][2]
      batsmanScoreByMatch = yearData[season][3]
      bowlerWicketsAndDeliveriesByMatch = yearData[season][4]
    } else {
      const matchDataByYear = DataCalculater(season)
      yearData[season] = matchDataByYear
      matchCount = matchDataByYear[0]
      teamwiseBatting = matchDataByYear[1]
      matchId = matchDataByYear[2]
      batsmanScoreByMatch = matchDataByYear[3]
      bowlerWicketsAndDeliveriesByMatch = yearData[season][4]
    }


    return (
      <>
        <Paper elevation={0} className={classes.backgroundImage}>
          <Grid container className={classnames(classes.padding, classes.background, classes.xsJustify)}>
            <Typography className={classnames(classes.textColor, classes.background)} variant={'h6'}>IPL Dashboard</Typography>
          </Grid>
          <Grid container alignItems='center' className={classes.mdToXl}>
  
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
                      <Typography variant='h6'>{season}</Typography>
                      :<Typography variant='h6'>1-9</Typography>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container alignItems='center' className={classes.smToXs}>
            <Grid item sm={12} xs={12} className={classes.padding}>
                <Grid container>
                  <Grid item sm={6} xs={6}>
                    <Grid container>
                      <Typography className={classes.text} variant='h6'>Total Matches: &nbsp;</Typography>
                      <Typography className={classes.text} variant='h6'>{matchCount.length}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Grid container justify='flex-end'>
                      <Typography className={classes.text} variant='h6'>IPL Season: &nbsp;</Typography>
                      {
                      season < 10?
                        <Typography className={classes.text} variant='h6'>{season}</Typography>
                        :<Typography className={classes.text} variant='h6'>1-9</Typography>
                      }
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} xs={12} className={classes.paddingBottom}>
              <Grid container justify='center'>
                <ToggleButtonGroup
                className={classes.xsDown}
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
              <TopTenBatsman batsmanData={batsmanScoreByMatch} matchId={matchId}/>
            </Grid>
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12}  className={classes.padding}>
              <TopTenBowler bowlerData={bowlerWicketsAndDeliveriesByMatch} matchId={matchId} />
            </Grid>
          </Grid>
        </Paper>
      </>
    )
}