import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useForm } from 'react-hook-form';
import Select from "@material-ui/core/Select";


// need to assure that the locationID being added exists in the location table
// or else it will say 'successfully added' but won't be added

const styles = makeStyles(theme => ({
    backgroundPaper: {
        '& div.MuiGrid-item': {
            'margin-top': '1rem'
        },
        'margin-top': '2.5rem',
        'padding': '2rem'
    },
    submit: {
        'margin': '3rem 0 2rem 0'
    }
}));

const AddStaff = (props) => {

    let classes = styles();
    const {register, errors, handleSubmit} = useForm();
    const [apiError, setApiError] = useState('');
    const [addSuccessful, setAddSuccessful] = useState(false);

    // below 3 lines ripped from MUI to make date look nice
    const [selectedDate, setSelectedDate] = React.useState(new Date('1900-01-02'));
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    let handleAddAnother = () => {
        setAddSuccessful(false);
    }

    let onSubmit = (data) => {       
        data['category'] = props.categoryName;
       // console.log(data);

        fetch(`/api/staff/add`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((res) => {
                console.log(res);
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
                    <Typography>{props.categoryName} successfully added.</Typography>
                </Grid>
                <Grid item>
                    <Button variant={"contained"} onClick={handleAddAnother}>Add another {props.categoryName}</Button>
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
                        <TextField name={"Password"}
                                   error={errors.Password}
                                   inputRef={register({ required: true, maxLength: 32 })}
                                   label={"Password"}
                                   helperText={errors.Password? "Required. 32 chars max." : "Required"}/>
                    </Grid>
                    {/* <Grid item>
                        <TextField name={"LocationID"}
                                   error={errors.LocationID}
                                   inputRef={register({ required: true, maxLength: 8})}
                                   label={"LocationID"}
                                   helperText={errors.LocationID? "Required. 8 chars max." : "Required"}/>
                    </Grid> */}
                </Grid>
                <Grid container justify={"space-evenly"} alignItems={"center"}>
                    <TextField name={"Email"}
                               error={errors.Email}
                               inputRef={register({ required: true, maxLength: 64 })}
                               label={"Email"}
                               helperText={errors.Email? "Required. 255 chars max." : "Required"}/>
                    <Grid item>
                        <TextField name={"Phone"}
                                   error={errors.Phone}
                                   inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                   label={"Phone"}
                                   helperText={errors.Phone? "Required. 10 digits max." : "Required"}/>
                    </Grid>
                    <Grid item>
                        <TextField name={"Name"}
                                   error={errors.Name}
                                   inputRef={register({ required: true, maxLength: 10 })}
                                   label={"Name"}
                                   helperText={errors.Name? "Required. 64 chars max.  " : "Required"}/>
                    </Grid>
                </Grid>
                <Grid container justify={"space-evenly"} alignItems={"center"}>
                    <Grid item>
                        {props.extraFieldName === 'LocationID' &&  <TextField
                            label={props.extraFieldName}
                            error={errors[props.extraFieldName]}
                            inputRef={register({ required: true, maxLength: 8})}
                            name={props.extraFieldName}
                            helperText={errors[props.extraFieldName]? "Required. 8 chars max." : "Required"}
                        />}
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

    export default AddStaff;