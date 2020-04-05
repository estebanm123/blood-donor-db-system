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
import Checkbox from "@material-ui/core/Checkbox";


const styles = makeStyles(theme => ({
    backgroundPaper: {
        '& div.MuiGrid-item': {
            'margin-top': '1rem'
        },
        'margin-top': '2.5rem',
        'padding': '2rem'
    },
    birthDate: {
        width: '12rem'
    },
    submit: {
        'margin': '3rem 0 2rem 0'
    },
    selectText: {
        'font-size': '.7rem'
    },
    select: {
        'width': '12rem'
    }
}));

const AddNonStaff = (props) => {

    let classes = styles();
    const {register, errors, handleSubmit} = useForm();
    const [apiError, setApiError] = useState('');
    const [addSuccessful, setAddSuccessful] = useState(false);
    const [typeSelected, setTypeSelected] = useState("B+");
    const [canDonate, setCanDonate] = useState(false);

    // below 3 lines ripped from MUI to make date look nice
    const [selectedDate, setSelectedDate] = React.useState(new Date('1900-01-02'));
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    let handleCanDonateTick = () => {
        setCanDonate(!canDonate);
    };

    let handleAddAnother = () => {
        setAddSuccessful(false);
    };

    let handleTypeSelect = (event) => {
        setTypeSelected(event.target.value);
    };

    let onSubmit = (data) => {
        let dateOfBirth = document.querySelector('#date-picker-dialog').value;
        if (props.categoryName === 'Donors') {
            data['canDonate'] = canDonate;
        }
        data["bloodtype"] = typeSelected;
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
    };
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
                        <TextField name={"ID"}
                                   error={errors.ID}
                                   inputRef={register({ required: true, maxLength: 8 })}
                                   label={"ID"}
                                   helperText={errors.ID? "Required. 8 chars max." : "Required"}/>
                    </Grid>
                    <Grid item>
                        <TextField name={"Name"}
                                   error={errors.Name}
                                   inputRef={register({ required: true, maxLength: 64 })}
                                   label={"Name"}
                                   helperText={errors.Name? "Required. 64 chars max." : "Required"}/>
                    </Grid>
                    <Grid item>
                        <TextField name={"Email"}
                                   error={errors.Email}
                                   inputRef={register({ required: true, maxLength: 64 })}
                                   label={"Email"}
                                   helperText={errors.Email? "Required. 64 chars max." : "Required"}/>
                    </Grid>
                </Grid>
                <Grid container justify={"space-evenly"} alignItems={"center"}>
                    <TextField name={"Address"}
                               error={errors.Address}
                               inputRef={register({ required: true, maxLength: 64 })}
                               label={"Address"}
                               helperText={errors.Address? "Required. 255 chars max." : "Required"}/>
                    <Grid item>
                        <TextField name={"Phone"}
                                   error={errors.Phone}
                                   inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                   label={"Phone #"}
                                   helperText={errors.Phone? "Required. 10 digits max." : "Required"}/>
                    </Grid>
                    <Grid item>
                        <TextField name={"Height"}
                                   error={errors.Height}
                                   inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                   label={"Height cm"}
                                   helperText={errors.Height? "Required. Positive Integer.  " : "Required"}/>
                    </Grid>
                </Grid>
                <Grid container justify={"space-evenly"} alignItems={"center"}>
                    <Grid item className={classes.birthDate}>
                        {/* ripped from mui for nice date picker*/}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                inputRef = {register}
                                className={classes.birthDate}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date of birth"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                    </Grid>
                    <Grid item>
                        <TextField name={"Weight"}
                                   error={errors.Weight}
                                   inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                   label={"Weight kg"}
                                   helperText={errors.Weight? "Required. Positive Integer." : "Required"}/>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.selectText}>Blood Type</Typography>
                        <Select value={typeSelected} native onChange={handleTypeSelect} className={classes.select} inputRef={register}>
                            <option value={"B+"} >B+</option>
                            <option value={"AB-"} >AB-</option>
                            <option value={"O+"}> O+</option>
                            <option value={"O-"} >O-</option>
                            <option value={"A-"} >A-</option>
                            <option value={"AB+"}> AB+</option>
                            <option value={"B-"} >B-</option>
                            <option value={"A+"} >A+</option>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container justify={"space-evenly"} alignItems={"center"}>
                    <Grid item>
                        {props.extraFieldName === 'Amount Required ml' &&  <TextField
                            label={props.extraFieldName}
                            error={errors[props.extraFieldName]}
                            inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                            name={props.extraFieldName}
                            helperText={errors[props.extraFieldName]? "Required. Positive Integer." : "Required"}

                        />}
                        {props.extraFieldName === 'Can donate' &&
                        <>
                            <Typography className={classes.selectText}>Can donate</Typography>
                            <Checkbox
                                onChange={handleCanDonateTick}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            {/*<Select native onChange={handleCanDonateSelect} inputRef={register}>*/}
                            {/*    <option value={"true"} >True</option>*/}
                            {/*    <option value={"false"} >False</option>*/}
                            {/*</Select>*/}
                        </>}
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

    export default AddNonStaff;