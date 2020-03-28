import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WelcomePanel from "../../menuGenerics/WelcomePanel";
import AddNonStaff from "./AddNonStaff";
import MainPanel from "../../menuGenerics/MainPanel";
import SearchNonStaff from "./SearchNonStaff";
import Request from "./Request";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


const styles = makeStyles(theme => ({
    table: {
        'margin-top': '2rem'
    }
}));

const Transfusion = (props) => {
    let [rows, setRows] = useState([]);

    let classes = styles();

    let getRows = () => {
        fetch(`/api/transfusion/view`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({nurseid: props.id})
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
        let tnum = event.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
        console.log(tnum);
        fetch(`/api/transfusion/delete`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({tnum: tnum})
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
                            <TableCell>#</TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">BloodType</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Valid</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (<TableRow key={row.transactionnum}>
                                <TableCell align={"right"}>{row.transactionnum}</TableCell>
                                <TableCell align={"right"}>{row.patientid}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                      <TableCell align="right">{row.type}</TableCell>
                                     <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.isvalid.toString()}</TableCell>
                                    <TableCell align="right">{row.dateandtime}</TableCell>
                                    <TableCell align="right">
                                        {row.isvalid? <Button variant="contained"
                                                color="secondary"
                                                size={"small"}
                                                onClick={handleConfirm}>Confirm</Button>
                                            : <Button variant="contained"
                                                      color="secondary"
                                                      size={"small"}
                                                      disabled>Confirm</Button>}
                                    </TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
}

export default Transfusion;