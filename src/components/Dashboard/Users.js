import React, { useState, useEffect } from 'react';
import { Row, Button, Card , Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom"

import TableComponent from '../../common/components/TableComponent';
import AddEditRecordModal from './AddEditRecordModal';
import Validator from '../../utils/formutils/validator';
import ConfirmModal from '../../common/components/ConfirmationModal';
import ConfirmImage from '../../assets/images/delete.svg';
import { InputField } from '../../utils/formutils';
import { setItem, removeItem } from '../../utils/cache';

import { pushNotification } from '../../utils/notifications';
import { CardLoader } from '../../common/components/LoadingSpinner';
import { RecordTableHeaderData } from '../../constants/Data'
import { APP_ROUTES } from '../../utils/enum';

import './Users.css';

//Users component for maintain Users.
const Users = (props) => {
    const history = useHistory()
    //Schema for Users form Fields
    const UsersFieldSchema = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
				Address: '',
		}
		const dataSchema = {
			activeUsers: 0,
			inactiveUsers: 0,
			userLogs: []
		}
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
    const handleCheck = (id) => {
			let Users = usersData.userLogs.length > 0 ? [...usersData.userLogs] : [];
			const index = Users.findIndex(item => item.id === id);
			const newSelectedUsers = usersData.userLogs.length > 0 ? [...selectedUsers] : []
			if(index !== -1){
				if(newSelectedUsers.includes(id)){
					newSelectedUsers.splice(index, 1) 
				}else{
					newSelectedUsers.push(id) 
				}
				setSelectUsers(newSelectedUsers)
			}
		}
    
    // For Users form validation
    const _isValid = (field = null, updatedFields) => {
        const validate = Validator.createValidator(
        { 
					firstName: ['required'],
					lastName: ['required'],
					phoneNumber: ['required', 'integer'],
					Address: ['required'],
				},
        {
					firstName: updatedFields['firstName'],
					lastName: updatedFields['lastName'],
					phoneNumber: updatedFields['phoneNumber'],
					Address: updatedFields['Address'],
				},
					field,
        {
        	firstName: '',
					lastName: '',
					phoneNumber: '',
					Address: '',
				}
        )
        return validate
    }
  
    // Validations on onblur
    const validateOnBlur = (name, fields) => {
			const { errors } = _isValid(name, fields)
			setErrors({ ...error, [name]: errors[name] })
    }
  
    //Function for handle Users form field changes.
    const handleChangeField = (event) => {
        event.preventDefault();
        const value = event.target.value;
				const name = event.target.name;
        const newUsersFields = {...usersFields, [name]: value};
        setUsersFields(newUsersFields);
    }

		//Function for handle Users Search form field changes.
    const handleSearchField = (event) => {
			event.preventDefault();
			const value = event.target.value;
			setSearchValue(value);
			const searchedResults = []
			usersData.userLogs.map(item => {
				Object.keys(item).map(key => {
					const keyValue = item[key]
					if(keyValue.toLowerCase().includes(value) && !searchedResults.includes(item)){
						searchedResults.push(item)
					}
					return null;
				})
				return null;
			})
			setSearchedUsersList(searchedResults)
    }
		
		const onHeaderClick = (field, sorting) => {
			if(usersData.userLogs.length > 0){
				const newRecordList = [...usersData.userLogs]
				newRecordList.sort((a, b) => {
					let firstElement = a[field].toLowerCase()
					let secondElement = b[field].toLowerCase()
					if(sorting === "ascending"){
						if(firstElement < secondElement){
							return -1;
						}
						if(firstElement > secondElement){
							return 1;
						}
					}
					if(sorting === "descending"){
						if( secondElement < firstElement){
							return -1;
						}
						if(secondElement > firstElement){
							return 1;
						}
					}
					return 0
				} )
				setUsersData(newRecordList)
			}
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
			const recordIndex = usersData.userLogs.findIndex(record => record.phoneNumber === usersFields.phoneNumber);
			if(recordMode !== "edit" && recordIndex !== -1){
				pushNotification("Record Already Exists", 'warning', 'TOP_RIGHT', '3000');
				return   
			}
			const newUsersData = usersData.userLogs.length > 0 ? [...usersData.userLogs] : []
			newUsersData.push({...usersFields, id: (usersData.userLogs.length + 1).toString()})
			const data = {
				activeUsers: 231,
				inactiveUsers: 454,
				userLogs: newUsersData
			}
			await setItem('users-Table', JSON.stringify(data))
			getUsersList()
			pushNotification(`Record Created Successfully`, 'success', 'TOP_RIGHT', '3000');
			setUsersFields(UsersFieldSchema);
			setOpenModal(false);         
			setErrors({});       
    }

    //Function for handling submit button of Cofirmation modal.
    const handleSubmitConfirm = async () => {
			const newUsersData = usersData.userLogs.filter(item => !selectedUsers.includes(item.id))
			const data = {
				activeUsers: 231,
				inactiveUsers: 454,
				userLogs: newUsersData
			}
			await setItem('users-Table', JSON.stringify(data))
			
			await getUsersList()
			setSelectUsers([])
			setConfirmModal(false);
		}
		
		const renderTable = () => {
			return (<div id="record-table">
				<TableComponent
					onHeaderClick={onHeaderClick}
					handleCheck={handleCheck}
					tableHeader={RecordTableHeaderData}
					tableData={searchValue ? searchedUsersList : usersData.userLogs}
					selectedUsers={selectedUsers}
				/>
			</div>)
		}

		const renderConfirmModal = () => {
			return (
				<ConfirmModal 
					isOpen={isOpenConfirm} 
					handleSubmitConfirm={handleSubmitConfirm}
					handleCancelConfirm={setConfirmModal} 
					confirmText={`Are you sure you want to delete selected Users?`} 
					pageTitle={'DELETE'} 
					submitButtonText={'Delete'} 
					confirmImage={ConfirmImage} 
				/>
			)
		}

		const renderAddEditRecordModal = () => {
			return (
				<AddEditRecordModal 
					show={openModal}
					error={error}
					isValid={isValid}
					validateOnBlur={validateOnBlur}
					recordMode={recordMode}
					usersFields={usersFields}
					handleChangeField={handleChangeField}
					handleSubmit={handleSubmit}
					handleResetFields={handleResetFields}
				/>
			)
		}

	const { isValid } = _isValid(null, usersFields);
	return (
		<>
			<div className="Usersec page-top">
				<Card body className="userCard border-top-0">
					<h2 className={"menu-items"}>Users</h2>
					<Row className={"menu-items"} onClick={() => history.push(APP_ROUTES.HOME)}>
						<span>Dashboard</span>
					</Row>
					<Row className={"menu-items"} onClick={() => history.push(APP_ROUTES.HOME)}>
						<span>Logs</span>
					</Row>
					<Row onClick={() => { 
							removeItem('users-Table')
							history.push(APP_ROUTES.LOG_IN)
						}
					} className={"menu-items"}>
						<span>Signout</span>
					</Row>
				</Card>
				<div className={"logsCard"}>
					<div className="active-inactive">
						<Card>
							<h5 className="page-title flex1 mt-5">Acitve Users</h5>
							<span>{usersData.activeUsers}</span>
						</Card>
						<Card>
							<h5 className="page-title flex1 mt-5">In Acitve Users</h5>
							<span>{usersData.inactiveUsers}</span>
						</Card>
					</div>
					<Card body className="bodyCard border-top-0">
						<h5 className="page-title flex1 mt-5">Users Table</h5>
						<Row>
							<Col>
								<div className="text-sm-right text-left  d-sm-flex align-items-center justify-content-end btnGroup mb-4 " >
									<Button disabled={selectedUsers.length === 0}  className="mr-2  btn btn-outline-danger deleteBtn btn-sm" onClick={() => setConfirmModal(true)}>
										<span>Delete</span>
									</Button>
									<Button className="btn btn-outline-primary mr-2 addRecordBtn btn-sm " onClick={() => setOpenModal(true)}>
										<span>Add Record</span>
									</Button>
									<div className="mt-2 mt-sm-0 position-relative">
										<InputField 
											disabled={usersData.userLogs.length === 0}
											placeholder={"Search"}
											id={"search"}
											type="text"
											name={"search"}
											onChange={(e) => handleSearchField(e)}
											value={searchValue}
											className="searchField"
										/>
									</div>
									
								</div>
							</Col>
						</Row>
						{ isDataLoading ? <CardLoader /> : renderTable()}
					</Card>
				</div>
				{renderConfirmModal()}
				{renderAddEditRecordModal()}
			</div>
		</>
	);
};

export default Users;