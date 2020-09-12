import React from 'react';
import { Modal, Button, Col, Row, Image } from 'react-bootstrap'

//Common Modal Component for confirmations.
const ConfirmationModal = props => {
	const { isOpen, handleSubmitConfirm, handleCancelConfirm, confirmText,
		submitButtonText, confirmImage } = props;
	return (        
		<Modal className="text-center attr-modal" show={isOpen} onHide={() => handleCancelConfirm(false)}>
			<Modal.Body>            
				{confirmImage && <Row  className="justify-center">
					<Col>
						<Image src={confirmImage} roundedCircle />
					</Col>
				</Row>}
				<p className="popup-title">Delete</p>
				<p className="Confirmtext">{confirmText}</p>
			</Modal.Body>
			<Modal.Footer>
				<Row>
					<Col className="text-center btnGroup" id="button-grp">
						<Button className="btn btn-outline-danger deleteBtn " onClick={() => handleSubmitConfirm()}>
							<span>{submitButtonText}</span>
						</Button>{" "}        
						<Button  className="btn  addRecordBtn" onClick={() => handleCancelConfirm(false)}>
							<span>Cancel</span>
						</Button>        
					</Col>
				</Row> 
			</Modal.Footer>
		</Modal>	
	)
}
export default ConfirmationModal;