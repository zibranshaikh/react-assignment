import React from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap'

import { RecordsFormFieldData } from '../../constants/Data'
import { InputField } from '../../utils/formutils';

//Modal Component for Add & Edit Printer.
const AddEditRecordModal = props => {
	const { show, handleSubmit, usersFields, handleChangeField, handleResetFields,
			recordMode, validateOnBlur, error, isValid } = props;
	return (
		<Modal show={show} onHide={handleResetFields}>
			<Modal.Body className="modalForm"> 
				<h4 className="page-title">
					Record
				</h4>           
				{RecordsFormFieldData.map((field) => (
					<Row key={field.id} >
						<Col>         
							<Form.Group as={Col}>
								{field.type === 'text' ? 
									<InputField 
										errorMessage={error[field.name]}
										label={field.label}
										placeholder={field.placeholder}
										id={field.id}
										disabled={recordMode !== 'create' && field.name === 'name'}
										type="text"
										name={field.name}
										onChange={(e) => handleChangeField(e)}
										onBlur={(e) => validateOnBlur(e.target.name, usersFields)}
										value={usersFields[field.name]}
									/> 
									: ""
								}
							</Form.Group>
						</Col>
					</Row>)
				)}                
				</Modal.Body>
					<Modal.Footer>
						<Row>
							<Col className="text-center btnGroup" id="button-grp">
								<Button className="btn btn-outline-danger deleteBtn" disabled={!isValid} onClick={() => handleSubmit()}>
									<span> {recordMode === 'create' ? 'Add' : 'Save'}</span>
								</Button>{" "}        
						<Button className="btn  addRecordBtn" onClick={() => handleResetFields()}>
							<span>Cancel</span>
						</Button>        
					</Col>
				</Row>
			</Modal.Footer>
		</Modal>
	)
}
export default AddEditRecordModal;