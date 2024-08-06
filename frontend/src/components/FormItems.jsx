import {
    Form,
    Input,
    Space,
    Button
} from 'antd'

export const InputItem = (props) => {
    return <Form.Item
        label={props.label}
        name={props.name}
        rules={[{
            required: true,
            message: props.message
        }]} >
        <Input onChange={props.onChange} />
    </Form.Item>
}

export const FooterButtons = (props) => {
    return <Space size='large' direction='horizental' style={{ marginLeft: "16%" }}>
        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                Submit
            </Button>
        </Form.Item>
        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="cancel" onClick={props.onCancel}>
                Cancel
            </Button>
        </Form.Item>
    </Space>
}

