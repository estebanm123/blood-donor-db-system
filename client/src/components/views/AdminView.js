import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WelcomePanel from "../menuGenerics/WelcomePanel";
import AddNonStaff from "./AddNonStaff";
import AddNurse from "./AddNurse";
import MainPanel from "../menuGenerics/MainPanel";
import Search from "./Search";


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
            case("Add"):
                let extraFieldName = (categoryName === 'Patients')? 'Amount Required ml' : 'Can donate';
                let extraFieldMessage = (categoryName === 'Patients')? 'Required. Positive integers.' : '';

                displayPanel = <AddNurse
                    categoryName={categoryName}
                    extraFieldName={extraFieldName}
                    extraFieldMessage={extraFieldMessage}
                    extraField/>;
                title = `Add ${categoryName}`;
                break;
            case("Search"):
                displayPanel = <Search />

        }
    }



        return (
        <MainPanel
            categories={[{'Nurse': ['Add', 'Search']}, {'Lab': ['Add', 'Search']}, {'Donation Reserve': ['View Reserve']}]}
            handleSelect={handleSelect}
            curSelected={curSelected}
            displayPanel={displayPanel}
            title={title}
        />
    );
}

export default AdminView;