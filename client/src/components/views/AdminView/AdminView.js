import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import WelcomePanel from "../../menuGenerics/WelcomePanel";
import AddStaff from "./AddStaff";
import MainPanel from "../../menuGenerics/MainPanel";
import AddLab from "./AddLab";
import DonorStats from "./DonorStats";
import Reports from "./Reports";
import AdminRequest from "./AdminRequestView";
import ReserveView from "./DonationReserveView";


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
            case("Donor Stats"):
                displayPanel = <DonorStats />;
                title = 'Donor Stats';
                break;
            case("Reports"):
                displayPanel = <Reports/>;
                title = 'Log Reports';
                break;
            case("Manage Requests"):
                displayPanel = <AdminRequest id={props.id}/>
                title = 'Manage Requests';
                break;
            case("View Reserve"):
                displayPanel = <ReserveView />;
                title = 'Donation Reserves';
                break;
        }
    }

        return (
        <MainPanel
            categories={[{'Nurse': ['Add Nurse']},
            {'Administrator': ['Add Administrator']},
            {'Lab': ['Add Lab', 'Reports']},
            {'Request': ['Manage Requests']},
            {'Donation Reserve': ['View Reserve']},
            {'Stats': ['Donor Stats']}]}
            handleSelect={handleSelect}
            handleLogout={props.handleLogout}
            curSelected={curSelected}
            displayPanel={displayPanel}
            title={title}
        />
    );
}

export default AdminView;