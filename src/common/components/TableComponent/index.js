import React, {useState} from 'react';
import { Table, Card, Form } from 'react-bootstrap';

import docsImage from '../../../assets/images/docs.svg';

const TableComponent = (props) => {
	const { tableHeader, tableData, className, handleCheck, selectedUsers, onHeaderClick } = props;
	const [sortType, setSortType ] = useState({})
	
	const handleHeaderClick = (field) => {
		let sorting = sortType[field]
		sorting = sorting && sorting === "ascending" ? "descending" : "ascending" 
		const newSortType = {...sortType, [field]: sorting}
		setSortType(newSortType)
		onHeaderClick(field, sorting)
	}

	return (
		<>
			<Table responsive="md" className={className || ''}>
				<thead>
					<tr>
						<th></th>
							{tableHeader && tableHeader.length > 0 && 
								tableHeader.map((header, index) => (
								<th key={index} onClick={() => handleHeaderClick(header.field)}>{header.headerName}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableData && tableData.length > 0 ? tableData.map((data, index) => (
						<tr key={index}> 
						<td>                       
							<Form.Group className="mb-0">
								<Form.Check 
									type="checkbox" 
									checked={selectedUsers.includes(data.id)}
									onChange={() => handleCheck(data.id)}
								/>
							</Form.Group> 
						</td>
							 
							{tableHeader && tableHeader.length > 0 && 
								tableHeader.map((header, inde) =>                         
								<td key={header.field}>{data[header.field]}</td>
							)}
						</tr>
					)) 
					:
						<tr>
							<td align="center" colSpan="8" height="200" valign="center">
							<Card.Img variant="top" src={docsImage} className="img-fluid docIMg mt-5"  />
						<Card.Title>No Records Found</Card.Title>
							</td>
						</tr>
					}                
				</tbody>
			</Table>
		</>
	)
}
export default TableComponent;