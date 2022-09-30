import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  Space,
  Table,
} from "antd";
import utils from "utils";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
const { Option } = Select;

const rules = {
  memberId: [
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
};

const UpdateParticipantForm = ({ participants, group }) => {
  const [availableMembers, setAvailableMembers] = useState([]);
  const [usedMembers, setUsedMembers] = useState(group.participants);
  useEffect(() => {
    updateAvailableMembers();
  }, []);

  const updateAvailableMembers = () => {
    const newMembers = participants.filter((participant) => {
      console.log(participant);
      const match = usedMembers.find(
        (member) => member.member._id === participant._id
      );
      if (!match) return participant;
      else console.log(match);
    });
    if (newMembers.length > 0) setAvailableMembers(newMembers);
    else setAvailableMembers(participants);
  };
  console.log(availableMembers);
  const { user } = useSelector((state) => state.auth);
  const itemInputs = group.participants.map((participant) => {
    return {
      // name: group.name,
      member: participant.member._id,
      addedBy: participant.addedBy.name,
      remark: participant.remark,
      date: new Date(Number(participant.timestamp)).toDateString(),
    };
  });
  // const tableColumns = [
  //   {
  //     title: "Member",
  //     dataIndex: "member",
  //     render: (_, rec) => <>{rec.member?.name}</>,
  //     sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
  //   },
  //   {
  //     title: "Remark",
  //     dataIndex: "remark",
  //     sorter: (a, b) => utils.antdTableSorter(a, b, "remark"),
  //   },
  //   {
  //     title: "Date Added",
  //     dataIndex: "timestamp",
  //     render: (date) => {
  //       var d = new Date(Number(date)).toDateString();
  //       return <Flex alignItems="center">{d}</Flex>;
  //     },
  //     sorter: (a, b) => utils.antdTableSorter(a, b, "timestamp"),
  //   },
  //   {
  //     title: "Added By",
  //     dataIndex: "addedBy",
  //     render: (_, rec) => <>{rec.addedBy?.name}</>,
  //     sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
  //   },
  // ];

  return (
    // <Row gutter={16}>
    //   <Col xs={24} sm={24} md={17}>
    <Card title={`Update ${group?.name} Members`}>
      {availableMembers.length > 0 && (
        <Form.List name="items" initialValue={itemInputs}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "member"]}
                    fieldKey={[field.fieldKey, "member"]}
                    rules={rules.memberId}
                    style={{ minWidth: "120px" }}
                  >
                    <Select>
                      {availableMembers?.map((participant) => (
                        <Option
                          value={participant._id}
                          key={participant._id}
                          disabled={
                            participant.status === "Hold" ||
                            group.participants.find(
                              (part) => part.member._id === participant._id
                            )
                          }
                        >
                          {participant.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "remark"]}
                    fieldKey={[field.fieldKey, "remark"]}
                    rules={rules.remark}
                  >
                    <Input placeholder="Remark" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "date"]}
                    fieldKey={[field.fieldKey, "date"]}
                  >
                    <Input
                      placeholder="Date Added"
                      disabled
                      defaultValue={new Date().toDateString()}
                    />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "addedBy"]}
                    fieldKey={[field.fieldKey, "addedBy"]}
                  >
                    <Input
                      placeholder="Added By"
                      disabled
                      defaultValue={user.name}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
    </Card>
    //   </Col>
    // </Row>
  );
};

export default UpdateParticipantForm;
