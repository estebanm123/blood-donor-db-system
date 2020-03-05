import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Sidebar from "./Sidebar";
import Typography from "@material-ui/core/Typography";

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        'font-size': '2.5rem',
        'margin': '1rem 1rem 0 0'
    },

}));

const MainPanel = (props) => {

    let classes = styles();

    return (
        <div className={classes.root}>
            <Sidebar
                categories={props.categories}
                handleSelect={props.handleSelect}
                curSelected={props.curSelected}
            />
            <main className={classes.content}>
                <Typography className={classes.title}>{props.title}</Typography>
                {props.displayPanel}
            </main>
        </div>
    );
}

export default MainPanel;