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
    group: [
        {
            required: true,
            message: 'Required',
        },
    ],
    number: [
        {
            required: true,
            message: 'Required',
        },
    ],

    status: [
        {
            required: true,
            message: 'Required',
        },
    ],
}

const GeneralField = (props) => (
    <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>

            <Card title="Basic Info">
            <Form.Item name="number" label="Number" rules={rules.number}>
          <InputNumber
            placeholder="Number"
            size="large"
            min={0}
            max={100000}
          />
        </Form.Item>

                {props.mode === 'ADD' ? <Form.Item name="group" label="Group" rules={rules.group}>
                    <Input placeholder="Group" />
                </Form.Item> :
                    <Form.Item name="status" label="Status" rules={rules.status}>
                        <Select placeholder="Status">
                            <Option value="Active">Active</Option>
                            <Option value="Hold">Hold</Option>
                        </Select>
                    </Form.Item>}
            </Card>
        </Col>
    </Row>
)

export default GeneralField
