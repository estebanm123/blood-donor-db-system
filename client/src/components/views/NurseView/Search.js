import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";


const styles = makeStyles(theme => ({
}));

const Search = (props) => {

    let classes = styles();
    let handleSubmit = (event) => {

    };

    return (
       <Grid container justify={"center"} alignItems={"center"}>
           <Grid item>
               { /*<Button variant={"contained"} onClick{handleSubmit(handleSubmit)}>View all</Button> */}
           </Grid>
           <Grid item>
               todo implement search
           </Grid>
       </Grid>
    );
}

export default Search;