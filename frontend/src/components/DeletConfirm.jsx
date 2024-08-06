import { Popconfirm, Button } from 'antd'

const onConfirm = (params) => { 
    params.action(params.data)
}
const cancel = (e) => { }
const ConfirmPopup = (params) => {
    return <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={()=>onConfirm(params)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <Button>Delete</Button>
    </Popconfirm>
}
export default ConfirmPopup