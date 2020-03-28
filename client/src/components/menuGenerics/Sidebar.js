import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useTheme from "@material-ui/core/styles/useTheme";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: {
        'margin-top': '7rem'
    },

    drawerPaper: {
        width: drawerWidth,
        'overflow': 'hidden'
    },
    category: {
        'padding': '0',
        '&:last-child': {
            'border-top': '1px solid lightgrey'
        }
    },
    list: {
        'padding': '0rem'
    },
    subCatsInactive: {
        'display': 'none'
    },
    subCatsActive: {
        'display': 'none',
        'padding-bottom': '0'
    },
    clickableText: {
        'padding': '1.2rem',
        'font-size': '1rem',
        'width': '100%',
        'display': 'block'
    },
    subCats: {
        'display': 'block'
    },
    subCat: {
        'border-top': '1px solid lightgrey',
        'margin-left': '2rem',
        'padding': '.5rem 0'
    },
    unselected: {
        'background-color': '#F7F7F7'
    }

}));

const Sidebar = (props) => {
    const { container } = props;
    const classes = useStyles();
    // following 4 lines ripped from mui for mobile drawer open mechanics
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const handleCatClick = (event) => {
        // janky workaround for clicking sidebar links
        let inactiveSubCatsClass;
        if (document.querySelector('.makeStyles-subCatsInactive-11') !== null) {
            inactiveSubCatsClass = 'makeStyles-subCatsInactive-11';
        } else if (document.querySelector('.jss11')) {
            inactiveSubCatsClass = 'jss11';
        } else if (document.querySelector('.jss294')) {
            inactiveSubCatsClass = 'jss294';
        } else {
            inactiveSubCatsClass = 'jss300';
        }

        let subCats = event.currentTarget.parentElement.querySelector('.' + inactiveSubCatsClass);
        console.log(subCats);
        if (subCats && subCats.classList.contains(inactiveSubCatsClass)) { // if found and is inactive
            subCats.classList.remove(inactiveSubCatsClass);
            let allSubCats = subCats.parentElement.parentElement.parentElement.querySelectorAll('ul');
            for (let list of allSubCats) {
                if (list !== subCats && !list.classList.contains(inactiveSubCatsClass)) {
                    list.classList.add(inactiveSubCatsClass);
                   // let allSubCatsItems = list.querySelectorAll('div[role="button"]');
                    const unselectedClass = document.querySelector('.makeStyles-unselected-16')? 'makeStyles-unselected-16' :
                        document.querySelector('.jss16')? 'jss16' : document.querySelector('.jss304')? 'jss304': 'jss299';

                    if (props.curSelected) props.curSelected.classList.add(unselectedClass);
                }
            }

            props.handleSelect(null);

        }
    }

    const handleSubCatClick = (event) => {
        const unselectedClass = document.querySelector('.makeStyles-unselected-16')? 'makeStyles-unselected-16' :
            document.querySelector('.jss16')? 'jss16' : document.querySelector('.jss304')? 'jss304': 'jss299';


        if (!props.curSelected || (props.curSelected && props.curSelected !== event.currentTarget)) {
            event.currentTarget.classList.remove(unselectedClass);
            if (props.curSelected) props.curSelected.classList.add(unselectedClass);
        }
        props.handleSelect(event.currentTarget);

    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List className={classes.list}>
                {props.categories.map((category, index) => (
                    <ListItem button
                              key={Object.keys(category)[0]}
                              className={classes.category}>
                        <Grid container direction={'column'}>
                            <div onClick={handleCatClick} className={classes.clickableText}>
                                {Object.keys(category)[0]}
                            </div>
                            <List className={`${classes.subCatsInactive} ${classes.subList}`}>
                                {category[Object.keys(category)[0]].map((subCat, index) => (
                                    <ListItem button
                                              key={subCat}
                                              className={`${classes.subCat} ${classes.unselected}`}
                                              onClick={handleSubCatClick}>
                                        <Container>
                                            {subCat}
                                        </Container>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>


                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </Container>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default Sidebar;