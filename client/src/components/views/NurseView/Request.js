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

const Request = (props) => {

    let classes = styles();
    const {register, errors, handleSubmit} = useForm();
    const [apiError, setApiError] = useState('');
    const [addSuccessful, setAddSuccessful] = useState(false);

    // below 3 lines ripped from MUI to make date look nice
    const [selectedDate, setSelectedDate] = React.useState(new Date('1900-01-02'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    let handleAddAnother = () => {
        setAddSuccessful(false);
    }

    let onSubmit = (data) => {
        let dateOfBirth = document.querySelector('#date-picker-dialog').value;
        if (props.categoryName === 'Donors') {
            let select = document.querySelector('select'); // grab the only select in document - refactor if you add more
            data['canDonate'] = select.value;
        }

        data['birthdate'] = dateOfBirth;
        data['category'] = props.categoryName;

        fetch(`/api/nonstaff/add`, {
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
        let categoryNameSingular = props.categoryName.substring(0, props.categoryName.length - 1);
        display =
            <Grid container direction={"column"} justify={"space-evenly"} alignItems={"center"}>
                <Grid item>
                    <Typography>{categoryNameSingular} successfully added.</Typography>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} onClick={handleAddAnother}>Add another {categoryNameSingular}</Button>
                </Grid>
            </Grid>
    } else {
        display =
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction={"column"} justify={"space-evenly"} alignItems={"center"}>
                    <Grid container justify={"space-evenly"} alignItems={"center"}>
                        <Grid item>
                            <TextField name={"Patient ID"}
                                       error={errors.PatientID}
                                       inputRef={register({ required: true, maxLength: 8 })}
                                       label={"Patient ID"}
                                       helperText={errors.ID? "Required. 8 chars max." : "Required"}/>
                        </Grid>
                        <Grid item>
                            <TextField name={"Admin ID "}
                                       error={errors.AdminID}
                                       inputRef={register({ required: true, maxLength: 8 })}
                                       label={"Admin ID"}
                                       helperText={errors.AdminID? "Required. 8 chars max." : "Required"}/>
                        </Grid>
                        <Grid item className={classes.date}>
                            {/* ripped from mui for nice date picker*/}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    inputRef = {register}
                                    className={classes.date}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container justify={"space-evenly"} alignItems={"center"}>
                        <Grid item>
                            <TextField name={"Blood Type"}
                                       error={errors.BloodType}
                                       inputRef={register({ required: true, maxLength: 2})}
                                       label={"Blood Type"}
                                       helperText={errors.BloodType? "Required. 2 digits max." : "Required"}/>
                        </Grid>
                        <Grid item>
                            <TextField name={"Quantity"}
                                       error={errors.Quantity}
                                       inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                       label={"Quantity mL"}
                                       helperText={errors.Quantity? "Required. Positive Integer.  " : "Required"}/>
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

export default Request;