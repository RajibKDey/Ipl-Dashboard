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
      boxShadow: '0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1)',
      flexBasis: '48%',
      height: '46%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        flexBasis: '100%',
        height: 'auto',
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
    }
}))

export default function StatisticalData(props){
    const classes = useStyles()

    let teamIds = Object.keys(props.teamMatchRuns)

    let minTeamScore = 1000, minTeamId = 0, maxTeamScore = 0, maxTeamId = 0
    teamIds.forEach(team => {
        let teamData = _.get(props.teamMatchRuns, team, '-')
        if(teamData !== '-'){
            props.matchId.forEach(match => {
                let matchScoreByTeam = _.get(teamData, match, '-').runs + _.get(teamData, match, '-').extras
                if(minTeamScore > matchScoreByTeam){
                    minTeamScore = matchScoreByTeam
                    minTeamId = team
                }
                if(maxTeamScore < matchScoreByTeam){
                    maxTeamScore = matchScoreByTeam
                    maxTeamId = team
                }
            })
        }
    })

    let batsmanIds = Object.keys(props.batsmanData)
    let maxScorePlayerId = 0, maxScore = 0
    batsmanIds.forEach(batsman => {
        let batsmanData = _.get(props.batsmanData, batsman, '-')
        if(batsmanData !== '-'){
            props.matchId.forEach(match => {
                let matchScoreByPlayer = _.get(batsmanData, match, '-').runs
                if(matchScoreByPlayer !== '-'){
                    if(maxScore < matchScoreByPlayer){
                        maxScore = matchScoreByPlayer
                        maxScorePlayerId = batsman
                    }
                }
            })
        }
    })
    
    
    let bowlerIds = Object.keys(props.bowlerData)
    let maxWicketPlayerId = 0, maxWickets = 0
    bowlerIds.forEach(bowler => {
        let bowlerData = _.get(props.bowlerData, bowler, '-')
        if(bowlerData !== '-'){
            props.matchId.forEach(match => {
                let matchWicketsByPlayer = _.get(bowlerData, match, '-').wickets
                if(matchWicketsByPlayer !== '-'){
                    if(maxWickets < matchWicketsByPlayer){
                        maxWickets = matchWicketsByPlayer
                        maxWicketPlayerId = bowler
                    }
                }
            })
        }
    })


    return (
        <>
            <Grid container className={classnames(classes.height, classes.justifySpaceBetween)}>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item, classes.marginBottom)}>
                    <Typography variant='h3'>{minTeamScore}</Typography>
                    <Typography variant='body2'>was the minimum runs scored by {minTeamId} among all teams in the selected season</Typography>
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item, classes.marginBottom)}>
                    <Typography variant='h3'>{maxTeamScore}</Typography>
                    <Typography variant='body2'>was the maximum runs scored by {maxTeamId} among all teams in the selected season</Typography>
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item, classes.xs)}>
                    <Typography variant='h3'>{maxScore}</Typography>
                    <Typography variant='body2'>was the maximum runs scored by {maxScorePlayerId} among all players in the selected season</Typography>
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={12} className={classnames(classes.item)}>
                    <Typography variant='h3'>{maxWickets}</Typography>
                    <Typography variant='body2'>was the maximum wickets taken by {maxWicketPlayerId} among all players in the selected season</Typography>
                </Grid>
            </Grid>
        </>
    )
}