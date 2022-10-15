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
import participantService from "services/Participant";
import Editor from "components/shared-components/Editor";
const { Option } = Select;

const rules = {
  url: [
    {
      required: true,
      message: "Required",
    },
  ],
  //   participantId: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],

  //   paymentMode: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   amount: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   remark: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   date: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   countedIn: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   bankName: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   bankBranch: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   receiptNumber: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  //   businessType: [
  //     {
  //       required: true,
  //       message: "Required",
  //     },
  //   ],
  recieptUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const DocumentField = ({
  participants,

  onFinish,
  submitLoading,
}) => {
  let history = useHistory();

  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    getParticipants();
  }, []);

  const params = useParams();
  const getParticipants = async () => {
    const participantId = params?.id;
    const data = await participantService.editParticipantDocument({
      participantId,
    });
    if (data) {
      setDeposits(data);
      console.log(data, "show-data");
    }
  };

  

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Document upload">
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item name="url" rules={rules.url} label="Url ">
            <Input placeholder="url" />
          </Form.Item>

          <Form.Item
            name="documentNumber"
            label="DocumentNumber"
            rules={rules.amount}
          >
            <InputNumber min={0} defaultValue={0.0} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={rules.description}
          >
            <Editor placeholder="Write something..." name="description" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default DocumentField;
