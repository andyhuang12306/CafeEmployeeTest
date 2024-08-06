import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employeeList: {
            rowData: [], colDefs: []
        },
        employeeSingle: {
            name: "",
            email: "",
            phoneNumber: "",
            gender: "",
            cafe: ""
        },
        cafeList:[]
    },
    reducers: {
        get: (state, action) => {
            state.employeeList.rowData = action.payload
        },
        add: (state, action) => {
            state.employeeList.rowData = state.employeeList.rowData.concat(action.payload)
        },
        dlt: (state, action) => {
            state.employeeList.rowData = state.employeeList.rowData.filter(d => d.id != action.payload.id)
        },
        update: (state, action) => {
            state.employeeList.rowData = action.payload
        },
        getSingle: (state, action) => {
            state.employeeSingle = action.payload
        },
        setSingleName: (state, action) => {
            state.employeeSingle.name = action.payload
        },
        setSingleEmail: (state, action) => {
            state.employeeSingle.email = action.payload
        },
        setSinglePhoneNumber: (state, action) => {
            state.employeeSingle.phoneNumber = action.payload
        },
        setSingleGender: (state, action) => {
            state.employeeSingle.gender = action.payload
        },
        setSingleCafe: (state, action) => {
            state.employeeSingle.cafe = action.payload
        },
        getCafeList: (state, action) => {
            state.cafeList= action.payload
        }
    },
})

export const { get, add, dlt, update, getSingle, setSingleName, setSingleEmail, setSinglePhoneNumber, setSingleGender, setSingleCafe , getCafeList} = employeeSlice.actions
export default employeeSlice.reducer