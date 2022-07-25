import { Input, Row, Col, Card, Form, Select } from "antd";

const { Option } = Select;

const rules = {
  lotteryId: [
    {
      required: true,
      message: "Required",
    },
  ],

  rank1: [
    {
      required: true,
      message: "Required",
    },
  ],

  rank2: [
    {
      required: true,
      message: "Required",
    },
  ],
  rank3: [
    {
      required: true,
      message: "Required",
    },
  ],
  rank4: [
    {
      required: true,
      message: "Required",
    },
  ],
  rank5: [
    {
      required: true,
      message: "Required",
    },
  ],

  rank6: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ lotteries }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Draw Lottery">
          <Form.Item name="lotteryId" label="Lottery" rules={rules.lotteryId}>
            <Select placeholder="Lottery">
              {lotteries.map((lottery) => (
                <Option key={lottery.id} value={lottery.id}>
                  {lottery.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Form.Item
              name="rank1"
              label="Rank 1 SUPER Lottery"
              rules={rules.rank1}
            >
              <Input
                placeholder="Lottery Numbers eg - 123,231,221"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="rank2"
              label="Rank 2 SUPER Lottery"
              rules={rules.rank2}
            >
              <Input
                placeholder="Lottery Numbers eg - 123,231,221"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="rank3"
              label="Rank 3 SUPER Lottery"
              rules={rules.rank3}
            >
              <Input
                placeholder="Lottery Numbers eg - 123,231,221"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="rank4"
              label="Rank 4 SUPER Lottery"
              rules={rules.rank4}
            >
              <Input
                placeholder="Lottery Numbers eg - 123,231,221"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="rank5"
              label="Rank 5 SUPER Lottery"
              rules={rules.rank5}
            >
              <Input
                placeholder="Lottery Numbers eg - 123,231,221"
                type="text"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="rank6"
            label="Rank 6 SUPER Lotteries"
            rules={rules.rank6}
          >
            <Input placeholder="Lottery Numbers eg - 123,231,221" type="text" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
