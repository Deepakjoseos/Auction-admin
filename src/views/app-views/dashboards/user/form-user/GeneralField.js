import { Input, Row, Col, Card, Form, Select } from 'antd';

const { Option } = Select;

const rules = {
  firstName: [
    {
      required: true,
      message: 'Required'
    }
  ],
  middleName: [
    {
      required: false
    }
  ],
  lastName: [
    {
      required: false
    }
  ],

  contact: [
    {
      required: true,
      message: 'Required'
    }
  ],
  type: [
    {
      required: true,
      message: 'Required'
    }
  ],
  email: [
    {
      required: true,
      message: 'Required'
    }
  ],
  password: [
    {
      required: true,
      message: 'Required'
    }
  ],
  required: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const GeneralField = ({ mode, employeeTypes }) => (
  <Row gutter={16}> 
    <Col xs={24} sm={24} md={20}>
      <Card title="User Info">
        <>
          {/* <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}> */}
            <Form.Item name="name" label="First Name" rules={rules.firstName}>
              <Input placeholder="First Name" type="text" />
            </Form.Item>
            <Form.Item name="contact" label="Contact" rules={rules.contact}>
              <Input
                placeholder="Contact"
                type="text"
                minLength={10}
                maxLength={10}
              />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={rules.email}>
              <Input placeholder="Email" type="email" />
            </Form.Item>
            {mode === 'ADD' && (
              <Form.Item
                name="password"
                label="Password"
                rules={rules.password}
              >
                <Input.Password />
              </Form.Item>
            )}
            <Form.Item name="employeeTypeId" label="Employee Type">
              <Select placeholder="Employee Type">
                {employeeTypes.map((employeeType) => (
                  <Option key={employeeType._id} value={employeeType._id}>
                    {employeeType.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status" rules={rules.required}>
              <Select placeholder="Status">
                <Option value="Active">Active</Option>
                <Option value="Hold">Hold</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="employeeCode"
              label="Employee code"
              rules={rules.required}
            >
              <Input placeholder="Employee code" type="text" />
            </Form.Item>
            {/* <Form.Item
                name="middleName"
                label="Middle Name"
                rules={rules.middleName}
              >
                <Input placeholder="Middle Name" type="text" />
              </Form.Item> */}
            {/* <Form.Item
                name="lastName"
                label="Last Name"
                rules={rules.lastName}
              >
                <Input placeholder="Last Name" type="text" />
              </Form.Item> */}
          {/* </div> */}
          {/* <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}> */}
            {/* <Form.Item
                name="type"
                style={{ width: "190px" }}
                label="Type"
                rules={rules.type}
              >
                <Select placeholder="Type">
                  <Option value="Customer">Customer</Option>
                  <Option value="Inventory Clerk">Inventory Clerk</Option>
                  <Option value="Vendor">Vendor</Option>
                  <Option value="Approver">Approver</Option>
                  <Option value="Banker">Banker</Option>
                </Select>
              </Form.Item> */}
            {/* <Form.Item name="contact" label="Contact" rules={rules.contact}>
                <Input
                  placeholder="Contact"
                  type="text"
                  minLength={10}
                  maxLength={10}
                />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={rules.email}>
                <Input placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={rules.password}
              >
                <Input.Password />
              </Form.Item> */}
          {/* </div> */}
        </>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
