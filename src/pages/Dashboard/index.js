import React, { useState } from 'react'
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core'
import ballData from '../../static/Ball_by_Ball.json'
import matchData from '../../static/Match.json'


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    width: {
      width: "100%",
      height: '100vh',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0,1),
      ...theme.mixins.toolbar,
    },
    padding: {
      padding: theme.spacing(2),
    },
  })
  )


export default function Dashboard(){
    const classes = useStyles()
    const [season, setSeason] = useState(0)
  
    return (
      <>
        <Paper elevation={0}>
          <Grid container alignItems='center'>
  
            <Grid item>
              <Grid container alignItems='center' className={classes.padding}>
                <Grid item lg={12}>
                  <Grid container justify='center'>
                    <Typography variant='h6'>Total Matches</Typography>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Grid container justify='center'>
                    <Typography variant='h6'>{200}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
  
            <Grid item>
              
            </Grid>
  
            <Grid item>
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
          <Grid container  justify='center' alignItems='center'>
            <Grid item lg={4}>
  
            </Grid>
            <Grid item lg={4}>
              
            </Grid>
            <Grid item lg={4}>
              
            </Grid>
          </Grid>
          <Grid container  justify='center' alignItems='center'>
            <Grid item lg={4}>
  
            </Grid>
            <Grid item lg={4}>
              
            </Grid>
            <Grid item lg={4}>
              
            </Grid>
          </Grid>
        </Paper>
      </>
    )
}