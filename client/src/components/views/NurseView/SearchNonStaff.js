import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useForm } from 'react-hook-form';
import SearchTableNonStaff from "./SearchTableNonStaff";
import Paper from "@material-ui/core/Paper";
import OptionMenu from "../../menuGenerics/OptionMenu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

const styles = makeStyles(theme => ({
    viewall: {
        'margin': '2rem 0'
    },
    searchOptions: {
        'padding': '2rem 2rem 0 2rem',
        'margin': '2rem',
        'width': '100%'
    },
    checks: {
        'padding-top': '1.5rem'
    },
    searchInput: {
        'margin': '0 1rem',
        'margin-top': '-1rem'
    }
}));

const SearchNonStaff = (props) => {

    let classes = styles();

    const {register, errors, handleSubmit} = useForm();
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [curCat, setCurCat] = useState("");
    const [searchBy, setSearchBy] = useState("Name");

    useEffect(() => {
        if (curCat !== props.categoryName) {
            setCurCat(props.categoryName);
            setResults([]);
        }
    });

    let submitReload = () => {
        handleSearch();
    };

    let onSubmit = (data) => {
        fetch(`/api/nonstaff/search`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                let rows = JSON.parse(res);
                console.log(rows);
                 setResults(rows)

            })
            .catch( (err) => {
                console.error(err);
                setError(`An error has occurred. Could not display ${props.categoryName}`)
            });
    }

    let handleSelect = (event) => {
        setSearchBy(event.target.value);
    };

    let handleSearch = () => {
        let data = {};
        data['field'] = searchBy;
        let searchInput = document.querySelector('input[name="searchInput"]');
        data['searchInput'] = searchInput.value;
        let checkboxes = document.querySelectorAll('span.Mui-checked');
        data['extraFields'] = [];
        for (let checkbox of checkboxes) {
            data['extraFields'].push(checkbox.nextSibling.textContent.trim());
        }
        data['catName'] = props.categoryName;
        onSubmit(data);
    }

    return (
       <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
           <Grid item>
               <Paper className={classes["searchOptions"]}>
                   {/*<Button variant={"contained"} onClick={handleSubmit(onSubmit)} className={classes["viewall"]}>View all</Button>*/}
                    <Grid container direction={"column"}  justify={"center"} alignItems={"center"}>
                        <Grid item>
                            <Typography>Search by: </Typography>
                            <Select
                                value={searchBy}
                                onChange={handleSelect}
                            >
                                <MenuItem value={"Name"}>Name</MenuItem>
                                <MenuItem value={"ID"}>ID</MenuItem>
                                <MenuItem value={"Blood Type"}>Blood Type</MenuItem>
                                <MenuItem value={"Email"}>Email</MenuItem>
                                <MenuItem value={"Phone"}>Phone</MenuItem>

                            </Select>
                            <TextField name={"searchInput"} className={classes.searchInput} label={searchBy}/>
                        </Grid>
                        <Grid item className={classes.checks}>
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Name
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Email
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Phone
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> BirthDate
                            <Checkbox
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                           /> Height
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Weight
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                           />  Blood Type
                            {curCat === "Patients"?
                                (<><Checkbox
                                    inputProps={{ 'aria-label': 'primary checkbox' }}/> Amount Required </>)  :
                                (<><Checkbox
                                        inputProps={{ 'aria-label': 'primary checkbox' }}/> Valid  </>)}
                            </Grid>
                        <Grid item>
                            <Button variant={"contained"} onClick={handleSearch} className={classes["viewall"]}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
               </Paper>
           </Grid>
           <Grid item>
                <SearchTableNonStaff rows={results} categoryName={props.categoryName} submitReload={submitReload}/>
           </Grid>
           {error && <Typography>error</Typography>}
       </Grid>
    );
}

export default SearchNonStaff;