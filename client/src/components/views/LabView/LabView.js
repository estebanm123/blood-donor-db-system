import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WelcomePanel from "../../menuGenerics/WelcomePanel";
import MainPanel from "../../menuGenerics/MainPanel";
import ManageDonations from "./ManageDonations";

const styles = makeStyles(theme => ({
}));

const LabView = (props) => {
    let [curSelected, setCurSelected] = useState(undefined);
    const classes = styles();

    const handleSelect = (selected) => {
        setCurSelected(selected);
    }

    let displayPanel = <WelcomePanel name={props.name} />
    let title = "";
    if (curSelected) {
        let categoryName = curSelected.parentElement.previousElementSibling.textContext;
        let subCategoryName = curSelected.firstChild.textContent;
        switch (subCategoryName) {
            case("View"):
                displayPanel = <ManageDonations id={props.id} />;
                title = 'View Donations';
                break;
        }
    }

    return (
        <MainPanel
            categories={[{'Manage Donations': ['View']}]}
            handleSelect={handleSelect}
            curSelected={curSelected}
            displayPanel={displayPanel}
            title={title}
        />
    );
}

export default LabView;