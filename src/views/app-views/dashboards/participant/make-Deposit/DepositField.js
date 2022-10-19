import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Button,
} from "antd";
import utils from "utils";
import { Table } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import depositService from "services/deposit";

const { Option } = Select;

const rules = {
  participantId: [
    {
      required: true,
      message: "Required",
    },
  ],

  paymentMode: [
    {
      required: true,
      message: "Required",
    },
  ],
  amount: [
    {
      required: true,
      message: "Required",
    },
  ],
  remark: [
    {
      required: true,
      message: "Required",
    },
  ],
  date: [
    {
      required: true,
      message: "Required",
    },
  ],
  countedIn: [
    {
      required: true,
      message: "Required",
    },
  ],
  bankName: [
    {
      required: true,
      message: "Required",
    },
  ],
  bankBranch: [
    {
      required: true,
      message: "Required",
    },
  ],
  receiptNumber: [
    {
      required: true,
      message: "Required",
    },
  ],
  businessType: [
    {
      required: true,
      message: "Required",
    },
  ],
  recieptUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const DepositField = ({
  participants,
  paymentModes,
  onFinish,
  submitLoading,
}) => {
  let history = useHistory();

  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    getDeposits();
  }, []);

  const params = useParams();
  const getDeposits = async () => {
    const participantId = params?.id;
    const data = await depositService.getDeposits({ participantId });
    if (data) {
      setDeposits(data);
      console.log(data, "show-data");
    }
  };

  const makeDeposit = () => {
    history.push(`/app/dashboards/deposit/make-deposit`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
    },
    {
      title: "Counted In",
      dataIndex: "countedIn",
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "countedIn"),
    },
    {
      title: "Deposit Date",
      dataIndex: "createdAt",
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "createdAt"),
    },
    {
      title: "Business Type",
      dataIndex: "businessType",
      sorter: (a, b) => utils.antdTableSorter(a, b, "businessType"),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      sorter: (a, b) => utils.antdTableSorter(a, b, "paymentMode"),
    },
    {
      title: "Remark",
      dataIndex: "remark",
      sorter: (a, b) => utils.antdTableSorter(a, b, "remark"),
    },
    {
      title: "Participant",
      dataIndex: "participant",
      render: (participant) => participant?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Manager",
      dataIndex: "relationshipManager",
      render: (relationshipManager) => relationshipManager?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
  ];

  return (
    <>
      {deposits?.length > 0 && (
        <Table
          className="table-responsive"
          columns={tableColumns}
          dataSource={deposits}
          rowKey="id"
        />
      )}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={17}>
          <Card title="Basic Info">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >

{/*               
              <Form.Item
                name="participantId"
                label="Participant Id"
                rules={rules.participantId}
              >
                <Input placeholder={params?.id} value={params?.id} disabled />
              </Form.Item>
 */}

<Form.Item
            name="participantId"
            label="Participant"
            rules={rules.participantId}
          >
            <Select placeholder="Participant">
              {participants.map((participant) => (
                <Option
                  disabled={participant.status === "Hold"}
                  value={participant._id}
                >
                  {participant.name}
                </Option>
              ))}
            </Select>
          </Form.Item>


              <Form.Item
                name="paymentMode"
                label="Payment Mode"
                rules={rules.paymentMode}
              >
                <Select placeholder="Payment Mode">
                  {paymentModes.map((paymentMode) => (
                    <Option value={paymentMode}>{paymentMode}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="amount" label="Amount" rules={rules.amount}>
                <InputNumber min={0} defaultValue={0.0} />
              </Form.Item>
              <Form.Item name="remark" label="Remark" rules={rules.remark}>
                <Input placeholder="Remark" defaultValue="No Remark" />
              </Form.Item>
              <Form.Item
                name="businessType"
                label="Business Type"
                rules={rules.businessType}
              >
                <Select placeholder="Business Type">
                  <Option value="Bank">Bank</Option>
                  <Option value="Insurance">Insuarance</Option>
                  <Option value="Consumer Auction">Consumer Auction</Option>
                </Select>
              </Form.Item>
              <Form.Item name="date" label="Date" rules={rules.date}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="countedIn"
                label="Counted In"
                rules={rules.countedIn}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="bankName"
                label="Bank Name"
                rules={rules.bankName}
              >
                <Input placeholder="Bank Name" />
              </Form.Item>
              <Form.Item
                name="bankBranch"
                label="Bank Branch"
                rules={rules.bankBranch}
              >
                <Input placeholder="Bank Branch" />
              </Form.Item>
              <Form.Item
                name="receiptNumber"
                label="Receipt Number"
                rules={rules.receiptNumber}
              >
                <Input placeholder="Receipt Number" />
              </Form.Item>
              <Form.Item
                name="recieptUrl"
                label="Reciept"
                rules={rules.recieptUrl}
              >
                <Input placeholder="Reciept" />
              </Form.Item>
            </div>
          </Card>
          <Button
            type="primary"
            onClick={onFinish}
            htmlType="submit"
            style={{ float: "right" }}
            loading={submitLoading}
          >
            Make Deposit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default DepositField;
