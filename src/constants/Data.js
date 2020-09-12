const RecordTableHeaderData = [
    { headerName:'#', field:'id'},
    { headerName:'First Name', field:'firstName'},
    { headerName:'Last Name', field:'lastName'},
    { headerName:'Phone Number', field:'phoneNumber'},
    { headerName:'Address', field:'Address'},
]

const RecordsFormFieldData = [
    {
        type: "text",
        label: "First Name",
        name: "firstName",
        id: "firstName",
        placeholder: "Enter First Name",
    },
    {
        type: "text",
        label: "Last Name",
        name: "lastName",
        id: "lastName",
        placeholder: "Enter First Name",
    },
    {
        type: "text",
        label: "Phone Number",
        name: "phoneNumber",
        id: "phoneNumber",
        placeholder: "Enter Phone Number",
    },
    {
        type: "text",
        label: "Address",
        name: "Address",
        id: "Address",
        placeholder: "Enter Address",
    },
]

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

export { 
    UsersFieldSchema, 
    dataSchema,
    RecordsFormFieldData,
    RecordTableHeaderData
}