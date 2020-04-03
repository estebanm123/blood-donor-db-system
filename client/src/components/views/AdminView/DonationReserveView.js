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


const styles = makeStyles(theme => ({
    table: {
        'margin-top': '2rem'
    }
}));

const DonationReserveView = (props) => {
    let [rows, setRows] = useState([]);

    let classes = styles();

    let getRows = () => {
        fetch(`/api/reserveView/view`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({adminID: props.id})
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

    return  <>

        <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Bloodtype</TableCell>
                            <TableCell  align="center">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (<TableRow key={row.typestored}>
                                <TableCell align="center">{row.typestored}</TableCell>
                                     <TableCell align="center">{row.quantity}</TableCell>
        
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
}

export default DonationReserveView;