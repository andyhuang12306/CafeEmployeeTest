import {
  Typography,
  Space,
  Layout,
  Button
} from 'antd'

import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get, add, dlt } from '../reducers/EmployeeSlice'
import { useEffect, useCallback } from 'react'

import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { pagination, paginationPageSize } from '../Consts.jsx'
import { getAllEmployees, getEmployeesByCafe, deleteEmployee } from '../Api'
import LayoutCom from '../components/Layout'
import ConfirmPopup from '../components/DeletConfirm'
import EditButton from '../components/EditButton'

function Employee() {
  const cafeName = useLocation().state.cafeName
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const employeeList = useSelector((state) => state.employee.employeeList)

  useEffect(() => {
    if (cafeName) {
      getEmployeesByCafe(dispatch, get, cafeName)
    } else {
      getAllEmployees(dispatch, get)
    }

  }, [])

  const onDelete = (employee) => {
    deleteEmployee(dispatch, get, employee)
  }

  const colDefs = [
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phoneNumber" },
    { field: "gender" },
    { field: "cafe" },
    { field: "daysOfWork" },
    { field: "delete", cellRenderer: ConfirmPopup, cellRendererParams:{
      action: onDelete.bind(this)
    }},
    { field: "edit", cellRenderer: EditButton }

  ]

  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100
  }

  const onCellClicked = useCallback((params) => {
    let feild = params.colDef.field
    if (feild === 'edit') {
      navigate("/employee/detail", { state: { employee: params.data } })
    }
  }, [])

  return <LayoutCom>
    <Typography.Title type="primary">Employee Management</Typography.Title>
    <Layout style={{ height: '100%', width: "100%", background: 'white' }} >
      <Space size={'large'} direction='vertical'>
        <Button onClick={() => navigate("/employee/detail", { state: { employee: undefined } })}>Add Employee</Button>
        <Layout className="ag-theme-quartz" style={{ height: 300, width: "100%" }} >
          <AgGridReact
            onCellClicked={onCellClicked}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            autoSizeStrategy={autoSizeStrategy}
            rowData={employeeList.rowData}
            columnDefs={colDefs} />
        </Layout>
      </Space>
    </Layout>
  </LayoutCom>

};


export default Employee;