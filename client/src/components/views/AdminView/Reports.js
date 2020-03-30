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
import Typography from "@material-ui/core/Typography";


const styles = makeStyles(theme => ({
    table: {
        'margin-top': '2rem'
    }
}));

const Reports = (props) => {
    let [rows, setRows] = useState([]);
    let [stats, setStats] = useState([]);
    let [total, setTotal] = useState([]);

    let classes = styles();
    let i = -1;

    let getRows = () => {
        fetch(`/api/report/view`, {
            method: 'POST',
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
                // TODO: handle error
            });
    };

    let getStat = () => {
        fetch(`/api/report/stat`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setStats(res);
            })
            .catch((err) => {
                console.error(err);
                // TODO: handle error
            });
    };

    let getTotal = () => {
        fetch(`/api/report/total`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setTotal(res);
            })
            .catch((err) => {
                console.error(err);
                // TODO: handle error
            });
    };

    useEffect(() => {
        getRows();
        getStat();
        getTotal();
        console.log(stats);
    }, []);

    return  <>

        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">ReportID</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Compatibility</TableCell>
                        <TableCell align="right">LabID</TableCell>
                        <TableCell align="right">BloodType</TableCell>
                        <TableCell align="right" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (<TableRow key={row.reportid}>
                            <TableCell align={"right"}>{row.reportid}</TableCell>
                            <TableCell align={"right"}>{row.date}</TableCell>
                            <TableCell align="right">{row.iscompatible.toString()}</TableCell>
                            <TableCell align="right">{row.labid}</TableCell>
                            <TableCell align="right">{row.bloodtype}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">LabID</TableCell>
                        <TableCell align="right"># Failed Blood Tests</TableCell>
                        <TableCell align="right"># Total Blood Tests</TableCell>
                        <TableCell align="right" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stats.map(stat => {
                        i++;
                        return (<TableRow key={stat.labid}>
                            <TableCell align={"right"}>{stat.labid}</TableCell>
                            <TableCell align={"right"}>{stat.numfail}</TableCell>
                            <TableCell align={"right"}>{total[i].totalnum}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>

    </>
}

export default Reports;