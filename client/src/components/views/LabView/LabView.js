import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WelcomePanel from "../../menuGenerics/WelcomePanel";
import MainPanel from "../../menuGenerics/MainPanel";
// add managedonation page

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
            // case("Manage Donations"):
            //     displayPanel = <ManageDonations/>;
            //     title = 'Manage Donations';
            //     break;
        }
    }

    return (
        <MainPanel
            categories={[{'Manage Donations': ['']}]}
            handleSelect={handleSelect}
            curSelected={curSelected}
            displayPanel={displayPanel}
            title={title}
        />
    );
}

export default LabView;