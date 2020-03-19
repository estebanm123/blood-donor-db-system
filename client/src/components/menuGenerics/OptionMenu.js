import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// class mainly ripped from mui

export default function OptionMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        if (props.options.length !== 0) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleSelect = event => {
        let option  = {name: event.currentTarget.textContent, row: event.currentTarget.getAttribute("data-row")};
        props.handleItemSelect(option);
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: '5rem',
                        width: '20ch',
                    },
                }}
            >
                {props.options.map(option => (
                    <MenuItem key={option} onClick={handleSelect} data-row={props.id}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
