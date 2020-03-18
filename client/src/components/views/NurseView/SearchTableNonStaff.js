import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";

const styles = makeStyles(theme => ({
}));

const SearchTableNonStaff = (props) => {

    let classes = styles();

    console.log(props.categoryName);
    console.log(props.rows[0]);
    let rows = props.rows;

    for (let row of rows) {
        console.log("candonate: " + row.candonate);
    }

    console.log(rows[0]);

    let tableRows = rows.map(row => {
        let candonate = row.candonate;
        return (<TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.birthdate}</TableCell>
                <TableCell align="right">{row.height}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.bloodtype}</TableCell>
            {row.candonate !== undefined?
                    <TableCell align="right">{row.amtrequired}</TableCell>
                    : <TableCell align="right">{candonate.toString()}</TableCell>}
            </TableRow>)
    });

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">BirthDate</TableCell>
                        <TableCell align="right">Height</TableCell>
                        <TableCell align="right">Weight</TableCell>
                        <TableCell align="right">BloodType</TableCell>
                        {props.categoryName === "Patients"?
                                <TableCell align="right">Amount Required</TableCell>
                            : <TableCell align="right">Can donate</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SearchTableNonStaff;