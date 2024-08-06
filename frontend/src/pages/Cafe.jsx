import {
  Typography,
  Space,
  Layout,
  Button
} from 'antd'

import { AgGridReact } from 'ag-grid-react'
import "ag-grid-enterprise"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get } from '../reducers/CafeSlice'
import { useEffect, useCallback } from 'react'
import { pagination, paginationPageSize } from '../Consts.jsx'
import { getAllCafes, deleteCafe } from '../Api'
import LayoutCom from '../components/Layout'
import CafeLogoRender from '../components/CafeLogoRender.jsx'
import EditButton from '../components/EditButton.jsx'
import ConfirmPopup from '../components/DeletConfirm.jsx'


function Cafe() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cafeList = useSelector((state) => state.cafe.cafeList)

  useEffect(() => {
    getAllCafes(dispatch, get)
  }, [])

  const onDelete = (cafe) => {
    deleteCafe(dispatch, get, cafe)
  }

  const colDefs = [
    {
      field: "logoStr",
      cellRenderer: CafeLogoRender,
      flex: 1.5
    },
    { field: "name" },
    { field: "description" },
    { field: "employees" },
    {
      field: "location",
      filter: 'agSetColumnFilter',
      filterParams: {
        values: ["North", "East", "South", "West"],
        buttons: ['apply', 'reset']
      }
    },
    { field: "delete", cellRenderer: ConfirmPopup, cellRendererParams:{
      action: onDelete.bind(this)
    }},
    { field: "edit", cellRenderer: EditButton }
  ]

  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
    columnLimits: [
      {
        colId: 'description',
        minWidth: 300
      }
    ]
  }

  const onCellClicked = useCallback((params) => {
    let feild = params.colDef.field
    if (feild === 'employees') {
      navigate("/employee", { state: { cafeName: params.data.name } })
    } else if (feild === 'edit') {
      navigate("/cafe/detail", { state: { cafe: params.data } })
    }
  }, [])


  return <LayoutCom>
    <Typography.Title type="primary">Café Management</Typography.Title>
    <Layout style={{ height: "100%", width: "100%", background: 'white' }} >
      <Space size={'large'} direction='vertical'>
        <Space size={'large'} direction='horizental'>
          <Button onClick={() => navigate('/cafe/detail', { state: { cafe: undefined } })}>Add Café</Button>
        </Space>
        <Layout className="ag-theme-quartz" style={{ height: 300, width: "100%" }} >
          <AgGridReact
            onDelete={onDelete}
            onCellClicked={onCellClicked}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            autoSizeStrategy={autoSizeStrategy}
            rowData={cafeList.rowData}
            columnDefs={colDefs} />
        </Layout>
      </Space>
    </Layout>
  </LayoutCom>

};


export default Cafe;