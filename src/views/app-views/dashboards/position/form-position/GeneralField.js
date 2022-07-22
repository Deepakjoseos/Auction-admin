import { Input, Row, Col, Card, Form, Select } from "antd";

const { Option } = Select;

const rules = {
  rank: [
    {
      required: true,
      message: "Required",
    },
  ],

  count: [
    {
      required: true,
      message: "Required",
    },
  ],

  reward: [
    {
      required: true,
      message: "Required",
    },
  ],

  agentReward: [
    {
      required: true,
      message: "Required",
    },
  ],

  lottery: [
    {
      required: true,
      message: "Required",
    },
  ],

  lotteryType: [
    {
      required: true,
      message: "Required",
    },
  ],

  lotteryTypeId: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ mode, lotteryTypes }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="Position Info">
        {mode === "ADD" && (
          <>
            <Form.Item
              name="lotteryTypeId"
              label="Lottery Types"
              rules={rules.lotteryTypeId}
            >
              <Select placeholder="Lottery Types">
                {lotteryTypes
                  .sort((a, b) =>
                    a.name > b.lottery.name
                      ? 1
                      : a.lottery.name < b.lottery.name
                      ? -1
                      : 0
                  )
                  .map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.lottery.name} - {type.name} - Group{" "}
                      {type.lotteryGroup.group}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="rank" label="Rank" rules={rules.rank}>
              <Input placeholder="Rank" type="number" min={1} />
            </Form.Item>
          </>
        )}

        {mode === "EDIT" && (
          <div style={{ display: "flex", gap: "2rem" }}>
            <Form.Item name="lottery" label="Lottery" rules={rules.lottery}>
              <Input placeholder="Lottery" type="text" disabled />
            </Form.Item>
            <Form.Item
              name="lotteryType"
              label="Type"
              rules={rules.lotteryType}
            >
              <Input placeholder="Type" type="text" disabled />
            </Form.Item>
            <Form.Item name="rank" label="Rank" rules={rules.rank}>
              <Input placeholder="Rank" type="number" min={1} disabled={true} />
            </Form.Item>
          </div>
        )}

        <div style={{ display: "flex", gap: "2rem" }}>
          <Form.Item name="reward" label="Prize" rules={rules.reward}>
            <Input
              placeholder="Winner Reward"
              type="number"
              min={0.0}
              step=".01"
            />
          </Form.Item>
          <Form.Item
            name="agentReward"
            label="Agent Reward"
            rules={rules.agentReward}
          >
            <Input
              placeholder="Agent Reward"
              type="number"
              min={0.0}
              step=".01"
            />
          </Form.Item>
          <Form.Item name="count" label="Count" rules={rules.count}>
            <Input placeholder="Count" type="number" min={1} />
          </Form.Item>
        </div>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
