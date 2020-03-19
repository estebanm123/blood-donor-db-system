import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import OptionMenu from "../../menuGenerics/OptionMenu";
import SaveIcon from '@material-ui/icons/SaveOutlined';
import IconButton from "@material-ui/core/IconButton";
import { useForm } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";

const styles = makeStyles(theme => ({
    textfield: {
        "width": "4.5rem"
    },
    textfieldName: {
        "width": "7rem"
    }
}));

const SearchTableNonStaff = (props) => {
    let classes = styles();

    let [editRow, setEditRow] = useState("");

    const {register, errors, handleSubmit} = useForm();


    useEffect(() => {
        if (props.rows.length === 0) {
            setEditRow("");
        }
    });

    let handleSaveEdit = (event) => {
        handleSubmit(onSave)(event);
    };

    let onSave = (data) => {
        if (props.categoryName === 'Donors') {
            let select = document.querySelector('select'); // grab the only select in document - refactor if you add more
            data['canDonate'] = select.value;
        }

        let id  = document.querySelector('input').parentElement.parentElement.parentElement.previousElementSibling.textContent;
        data['id'] = id;

        fetch(`/api/nonstaff/edit`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                props.submitReload();
                setEditRow("");
            })
            .catch((err) => {
                console.error(err);
                // TODO: add error
            });
    };

    let handleItemSelect = (option) => {
        switch (option.name) {
            case "Edit":
                setEditRow(option.row);
                break;
        }
    };

    let rows = props.rows;
    let tableRows = rows.map(row => {
        let candonate = row.candonate;
        let displayRow;
        if (row.id === editRow) {
            displayRow = (<TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell><TextField name={"Name"}
                                      error={errors.Name}
                                      inputRef={register({ required: true, maxLength: 64 })}
                                      defaultValue={row.name.trim()}
                                      className={classes["textfieldName"]}
                                      helperText={errors.Name? "Required. 64 chars max." : ""}/>
                </TableCell>
                <TableCell align="right">
                    <TextField name={"Email"}
                               error={errors.Email}
                               inputRef={register({ required: true, maxLength: 64 })}
                               defaultValue={row.phone.trim()}
                               className={classes["textfield"]}
                               helperText={errors.Email? "Required. 64 chars max." : ""}/></TableCell>
                <TableCell align="right"><TextField name={"Phone"}
                                                error={errors.Phone}
                                                inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                                defaultValue={row.phone.trim()}
                                                className={classes["textfield"]}
                                                helperText={errors.Phone? "Required. 10 digits max." : ""}/></TableCell>
                <TableCell align="right">{row.birthdate} </TableCell>
                <TableCell align="right"><TextField name={"Height"}
                                                error={errors.Height}
                                                inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                                defaultValue={row.height}
                                                className={classes["textfield"]}
                                                helperText={errors.Height? "Required. Positive Integer.  " : ""}/></TableCell>
                <TableCell align="right"><TextField name={"Weight"}
                                              error={errors.Weight}
                                              inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                                              className={classes["textfield"]}
                                              defaultValue={row.weight}
                                              helperText={errors.Weight? "Required. Positive Integer." : ""}/></TableCell>
               <TableCell align="right"><TextField name={"BloodType"}
                                           error={errors.BloodType}
                                           className={classes["textfield"]}
                                           defaultValue={row.bloodtype.trim()}
                                           inputRef={register({ required: true, maxLength: 6 })}
                                           helperText={errors.BloodType? "Required. Blood Type invalid." : ""}/></TableCell>
                {candonate === undefined?
                    <TableCell align="right"><TextField
                        error={errors['amountRequired']}
                        inputRef={register({ required: true, maxLength: 10, pattern: /^\d+$/ })}
                        name={'amountRequired'}
                        defaultValue={row.amtrequired}
                        helperText={errors['amountRequired']? "Required. Positive Integer." : ""}
                    /></TableCell>
                    : <TableCell align="right"><>
                        <Select native inputRef={register} defaultValue={candonate}>
                            <option value={"true"} >True</option>
                            <option value={"false"} >False</option>
                        </Select>
                    </></TableCell>}
                <TableCell align="right">
                    <IconButton onClick={handleSaveEdit}><SaveIcon /></IconButton>
                </TableCell>
            </TableRow>)
        } else {
            displayRow = (<TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.birthdate}</TableCell>
                <TableCell align="right">{row.height}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.bloodtype}</TableCell>
                {candonate === undefined?
                    <TableCell align="right">{row.amtrequired}</TableCell>
                    : <TableCell align="right">{candonate.toString()}</TableCell>}

                <TableCell align="right">
                    {editRow?
                        <OptionMenu handleItemSelect={handleItemSelect} options={[]} id={row.id}/>
                        : <OptionMenu handleItemSelect={handleItemSelect} options={["Edit"]} id={row.id}/>}
                </TableCell>
            </TableRow>);
        }
        return displayRow
    });

    return (
            <TableContainer component={Paper}>
                <form onSubmit={handleSubmit(onSave)} className={"editForm"}>

                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">BirthDate</TableCell>
                                <TableCell align="right">Height</TableCell>
                                <TableCell align="right">Weight</TableCell>
                                <TableCell align="right">BloodType</TableCell>
                                {props.categoryName === "Patients"?
                                    <TableCell align="right">Amount Required</TableCell>
                                    : <TableCell align="right">Can donate</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableRows}
                        </TableBody>
                    </Table>
                </form>
            </TableContainer>

    );
}

export default SearchTableNonStaff;