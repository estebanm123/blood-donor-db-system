import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import LoginPane from "./LoginPane";

const styles = makeStyles(theme => ({
    'title-home': {
        'margin-top': '4rem'
    }
}));

const Login = (props) => {

    const classes = styles();

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item >
                <Typography variant="h3" align="center" className={classes["title-home"]}>
                    Blood Donation Management System
                </Typography>
            </Grid>
            <Grid item>
                <LoginPane handleLogin={props.handleLogin}/>
            </Grid>
        </Grid>

    );
}

export default Login;