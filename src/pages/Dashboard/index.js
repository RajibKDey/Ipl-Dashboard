import React, { useState, useEffect } from 'react'
import { Grid, Typography, Paper, makeStyles, Divider } from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';

import ballData from '../../static/Ball_by_Ball.json'
import matchData from '../../static/Match.json'
import Background from '../../static/background1.jpg';

import MatchPlayedPerStadium from '../../components/MatchPlayedPerStadium'
import TeamWin from '../../components/TeamWin'

import classnames from 'classnames'


const useStyles = makeStyles(theme => ({
    padding: {
      padding: theme.spacing(2),
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


export default function Dashboard(){
    const classes = useStyles()
    const [season, setSeason] = useState(0)
    const yearToSeason = {'All': 0, '2008': 1, '2009': 2, '2010': 3, '2011': 4, '2012': 5, '2013': 6, '2014': 7, '2015': 8, '2016': 9}
  
    let matchCount = []
    if(season === 0){
        matchCount = matchData
    } else {
        for (let i = 0; i < matchData.length; i++) {
            if(matchData[i].Season_Id === season){
                matchCount.push(matchData[i])
            }
            if(matchCount > 0 && matchData[i].Season_Id !== season){
                break
            }
        } 
    }

    return (
      <>
        {/* <div className={classes.background}>
          <img src={Background} alt="" />
        </div> */}
        <Paper elevation={0} className={classes.backgroundImage}>
          <Grid container alignItems='center'>
  
            <Grid item lg={2}>
              <Grid container alignItems='center' className={classes.padding}>
                <Grid item lg={12}>
                  <Grid container justify='center'>
                    <Typography variant='h6'>Total Matches</Typography>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
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
                        <ToggleButton value={0}>
                            <Typography variant='body2'>All</Typography>
                        </ToggleButton>
                        <ToggleButton value={1}>
                            <Typography variant='body2'>2008</Typography>
                        </ToggleButton>
                        <ToggleButton value={2}>
                            <Typography variant='body2'>2009</Typography>
                        </ToggleButton>
                        <ToggleButton value={3}>
                            <Typography variant='body2'>2010</Typography>
                        </ToggleButton>
                        <ToggleButton value={4}>
                            <Typography variant='body2'>2011</Typography>
                        </ToggleButton>
                        <ToggleButton value={5}>
                            <Typography variant='body2'>2012</Typography>
                        </ToggleButton>
                        <ToggleButton value={6}>
                            <Typography variant='body2'>2013</Typography>
                        </ToggleButton>
                        <ToggleButton value={7}>
                            <Typography variant='body2'>2014</Typography>
                        </ToggleButton>
                        <ToggleButton value={8}>
                            <Typography variant='body2'>2015</Typography>
                        </ToggleButton>
                        <ToggleButton value={9}>
                            <Typography variant='body2'>2016</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
  
            <Grid item lg={2}>
              <Grid container alignItems='center' className={classes.padding}>
                <Grid item lg={12}>
                  <Grid container justify='center'>
                    <Typography variant='h6'>IPL Season</Typography>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Grid container justify='center'>
                    {
                      season?
                      <Typography variant='h6'>{season}</Typography>
                      :<Typography variant='h6'>1-9</Typography>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
  
          </Grid>
          <Divider/>
          <Grid container  justify='center' alignItems='center'>
            <Grid item lg={4} className={classnames(classes.border, classes.height, classes.padding)}>
              <MatchPlayedPerStadium data={matchCount} />
            </Grid>
            <Grid item lg={4} className={classnames(classes.border, classes.height)}>
                    2
            </Grid>
            <Grid item lg={4} className={classnames(classes.border, classes.height, classes.padding)}>
              <TeamWin data={matchCount} />
            </Grid>
          </Grid>
          <Grid container  justify='center' alignItems='center'>
            <Grid item lg={4} className={classnames(classes.border, classes.height)}>
                    1
            </Grid>
            <Grid item lg={4} className={classnames(classes.border, classes.height)}>
                    2
            </Grid>
            <Grid item lg={4} className={classnames(classes.border, classes.height)}>
                    3
            </Grid>
          </Grid>
        </Paper>
      </>
    )
}