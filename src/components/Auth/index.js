import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Row, Button, Card, Form, Col } from 'react-bootstrap';

import Validator from '../../utils/formutils/validator';
import { InputField } from '../../utils/formutils';

import { pushNotification } from '../../utils/notifications';
import { Loader } from '../../common/components/LoadingSpinner';
import { API_ROOT_URL } from '../../constants/URL';
import { APP_ROUTES, ERROR_MESSAGES } from '../../utils/enum';
import { setItem } from '../../utils/cache';
import loginImage from '../../assets/images/sample.png';

import "./index.css";

//Login Form component
const AuthForm = (props) => {
  const history = useHistory()
  const fieldSchema = {
    email: "",
    password: "",
  }
  const [authFields, setAuthFields] = useState(fieldSchema)
  const [error, setError] = useState(fieldSchema)
  const [displayError, setDisplayError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  //Check validations
  const _isValid = (
    field,
    fields
  ) => {
    let validationRules = {
      email: ["required", "email"],
      password: ["required"],
    }
    let state = {
      email: fields.email,
      password: fields.password,
    }
    let validationMessages = {
      email: "",
      password: "",
    }
    
    const validate = Validator.createValidator(
      validationRules,
      state,
      field,
      validationMessages
    )
    return validate
  }

  // Validations on change
  const validateFormElement = (
    name,
    fields
  ) => {
    const validate = _isValid(name, fields)
    const errors = validate.errors
    const newErrors = { ...error, [name]: errors[name] }
    setError(newErrors)
  }

  //update local state and backing login state with new value
  const handleChangeField = (event) => {
    let value = event.target.value
    let name = event.target.name
    const newAuthFields = { ...authFields, [name]: value }
    setAuthFields(newAuthFields)
    validateFormElement(name, newAuthFields)
  }

  //update local state and backing login & singup state with new value
  const handleSubmit = async () => {
    const { isValid } = _isValid(null, authFields)
    if (isValid) {
      setIsLoading(true)
      try {
        const data = {
          username: authFields.email,
          password: authFields.password
        }
        let response = await actionCall(data)
        if (response && response.activeUsers) {
          setDisplayError("")
          setItem("users-Table", response)
          history.push(APP_ROUTES.HOME)
        }
      } catch (e) {
        pushNotification(ERROR_MESSAGES.GENERIC_ERROR, "error")
        console.log("ERROR MESSAGE: ", e.message)
      }
      setIsLoading(false)
    } else {
      const validate = _isValid(null, authFields)
      const errors = validate.errors
      setError(errors)
    }
  }

  //Reusable query call.
  const actionCall = async (data) => {
    let response = await fetch(API_ROOT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let json = await response.json()
    if (json && json.data && json.data) {
      return json.data
    } else if (json.status && json.status === "error") {
      const message = json.message

      setDisplayError(message)
      pushNotification(message, "error")
    }
    return {}
  }

  //login form content
  const renderForm = () => {
    return (
      <>
        <Form.Group as={Col}>
          <InputField
          	errorMessage={error["email"]}
            placeholder={"Email"}
            id={"email"}
            type="text"
            name={"email"}
            onChange={(e) => handleChangeField(e)}
            onBlur={(e) => validateFormElement(e.target.name, authFields)}
            value={authFields["email"]}
          />
          <InputField
          	errorMessage={error["password"]}
            placeholder={"Password"}
            id={"email"}
            type="text"
            name={"password"}
            onChange={(e) => handleChangeField(e)}
            onBlur={(e) => validateFormElement(e.target.name, authFields)}
            value={authFields["password"]}
          />
          {displayError ? <span style={{color: "red"}}>{displayError}</span> : null}
          <Row>
            <Col>
              <Button className="btn btn-outline-primary mr-2 addRecordBtn btn-sm " onClick={handleSubmit}>
                <span>SIGN IN</span>
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </>
    )
  }

  return (
    <div className={"AuthController"}>
      {isLoading && <Loader />}
      <div className={"AuthForm"}>
        <Card body className="login-image border-top-0">
          <img src={loginImage} className="sample-img" alt="login" />
        </Card>
        <Card body className="bodyCard border-top-0">
          <div className={"auth_logoWRP"}>
          <h4 className="page-title">
            Let's Get Started
          </h4> 
            {renderForm()}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AuthForm
