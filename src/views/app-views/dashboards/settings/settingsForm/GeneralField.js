import { Input, Row, Col, Card, Form, Select } from "antd";

const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Required",
    },
  ],
  address: [
    {
      required: false,
      message: "Required",

    },
  ],
  email: [
    {
      required: false,
      message: "Required",

    },
  ],

  phone: [
    {
      required: true,
      message: "Required",
    },
  ],
  facebookUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
  instagramUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
  twitterUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ mode }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="User Info">
          <>
            {/* <div style={{ display: "flex", gap: "4rem", alignItems: "center" }}> */}
              <Form.Item
                name="name"
                label="Name"
                rules={rules.name} 
              >
                <Input placeholder="Name" type="text" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={rules.address}
              >
                <Input placeholder="Address" type="text" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={rules.email}
              >
                <Input placeholder="Email" type="text" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={rules.phone}
              >
                <Input placeholder="Phone" type="text" />
              </Form.Item>
              <Form.Item
                name="facebookUrl"
                label="Facebook"
                rules={rules.facebookUrl}
              >
                <Input placeholder="Facebook" type="text" />
              </Form.Item>
              <Form.Item
                name="instagramUrl"
                label="Instagram"
                rules={rules.instagramUrl}
              >
                <Input placeholder="Instagram" type="text" />
              </Form.Item>
              <Form.Item
                name="twitterUrl"
                label="Twitter"
                rules={rules.twitterUrl}
              >
                <Input placeholder="Twitter" type="text" />
              </Form.Item>
            {/* </div> */}
            
          </>
  
          <div>
            {/* <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item> */}
          </div>
        
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
