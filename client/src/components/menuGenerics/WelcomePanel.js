import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Clock from 'react-live-clock';
import Grid from "@material-ui/core/Grid";

const styles = makeStyles(theme => ({
    title: {
        'font-size': '4rem',
        'display': 'block',
        'margin-top': '8rem',
    },
    clock: {
        'font-size': '2.5rem',
        'margin-top': '3rem'
    },
    root: {
        'padding-right': '8rem'
    }

}));

const WelcomePanel = (props) => {

    const classes = styles();

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} className={classes.root}>
           <Grid item>
               <Typography className={classes.title}>Welcome {props.name}</Typography>
           </Grid>
           <Grid item className={classes.clock}>
               <Clock
               format={'HH:mm:ss'}
               ticking={true}
               />
           </Grid>

        </Grid>
    );
}

export default WelcomePanel;