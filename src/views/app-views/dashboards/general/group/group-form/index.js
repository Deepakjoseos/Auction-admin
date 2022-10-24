import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import { useHistory } from 'react-router-dom';
import groupService from 'services/group';
import UpdateParticipantsField from './update-group-members';
import participantService from 'services/Participant';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';
const GroupForm = (props) => {
  const { param } = props;
  const history = useHistory();
  const [mode, setMode] = useState('ADD');
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (mode === EDIT && param?.id) fetchGroup();
  }, [form, mode, param, props]);
  useEffect(() => {
    if (param?.id) {
      setMode('EDIT');
    } else {
      setMode('ADD');
    }
  }, [param?.id]);

  const fetchGroup = async () => {
    console.log('fetchgroupid', param);
    const { id } = param;
    const data = await groupService.getGroupById(id);
    const participants = await participantService.getAllParticipants();
    console.log(participants, 'participants');
    setParticipants(participants);

    if (data) {
      form.setFieldsValue({
        name: data.name,
        vehicleTypeIds: data.vehicleTypes.map((vehicleType) => vehicleType._id),
        cityIds: data.cities.map((city) => city._id),
        sellerIds: data.sellers.map((seller) => seller._id),
        stateIds: data.states.map((state) => state._id),
        regionIds: data.regions.map((region) => region._id),
        status: data.status,
        businessTypes: data.businessTypes
      });
    } else {
      history.replace('/app/dashboards/general/group/group-list');
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values');
        if (mode === ADD) {
          // Checking if image exists
          console.log(values, 'newValues');
          const created = await groupService.createGroup(values);
          if (created) {
            message.success(`Created ${values.name} to group list`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          console.log('paramfetchgroup', param);
          if (values.items) {
            const membersEdited = values.items.map((item) => {
              return {
                memberId: item.memberId,
                remark: item.remark
              };
            });

            const edited = await groupService.updateGroupMembers(
              param?.id,
              membersEdited
            );
          }
          const { items, ...newValues } = values;
          console.log(newValues);

          console.log(newValues, 'newValues EDIT');

          const edited = await groupService.updateGroup(param?.id, newValues);
          if (edited) {
            message.success(`Edited ${values.name} to group list`);
            history.goBack();
          }
        }

        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold'
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD' ? 'Add New Group' : `Edit Group`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/general/group/group-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  // disabled={submitLoading}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              {/* <div onClick={() => setMode(EDIT)}> */}
              <GeneralField form={form} />
              {/* </div> */}
            </TabPane>
            {mode === EDIT && (
              <TabPane tab="Update Participants" key="2">
                <div onClick={() => setMode(EDIT)}>
                  <UpdateParticipantsField
                    param={param}
                    participants={participants}
                  />
                </div>
              </TabPane>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default GroupForm;
