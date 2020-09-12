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
        placeholder: "Enter First Name",
    },
    {
        type: "text",
        label: "Address",
        name: "Address",
        id: "Address",
        placeholder: "Enter Address",
    },
]

export { 
    RecordsFormFieldData,
    RecordTableHeaderData
}