import {
  Typography,
  Space,
  Layout,
  Form,
  Select,
  Radio,
} from 'antd'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import LayoutCom from '../components/Layout'
import { getAllCafes, submitEmployee } from '../Api'
import { useNavigate } from 'react-router-dom'
import {
  setSingleCafe,
  setSingleEmail,
  setSingleGender,
  setSingleName,
  setSinglePhoneNumber,
  getCafeList
} from '../reducers/EmployeeSlice'
import { FooterButtons, InputItem } from '../components/FormItems'

function EmployeeDetail() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const employee = useLocation().state.employee
  const dispatch = useDispatch()
  const employeeSingle = useSelector((state) => state.employee.employeeSingle)
  const cafeList = useSelector((state) => state.employee.cafeList)

  const checkInputValid = () => {
    if (employeeSingle.name === "") {
      window.alert("Please input name")
      return false
    }
    if (employeeSingle.email === "") {
      window.alert("Please input email")
      return false
    }

    if (employeeSingle.phoneNumber === "") {
      window.alert("Please choose phone number")
      return false
    }
    if (employeeSingle.gender === "") {
      window.alert("Please choose gender")
      return false
    }
    if (employeeSingle.cafe === "") {
      window.alert("Please choose cafe")
      return false
    }
    return true
  }

  useEffect(() => {
    getAllCafes(dispatch, getCafeList)
    if (employee && employee.hasOwnProperty("name")) {
      dispatch(setSingleName(employee.name))
      dispatch(setSingleEmail(employee.email))
      dispatch(setSinglePhoneNumber(employee.phoneNumber))
      dispatch(setSingleGender(employee.gender))
      dispatch(setSingleCafe(employee.cafe))
      form.setFieldsValue({
        "name": employee.name,
        "email": employee.email,
        "phonenumber": employee.phoneNumber,
        "gender": employee.gender,
        "cafe": employee.cafe
      })
    } else {
      dispatch(setSingleName(""))
      dispatch(setSingleEmail(""))
      dispatch(setSinglePhoneNumber(""))
      dispatch(setSingleGender(""))
      dispatch(setSingleCafe(""))
      form.setFieldsValue({
        "name": "",
        "email": "",
        "phonenumber": "",
        "gender": "",
        "cafe": ""
      })
    }
  }, [])


  return <LayoutCom>
    <Typography.Title type="primary">Employee Detail</Typography.Title>

    <Layout className="ag-theme-quartz" style={{ height: "100%", width: "100%" }} >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off">
        <Space direction='vertical' style={{ display: 'flex', marginTop: 40 }}>

          <InputItem onChange={(event) => {
            dispatch(setSingleName(event.target.value))
          }} label='Name' name='name' message="Please input name!" />

          <InputItem onChange={(event) => {
            dispatch(setSingleEmail(event.target.value))
          }} label='Email' name='email' message="Please input email!" />

          <InputItem onChange={(event) => {
            dispatch(setSinglePhoneNumber(event.target.value))
          }} label='PhoneNumber' name='phonenumber' message="Please input phone number!" />


          <Form.Item
            label="Gender"
            name="gender"
            rules={[{
              required: true,
              message: 'Please choose gender!'
            }]} >
            <Radio.Group onChange={(event) => { dispatch(setSingleGender(event.target.value)) }}>
              <Radio value="Female"> Female </Radio>
              <Radio value="Male"> Male </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Cafe"
            name="cafe"
            rules={[{
              required: true,
              message: 'Please select assigned café !'
            }]} >
            <Select
              placeholder="Select assigned café"
              onChange={(event) => {
                dispatch(setSingleCafe(event))
              }}
              allowClear
            >
              {
                cafeList.map((cafe) => <Option value={cafe.name}>{cafe.name}</Option>)
              }
            </Select>
          </Form.Item>

          <FooterButtons onSubmit={(event) => {
            if (checkInputValid()) {
              submitEmployee(dispatch, employeeSingle, navigate)
            }
          }} onCancel={(event) => {
            navigate(-1)
          }} />
        </Space>
      </Form>
    </Layout>
  </LayoutCom>
};


export default EmployeeDetail