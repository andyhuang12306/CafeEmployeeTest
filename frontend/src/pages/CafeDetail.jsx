import {
  Typography,
  Space,
  Layout,
  Button,
  Form,
  Select,
  Upload
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSingleName,
  setSingleDescription,
  setSingleLogo,
  setSingleLocation
} from '../reducers/CafeSlice'
import { useEffect } from 'react'
import LayoutCom from '../components/Layout'
import { submitCafe } from '../Api'
import { useNavigate } from 'react-router-dom'
import { FooterButtons, InputItem } from '../components/FormItems'
import { baseUrlFileUpload } from '../Consts'



function CafeDetail() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const cafe = useLocation().state.cafe
  const dispatch = useDispatch()
  const cafeSingle = useSelector((state) => state.cafe.cafeSingle)

  const props = {
    name: 'file',
    action: baseUrlFileUpload,
    onChange(info) {
      if (info.file.status === 'done') {
        dispatch(setSingleLogo(info.file.response.data.path))
      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: cafe && cafe.logoPath,
        status: 'done',
      }
    ],
    maxCount: 1
  }

  const checkInputValid = () => {
    if (cafeSingle.name === "") {
      window.alert("Please input name")
      return false
    }
    if (cafeSingle.description === "") {
      window.alert("Please input description")
      return false
    }

    if (cafeSingle.location === "") {
      window.alert("Please choose location")
      return false
    }

    if (cafeSingle.logoPath === "") {
      window.alert("Please upload logo")
      return false
    }
    return true
  }

  useEffect(() => {
    if (cafe && cafe.hasOwnProperty("name")) {
      dispatch(setSingleName(cafe.name))
      dispatch(setSingleDescription(cafe.description))
      dispatch(setSingleLocation(cafe.location))
      dispatch(setSingleLogo(cafe.logoPath))
      form.setFieldsValue({
        "name": cafe.name,
        "description": cafe.description,
        "logo": cafe.logoPath,
        "location": cafe.location
      })
    } else {
      dispatch(setSingleName(""))
      dispatch(setSingleDescription(""))
      dispatch(setSingleLocation(""))
      dispatch(setSingleLogo(""))
      form.setFieldsValue({
        "name": "",
        "description": "",
        "logo": "",
        "location": ""
      })
    }
  }, [])

  return <LayoutCom>
    <Typography.Title type="primary">Café Detail</Typography.Title>

    <Layout className="ag-theme-quartz" style={{ height: "100%", width: "100%" }} >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off">
        <Space direction='vertical' style={{ display: 'flex' , marginTop: 40}}>

          <InputItem onChange={(event) => {
            dispatch(setSingleName(event.target.value))
          }} label='Name' name='name' message="Please input name!" />

          <InputItem onChange={(event) => {
            dispatch(setSingleDescription(event.target.value))
          }} label='Description' name='description' message='Please input description!' />


          <Form.Item
            label="Logo"
            name="logo"
            rules={[{
              required: true,
              message: 'Please upload logo!'
            }]} >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{
              required: true,
              message: 'Please input location!'
            }]} >
            <Select
              placeholder="Select location"
              onChange={(event) => {
                dispatch(setSingleLocation(event))
              }}
              allowClear
            >
              <Option value="North">North</Option>
              <Option value="East">East</Option>
              <Option value="South">South</Option>
              <Option value="West">West</Option>
            </Select>
          </Form.Item>

          <FooterButtons onSubmit={(event) => {
            if (checkInputValid()) {
              submitCafe(dispatch, cafeSingle, navigate)
            }
          }} onCancel={(event) => {
            navigate(-1)
          }} />


        </Space>
      </Form>
    </Layout>
  </LayoutCom>

};


export default CafeDetail;