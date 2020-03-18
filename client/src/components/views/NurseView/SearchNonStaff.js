import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useForm } from 'react-hook-form';
import SearchTableNonStaff from "./SearchTableNonStaff";

const styles = makeStyles(theme => ({
    viewall: {
        'margin': '2rem 0'
        }
}));

const SearchNonStaff = (props) => {

    let classes = styles();

    const {register, errors, handleSubmit} = useForm();
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [curCat, setCurCat] = useState("");

    useEffect(() => {
        if (curCat !== props.categoryName) {
            setCurCat(props.categoryName);
            setResults([]);
        }
    });

    let onSubmit = (event) => {
        fetch(`/api/nonstaff/search`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({catName: props.categoryName})
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

    return (
       <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
           <Grid item>
               <Button variant={"contained"} onClick={handleSubmit(onSubmit)} className={classes["viewall"]}>View all</Button>
           </Grid>
           <Grid item>
                <SearchTableNonStaff rows={results} categoryName={props.categoryName} />
           </Grid>
           {error && <Typography>error</Typography>}
       </Grid>
    );
}

export default SearchNonStaff;