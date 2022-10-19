import React, { useEffect, useState, useMemo } from 'react';
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  Space,
  Table
} from 'antd';
import utils from 'utils';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
const { Option } = Select;

const rules = {
  memberId: [
    {
      required: true,
      message: 'Required'
    }
  ],
  remark: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

let addSection = null;

const UpdateParticipantForm = ({ participants, group }) => {
  console.log(participants, 'participants');
  let groupParticipants = [];
  if (group?.participants) {
    groupParticipants = group.participants;
  }
  const [availableMembers, setAvailableMembers] = useState(participants);
  const [usedMembers, setUsedMembers] = useState(groupParticipants);

  const itemInputs = useMemo(() => {
    if (!group?.participants) {
      return [];
    }
    group?.participants.map((participant) => {
      return {
        memberName: participant.member.name,
        memberId: participant.member._id,
        addedBy: participant.addedBy.name,
        remark: participant.remark,
        date: new Date(Number(participant.timestamp)).toDateString()
      };
    });
  }, []);

  useEffect(() => {
    setAvailableMembers(participants);
  }, [participants]);

  useEffect(() => {
    setUsedMembers(itemInputs?.map((item) => item.memberId));
  }, [itemInputs]);

  const { user } = useSelector((state) => state.auth);

  const handleChange = (selectedItemId) => {
    const editedUsedMember = [...usedMembers, selectedItemId];
    setUsedMembers(editedUsedMember);
  };

  const handleRemove = (selectedItemIndex) => {
    const editedUsedMember = [...usedMembers];
    editedUsedMember.splice(selectedItemIndex, 1);
    setUsedMembers(editedUsedMember);
  };

  return (
    // <Row gutter={16}>
    //   <Col xs={24} sm={24} md={17}>
    <Card title={`Update ${group?.name} Members`}>
      {
        <Form.List name="items" initialValue={itemInputs}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => {
                return (
                  <Space
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      name={[field.name, 'memberId']}
                      fieldKey={[field.fieldKey, 'memberId']}
                      style={{ minWidth: '120px' }}
                    >
                      <Select onChange={handleChange}>
                        {availableMembers?.map((participant) => (
                          <Option
                            value={participant._id}
                            key={participant._id}
                            disabled={
                              participant.status === 'Hold' ||
                              usedMembers.find(
                                (memberId) => memberId === participant._id
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
                      name={[field.name, 'remark']}
                      fieldKey={[field.fieldKey, 'remark']}
                    >
                      <Input placeholder="Remark" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'date']}
                      fieldKey={[field.fieldKey, 'date']}
                    >
                      <Input
                        placeholder="Date Added"
                        disabled
                        defaultValue={new Date().toDateString()}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'addedBy']}
                      fieldKey={[field.fieldKey, 'addedBy']}
                    >
                      <Input
                        placeholder="Added By"
                        disabled
                        defaultValue={user.name}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                        handleRemove(field.name);
                      }}
                    />
                  </Space>
                );
              })}
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
      }
    </Card>
    //   </Col>
    // </Row>
  );
};

export default UpdateParticipantForm;
