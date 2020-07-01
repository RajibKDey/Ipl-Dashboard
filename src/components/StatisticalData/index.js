import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import classnames from 'classnames'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
    height: {
        height: '100%',
    },
    item: {
      padding: theme.spacing(2),
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '-6px 6px 1px 0 hsla(0,0%,4%,.1), -4px 4px 0 0 hsla(0,0%,4%,.1)',
      border: '0.2px solid rgba(0,0,0,0.12)',
      flexBasis: '48%',
      height: '46%',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        flexBasis: '100%',
        height: 'auto',
        boxShadow: '0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1)',
        border: 'none'
      },
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
    },
    marginBottom: {
        marginBottom: '3.5%',
        [theme.breakpoints.down('md')]: {
            marginBottom: '15px',
        }
    },
    xs: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: '15px',
        }
    },
    h3: {
        fontWeight: 600,
        fontSize: '2.5rem',
        letterSpacing: '-1px',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem'
        }
    },
    body2: {
        fontWeight: 500,
        lineHeight: 1.23,
        color: 'rgba(0,0,0,0.6)',
        fontSize: '1.3rem',
        marginTop: '4px',
        [theme.breakpoints.down('md')]: {
            fontSize: '.9rem'
        }
    }
}))

export default function StatisticalData(props){
    const classes = useStyles()

    let teamIds = Object.keys(props.teamMatchRuns)

    let minTeamScore = 1000, maxTeamScore = 0
    teamIds.forEach(team => {
        let teamData = _.get(props.teamMatchRuns, team, '-')
        if(teamData !== '-'){
            props.matchId.forEach(match => {
                let matchScoreByTeam = _.get(teamData, match, '-').runs + _.get(teamData, match, '-').extras
                if(minTeamScore > matchScoreByTeam){
                    minTeamScore = matchScoreByTeam
                }
                if(maxTeamScore < matchScoreByTeam){
                    maxTeamScore = matchScoreByTeam
                }
            })
        }
    })

    let batsmanIds = Object.keys(props.batsmanData)
    let maxScore = 0
    batsmanIds.forEach(batsman => {
        let batsmanData = _.get(props.batsmanData, batsman, '-')
        if(batsmanData !== '-'){
            props.matchId.forEach(match => {
                let matchScoreByPlayer = _.get(batsmanData, match, '-').runs
                if(matchScoreByPlayer !== '-'){
                    if(maxScore < matchScoreByPlayer){
                        maxScore = matchScoreByPlayer
                    }
                }
            })
        }
    })
    
    
    let bowlerIds = Object.keys(props.bowlerData)
    let maxWickets = 0
    bowlerIds.forEach(bowler => {
        let bowlerData = _.get(props.bowlerData, bowler, '-')
        if(bowlerData !== '-'){
            props.matchId.forEach(match => {
                let matchWicketsByPlayer = _.get(bowlerData, match, '-').wickets
                if(matchWicketsByPlayer !== '-'){
                    if(maxWickets < matchWicketsByPlayer){
                        maxWickets = matchWicketsByPlayer
                    }
                }
            })
        }
    })


    return (
        <>
            <Grid container className={classnames(classes.height, classes.justifySpaceBetween)}>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item, classes.marginBottom)}>
                    <Typography variant='h3' className={classes.h3}>{minTeamScore} Runs</Typography>
                    <Typography variant='body2' className={classes.body2}>Least score by a team</Typography>
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item, classes.marginBottom)}>
                    <Typography variant='h3' className={classes.h3}>{maxTeamScore} Runs</Typography>
                    <Typography variant='body2' className={classes.body2}>Maximum scored by a team</Typography>
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item, classes.xs)}>
                    <Typography variant='h3' className={classes.h3}>{maxScore} Runs</Typography>
                    <Typography variant='body2' className={classes.body2}>Maximum runs by a player</Typography>
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item)}>
                    <Typography variant='h3' className={classes.h3}>{maxWickets} Wickets</Typography>
                    <Typography variant='body2' className={classes.body2}>Maximum wickets by a player</Typography>
                </Grid>
            </Grid>
        </>
    )
}