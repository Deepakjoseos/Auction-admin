import { Input, Row, Col, Card, Form, Select } from "antd";

const { Option } = Select;

const rules = {
  amount: [
    {
      required: true,
      message: "Required",
    },
  ],

  senderId: [
    {
      required: true,
      message: "Required",
    },
  ],

  type: [
    {
      required: true,
      message: "Required",
    },
  ],

 
};

const GeneralField = ({agents}) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="Lottery Type Info">
      
          <>
           
            <Form.Item
              name="senderId"
              label="Sender"
              rules={rules.senderId}
            >
              <Select placeholder="Sender">
                {agents.map((agent) => (
                  <Option key={agent.id} value={agent.id}>
                    {agent.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>

          <Form.Item name="type" label="Type" rules={rules.status}>
            <Select placeholder="Type">
              <Option value="Debit">Debit</Option>
              <Option value="Credit">Credit</Option>
            </Select>
          </Form.Item>
     
        <Form.Item name="amount" label="Amount" rules={rules.amount}>
          <Input placeholder="amount" type="number" min={0} step="1" />
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
