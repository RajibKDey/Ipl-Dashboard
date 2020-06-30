import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import classnames from 'classnames'


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
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
    },
    marginBottom: {
        marginBottom: '3.5%',
    }
}))

export default function StatisticalDataOnStadium(props){
    const classes = useStyles()

    return (
        <>
            <Grid container className={classnames(classes.height, classes.justifySpaceBetween)}>
                <Grid item xl={6} lg={6} sm={6} xs={6} className={classnames(classes.item, classes.marginBottom)}>
                    121
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={6} className={classnames(classes.item, classes.marginBottom)}>
                    122
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={6} className={classes.item}>
                    123
                </Grid>
                <Grid item xl={6} lg={6} sm={6} xs={6} className={classes.item}>
                    124
                </Grid>
            </Grid>
        </>
    )
}