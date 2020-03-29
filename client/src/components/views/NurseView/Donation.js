import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useForm } from 'react-hook-form';
import Select from "@material-ui/core/Select";

const styles = makeStyles(theme => ({
    backgroundPaper: {
        '& div.MuiGrid-item': {
            'margin-top': '1rem'
        },
        'margin-top': '2.5rem',
        'padding': '2rem'
    },
    date: {
        width: '12rem'
    },
    submit: {
        'margin': '3rem 0 2rem 0'
    }
}));

const Donation = (props) => {
    let classes = styles();
    const {register, errors, handleSubmit} = useForm();
    const [apiError, setApiError] = useState('');
    const [addSuccessful, setAddSuccessful] = useState(false);
    let handleAddAnother = () => {
        setAddSuccessful(false);
    }

    let onSubmit = (data) => {
        data.nurseID = props.id;
        fetch(`/api/donation/add`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setAddSuccessful(true);
            })
            .catch((err) => {
                console.error(err);
                setApiError('Error submitting request.');
            });
    }
    let display;
    if (addSuccessful) {
        display =
            <Grid container direction={"column"} justify={"space-evenly"} alignItems={"center"}>
                <Grid item>
                    <Typography>Donation successfully added.</Typography>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} onClick={handleAddAnother}>Add another Donation</Button>
                </Grid>
            </Grid>
    } else {
        display =
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction={"column"} justify={"space-evenly"} alignItems={"center"}>
                    <Grid container justify={"space-evenly"} alignItems={"center"}>
                        <Grid item>
                            <TextField name={"Donor ID"}
                                       error={errors["Donor ID"]}
                                       inputRef={register({ required: true, maxLength: 8 })}
                                       label={"Donor ID"}
                                       helperText={errors["Donor ID"]? "Required. 8 chars max." : "Required"}/>
                        </Grid>
                        <Grid item>
                            <TextField name={"Quantity"}
                                       error={errors.Quantity}
                                       inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                       label={"Quantity mL"}
                                       helperText={errors.Quantity? "Required. Positive Integer." : "Required"}/>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button type={"submit"} variant={"contained"} className={classes['submit']}>Submit</Button>
                        <Typography className={classes.apiError}>{apiError} </Typography>
                    </Grid>
                </Grid>
            </form>;
    }


    return (
        <Paper className={classes.backgroundPaper}>
            {display}
        </Paper>

    );
}

export default Donation;