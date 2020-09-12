import React from 'react';
import { Row, Card } from 'react-bootstrap';

import { setItem, removeItem } from '../../utils/cache';
import { APP_ROUTES } from '../../utils/enum';

import { pushNotification } from '../../utils/notifications';

import './Users.css';

//Function for handle table checkbox.
export const handleCheckPartial = (id, usersData, setSelectUsers, selectedUsers) => {
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
  

//Function for handle Users form field changes.
export const handleChangeFieldPartial = (event, setUsersFields, usersFields) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    const newUsersFields = {...usersFields, [name]: value};
    setUsersFields(newUsersFields);
}

//Function for handle Users Search form field changes.
export const handleSearchFieldPartial = (event, setSearchedUsersList, setSearchValue, usersData) => {
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

export const onHeaderClickPartial = (field, sorting, usersData, setUsersData) => {
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

//Function for Submit form values for edit & create
export const handleSubmitPartial = async (usersData, recordMode, getUsersList, usersFields) => {
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
  await setItem('users-Table', data)
  getUsersList()
  pushNotification(`Record Created Successfully`, 'success', 'TOP_RIGHT', '3000');
}

//Function for handling submit button of Cofirmation modal.
export const handleSubmitConfirmPartial = async (usersData, selectedUsers, getUsersList, setSelectUsers, setConfirmModal) => {
  const newUsersData = usersData.userLogs.filter(item => !selectedUsers.includes(item.id))
  const data = {
    activeUsers: 231,
    inactiveUsers: 454,
    userLogs: newUsersData
  }
  await setItem('users-Table', data)
  
  await getUsersList()
  setSelectUsers([])
  setConfirmModal(false);
}

export const renderUserCard = (history) => {
  return (
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
  )
}