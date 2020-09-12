import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom"

import { CardLoader } from '../../common/components/LoadingSpinner';
import { UsersFieldSchema, dataSchema } from '../../constants/Data'
import { handleCheckPartial, handleChangeFieldPartial, handleSubmitConfirmPartial,
	renderUserCard, handleSubmitPartial, onHeaderClickPartial, handleSearchFieldPartial} from './PartialMethods'
import { _isValid,  validateOnBlur} from './Validate'
import { renderConfirmModal, renderAddEditRecordModal, renderTable, renderCardDetail, renderButtonRow } from './AdditonalRendering'
import './Users.css';

//Users component for maintain Users.
const Users = (props) => {
	const history = useHistory()
	const [usersFields, setUsersFields] = useState(UsersFieldSchema);
	const [usersData, setUsersData] = useState(dataSchema);
	const [searchedUsersList, setSearchedUsersList] = useState([]);
	const [recordMode, setMode] = useState('create');
	const [selectedUsers, setSelectUsers] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [error, setErrors] = useState({})
	const [isOpenConfirm, setConfirmModal] = useState(false)
	const [isDataLoading, setDataLoading] = useState(false)
	const [searchValue, setSearchValue] =  useState("")

	//Fucntion for get List of Users API.
	const getUsersList = async () => {
		setDataLoading(true)
		const data = localStorage.getItem('users-Table')
		const resArray = data ? JSON.parse(data) : []
		if(resArray.userLogs){
			setUsersData(resArray);
		}
		setDataLoading(false)		
	};

	//Hooks for API call
	useEffect(() => {
			getUsersList();
			// eslint-disable-next-line
	},[]);
	
	// //Function for handle table checkbox.
	const handleCheck = (phoneNumber) => {
		handleCheckPartial(phoneNumber, usersData, setSelectUsers, selectedUsers)
	}

	//Function for handle Users form field changes.
	const handleChangeField = (event) => {
		handleChangeFieldPartial(event, setUsersFields, usersFields)
	}

	//Function for handle Users Search form field changes.
	const handleSearchField = (event) => {
		handleSearchFieldPartial(event, setSearchedUsersList, setSearchValue, usersData) 
	}
	
	const onHeaderClick = (field, sorting) => {
		onHeaderClickPartial(field, sorting, usersData, setUsersData)
	}

	//Function for Reset fields.
	const handleResetFields = () => {
			setMode('create');
			setOpenModal(false);
			setErrors({});
			setUsersFields(UsersFieldSchema);
	}
	
	//Function for Submit form values for edit & create
	const handleSubmit = async () => {
		await handleSubmitPartial(usersData, recordMode, getUsersList, usersFields)
		handleResetFields()  
	}

	//Function for handling submit button of Cofirmation modal.
	const handleSubmitConfirm = async () => {
		handleSubmitConfirmPartial(usersData, selectedUsers, getUsersList, setSelectUsers, setConfirmModal) 
	}

	const { isValid } = _isValid(null, usersFields);
	return (
		<>
			<div className="Usersec page-top">
				{renderUserCard(history)}
				<div className={"logsCard"}>
					{renderCardDetail(usersData)}
					<Card body className="bodyCard border-top-0">
						<h5 className="page-title flex1 mt-5">Users Table</h5>
						{renderButtonRow(selectedUsers, usersData, searchValue, handleSearchField, 
  						setOpenModal, setConfirmModal)}
						{ isDataLoading ? <CardLoader /> : renderTable(onHeaderClick, handleCheck, searchValue, searchedUsersList, usersData, selectedUsers)}
					</Card>
				</div>
				{renderConfirmModal(isOpenConfirm, handleSubmitConfirm, setConfirmModal)}
				{renderAddEditRecordModal(openModal, error, isValid, validateOnBlur, recordMode,
					setErrors, usersFields, handleChangeField, handleSubmit, handleResetFields)}
			</div>
		</>
	);
};

export default Users;