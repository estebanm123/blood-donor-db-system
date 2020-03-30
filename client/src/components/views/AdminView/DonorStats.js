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
import Typography from "@material-ui/core/Typography";


const styles = makeStyles(theme => ({
    table: {
        'margin-top': '2rem'
    }
}));

const DonorStats = (props) => {
    let [rows, setRows] = useState([]);

    let classes = styles();

    let getRows = () => {
        fetch(`/api/staff/admin/stats/donors`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setRows(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getRows();
    }, []);


    return  <>
        <Typography>Donors that have donated at every location:</Typography>
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (<TableRow key={row.donorid}>
                            <TableCell >{row.donorid}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default DonorStats;