import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from 'react-bootstrap';

import { TEXT } from "../utils/TextConstants"
import { APP_ROUTES } from "../utils/enum"


//UniversalErrorPage component
const UniversalErrorPage = (props) => {
	const history = useHistory() 
	//Redirect User to the Clicked actions
	const handleClick = () => {
		history.push(APP_ROUTES.HOME)
	}

	return (
		<>
			<div className={"UniversalErrorPage"}>
				<div className={"UniversalErrorPageDiv"}>
					<div className={"root"}>
						<div
						className={"heading"}
						>
						{TEXT.UNIVERSAL_ERROR_HEAD}
						</div>
						<div
						className={"title"}
						>
						{TEXT.UNIVERSAL_ERROR_SECONDARY}
						</div>
						<div>
							<Button onClick={() => handleClick()}>
							{TEXT.HOME_BUTTON}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
  )
}

export default UniversalErrorPage
