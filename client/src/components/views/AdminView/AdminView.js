import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WelcomePanel from "../../menuGenerics/WelcomePanel";
import AddStaff from "./AddStaff";
import MainPanel from "../../menuGenerics/MainPanel";
import AddLab from "./AddLab";
import Reports from "./Reports";


const styles = makeStyles(theme => ({
}));

const AdminView = (props) => {

    let [curSelected, setCurSelected] = useState(undefined);
    const classes = styles();

    const handleSelect = (selected) => {
        setCurSelected(selected);
    }


    let displayPanel = <WelcomePanel name={props.name} />;
    let title = "";
    if (curSelected) { // if user has clicked on a suboption -> switch the displaypanel
        let categoryName = curSelected.parentElement.previousElementSibling.textContent;
        let subCategoryName = curSelected.firstChild.textContent;
        switch (subCategoryName) {

            case("Add Nurse"):
            case("Add Administrator"):
                let extraFieldName = (categoryName === 'Nurse')? 'LocationID' : '';
                let extraFieldMessage = (categoryName === 'Nurse')? 'Required. 8 chars max..' : '';
                displayPanel = <AddStaff
                    categoryName={categoryName}
                    extraFieldName={extraFieldName}
                    extraFieldMessage={extraFieldMessage}
                    extraField/>;
                title = `Add New ${categoryName}`;
                break;
            case("Add Lab"):
                displayPanel = <AddLab />;
                title = 'Add New Lab';
                break;
            case("Reports"):
                displayPanel = <Reports />;
                title = 'Log Reports';
                break;
        }
    }

        return (
        <MainPanel
            categories={[{'Nurse': ['Add Nurse', 'Search']},
            {'Administrator': ['Add Administrator', 'Search']},
            {'Lab': ['Add Lab', 'Search', 'Reports']},
            {'Donation Reserve': ['View Reserve']}]}
            handleSelect={handleSelect}
            curSelected={curSelected}
            displayPanel={displayPanel}
            title={title}
        />
    );
}

export default AdminView;