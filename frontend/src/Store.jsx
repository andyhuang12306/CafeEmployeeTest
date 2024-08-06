import { configureStore } from '@reduxjs/toolkit'
import CafeSlice from './reducers/CafeSlice'
import EmployeeSlice from './reducers/EmployeeSlice'
import AppSlice from './reducers/AppSlice'

const cafeList = { rowData: [], colDefs: [] }

const employeeList = { rowData: [], colDefs: [] }

const data=[
    ["Location", "Cafés", "Employees"],
    ["North", 0, 0],
    ["East", 0, 0],
    ["South", 0, 0],
    ["West", 0, 0]]

const store = configureStore({
    reducer: {
        cafe: CafeSlice,
        employee: EmployeeSlice,
        charts: AppSlice
    },
    cafeList: cafeList,
    employeeList: employeeList,
    charts: data
})

export default store