import React from 'react'
import {
    Input,
    Row,
    Col,
    Card,
    Form,
    Upload,
    InputNumber,
    Select,
    TimePicker,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import moment from 'moment'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
    name: [
        {
            required: true,
            message: 'Required',
        },
    ],
    email: [
        {
            required: true,
            message: 'Required',
        },
    ],
    commission: [
        {
            required: true,
            message: 'Required',
        },
    ],
    createAgents: [
        {
            required: true,
            message: 'Required'
        }
    ],

    status: [
        {
            required: true,
            message: 'Required',
        },
    ],
    password: [
        {
            required: true,
            message: 'Required'
        }
    ]
}

const GeneralField = (props) => (
    <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
            <Card title="Basic Info">
                <Form.Item name="name" label="Name" rules={rules.name}>
                    <Input placeholder="Name" />
                </Form.Item>

                <Form.Item name="email" label="Email" rules={rules.email}>
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item name="commission" label="Commission" rules={rules.commission} >
                    <InputNumber
                        placeholder="Commission"
                        size="large"
                        min={0}
                        max={100000}
                    />
                </Form.Item>
                {props.mode === 'ADD' ?  <Form.Item 
                    label="Password"
                    name="password"
                    rules={rules.password}
                >
                    <Input.Password />


                </Form.Item>  :""}
              
              
                <Form.Item name="createAgents" label="CreateAgents" rules={rules.name}>
                    <Select placeholder="Name">
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="status" label="Status" rules={rules.status}>
                    <Select placeholder="Status">
                        <Option value="Active">Active</Option>
                        <Option value="Hold">Hold</Option>
                    </Select>
                </Form.Item>
            </Card>
        </Col>
    </Row>
)

export default GeneralField
