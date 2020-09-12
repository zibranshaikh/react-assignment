import React from 'react';
import { Row, Button, Card , Col } from 'react-bootstrap';
import { InputField } from '../../utils/formutils';

import TableComponent from '../../common/components/TableComponent';
import AddEditRecordModal from './AddEditRecordModal';
import ConfirmModal from '../../common/components/ConfirmationModal';
import ConfirmImage from '../../assets/images/delete.svg';

import { RecordTableHeaderData} from '../../constants/Data'

export const renderTable = (onHeaderClick, handleCheck, searchValue, searchedUsersList, usersData, selectedUsers) => {
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

export const renderConfirmModal = (isOpenConfirm, handleSubmitConfirm, setConfirmModal) => {
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

export const renderAddEditRecordModal = (openModal, error, isValid, validateOnBlur, recordMode,
  setErrors, usersFields, handleChangeField, handleSubmit, handleResetFields) => {
  return (
    <AddEditRecordModal 
      show={openModal}
      error={error}
      isValid={isValid}
      validateOnBlur={(name, fields) => validateOnBlur(name, fields, setErrors, error)}
      recordMode={recordMode}
      usersFields={usersFields}
      handleChangeField={handleChangeField}
      handleSubmit={handleSubmit}
      handleResetFields={handleResetFields}
    />
  )
}

export const renderCardDetail = (usersData) => {
  return (
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
  )
}

export const renderButtonRow = (selectedUsers, usersData, searchValue, handleSearchField, 
  setOpenModal, setConfirmModal) => {
  return (
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
  )
}