import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WelcomePanel from "../../menuGenerics/WelcomePanel";
import AddNonStaff from "./AddNonStaff";
import MainPanel from "../../menuGenerics/MainPanel";
import SearchNonStaff from "./SearchNonStaff";
import Request from "./Request";
import Transfusion from "./Transfusion";


const styles = makeStyles(theme => ({
}));

const NurseView = (props) => {

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

                displayPanel = <AddNonStaff
                    categoryName={categoryName}
                    extraFieldName={extraFieldName}
                    extraFieldMessage={extraFieldMessage}
                    extraField/>;
                title = `Add ${categoryName}`;
                break;
            case("Search"):
                displayPanel = <SearchNonStaff categoryName={categoryName}/>
                title = `Search ${categoryName}`
                break;
            case("Request"):
                displayPanel = <Request categoryName={categoryName} id={props.id}/>;
                title = `Request blood`;
                break;
            case("Transfusion"):
                displayPanel = <Transfusion id={props.id} />;
                title = `Log Transfusion`;
                break;
        }
    }



        return (
        <MainPanel
            categories={[{'Patients': ['Add', 'Search', 'Request', 'Transfusion']}, {'Donors': ['Add', 'Search', 'Donation']}]}
            handleSelect={handleSelect}
            curSelected={curSelected}
            displayPanel={displayPanel}
            title={title}
        />
    );
}

export default NurseView;