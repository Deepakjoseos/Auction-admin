import React, { useEffect, useState } from "react";
import { Row } from "antd";
import participantService from "services/Participant";
import UpdateParticipantForm from "./UpdateParticipantForm";
import groupService from "services/group";

const UpdateParticipantsField = ({ param, participants }) => {

  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { id } = param;
      const group = await groupService.getGroupById(id);
      console.log(group, 'group');
      setGroup(group);
    } catch (error) {
      console.log(error, 'err');
    }
  };

  return (
    <Row gutter={16}>
      {group && (
        <UpdateParticipantForm participants={participants} group={group} />
      )}
    </Row>
  );
};

export default UpdateParticipantsField;
