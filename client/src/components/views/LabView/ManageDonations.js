import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";


const styles = makeStyles(theme => ({
    table: {
        'margin-top': '2rem'
    }
}));

const ManageDonations = (props) => {
    let [rows, setRows] = useState([]);


    let classes = styles();

    let getRows = () => {
        fetch(`/api/lab/viewDonations`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({labid: props.id})
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setRows(res);
            })
            .catch((err) => {
                console.error(err);
                // TODO: handle error
            });
    };

    useEffect(() => {
        getRows();
    }, []);

    let handleConfirm = (event) => {
        let data = {};
        console.log(event.target.parentElement.parentElement.parentElement.children);
        data['quantity'] = event.target.parentElement.parentElement.parentElement.children[4].textContent;
        data['reasoncode'] = event.target.parentElement.parentElement.parentElement.children[5].textContent;
        if (data['reasoncode'].trim().length === 1) return;
        data['bloodtype'] = event.target.parentElement.parentElement.parentElement.children[2].textContent;
        data['donationid'] = event.target.parentElement.parentElement.parentElement.children[0].textContent;

        fetch(`/api/lab/report`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                getRows();
            })
            .catch((err) => {
                console.error(err);
                // TODO: handle error
            });
    };

    return  <>
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Donation ID</TableCell>
                        <TableCell align="right">Donor ID</TableCell>
                        <TableCell align="right">Blood Type</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right" >Response Code</TableCell>
                        <TableCell align="right" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (<TableRow key={row.donationid}>
                            <TableCell align={"right"}>{row.donationid}</TableCell>
                            <TableCell align={"right"}>{row.donorid}</TableCell>
                            <TableCell align="right">{row.bloodtype}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align={"right"}>
                                <Select >
                                    <MenuItem value={"yy000"}>yy000</MenuItem>
                                    <MenuItem value={"yy111"}>yy111</MenuItem>
                                    <MenuItem value={"yy999"}>yy999</MenuItem>
                                    <MenuItem value={"gh082"}>gh082</MenuItem>
                                    <MenuItem value={"ef031"}>ef031</MenuItem>
                                    <MenuItem value={"cd087"}>cd087</MenuItem>
                                    <MenuItem value={"ab094"}>ab094</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell><Button variant="contained"
                                  color="secondary"
                                  size={"small"}
                                  onClick={handleConfirm}>Confirm</Button>
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default ManageDonations;