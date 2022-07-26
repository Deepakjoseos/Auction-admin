import { Input, Row, Col, Card, Form, Select } from "antd";

const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Required",
    },
  ],

  price: [
    {
      required: true,
      message: "Required",
    },
  ],

  lotteryId: [
    {
      required: true,
      message: "Required",
    },
  ],

  lotteryGroupId: [
    {
      required: true,
      message: "Required",
    },
  ],

  status: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ mode, lotteries, groups,currentType }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="Lottery Type Info">
        {mode==="EDIT" ? <h3>LotteryType : {currentType.name}</h3> :""} 
        {mode === "ADD" ? (
          <>
            <Form.Item name="name" label="Name" rules={rules.name}>
              <Select placeholder="Name">
                <Option value="SUPER">SUPER</Option>
                <Option value="BOX">BOX</Option>
                <Option value="AB">AB</Option>
                <Option value="AC">AC</Option>
                <Option value="BC">BC</Option>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="lotteryGroupId"
              label="Group"
              rules={rules.lotteryGroupId}
            >
              <Select placeholder="Group">
                {groups.map((group) => (
                  <Option key={group.id} value={group.id}>
                    {group.group}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="lotteryId" label="Lottery" rules={rules.lotteryId}>
              <Select placeholder="Lottery">
                {lotteries.map((lottery) => (
                  <Option key={lottery.id} value={lottery.id}>
                    {lottery.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : (
   
          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item name="price" label="Price" rules={rules.price}>
          <Input placeholder="Price" type="number" min={0} step=".01" />
        </Form.Item>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
