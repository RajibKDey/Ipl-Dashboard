import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, makeStyles, Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    flex1: {
        flex: 1,
    },
}))

function CustomDialog(props){
    const classes = useStyles()

    return (
        <>
            <Dialog
                fullWidth={props.fullWidth}
                maxWidth={props.maxWidth}
                open={props.open}
                onClose={props.handleClose}
            >
                <Grid container alignItems='center'>
                    <Grid item className={classes.flex1}>
                        <DialogTitle id="title">{props.titleText}</DialogTitle>
                    </Grid>
                </Grid>
                <Divider />
                <DialogContent>
                <DialogContentText>
                    {props.children}
                </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        {'Close'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CustomDialog