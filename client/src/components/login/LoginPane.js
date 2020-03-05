import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = makeStyles(theme => ({
    'login-paper': {
        padding: '2.5rem 5rem',
        'margin-top': '4rem',
        width: '30rem'
    },
    'login-details': {
        '& > * > input, > * > p': {
           display: 'inline'
        },
        '& > :first-child > p': {
            'margin-right': '1rem'
        },
        '& > :nth-child(2) > :first-child': {
            'margin-right': '1rem'
        },
        '& > div:first-child': {
            'margin-bottom': '1.5rem'
        }
    },
    'submit': {
        'margin-top': '4rem'
    }


}));

const LoginPane = (props) => {

    const classes = styles();

    let [error, setError] = useState(false);
    let [statusMessage, setStatusMessage] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let formData = {};
        let inputs = event.target.querySelectorAll('input');
        formData["userType"] = event.target.querySelector('select').value;
        formData["id"] = inputs[0].value;
        formData["password"] = inputs[1].value;

        fetch(`/api/login`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!res || res === "error") {
                    throw new Error();
                }
                let parsedRes = JSON.parse(res);
                if (parsedRes.rows.length !== 0) {
                    let userInfo = parsedRes.rows[0];
                    userInfo['userType'] = formData['userType'];
                    props.handleLogin(userInfo);
                } else {
                    setStatusMessage("This ID password combo does not exist.");
                    setError(true);
                }
            })
            .catch( (err) => {
                console.error(err);
                setStatusMessage("An error has occurred.");
                setError(true);
            });
    }


    return (
        <Paper className={classes['login-paper']}>
            <form onSubmit={handleFormSubmit}>
                <Grid container direction="column" justify="center" alignItems="center" className={classes["login-details"]}>
                    <Grid item>
                        <Typography>Login as: </Typography>
                        <Select native>
                            <option value={"Nurse"} >Nurse</option>
                            <option value={"Admin"} >Admin</option>
                            <option value={"Lab"} >Lab</option>
                        </Select>
                    </Grid>
                    <Grid item>
                        <TextField error={error} label={"ID"} helperText={statusMessage}/>
                        <TextField error={error} type={"password"} label={"Password"} />
                    </Grid>
                    <Grid item>
                        <Button type={"submit"} variant={"contained"} className={classes['submit']}>Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>


    );
}

export default LoginPane;