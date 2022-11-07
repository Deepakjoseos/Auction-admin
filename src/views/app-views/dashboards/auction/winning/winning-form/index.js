import React, { useState, useEffect, useCallback } from 'react';

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import { useHistory } from 'react-router-dom';

import winningService from 'services/winning';
import auctionInventoryService from 'services/auctionInventory';
import participantService from 'services/Participant';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const WinningForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [inventories, setInventories] = useState([]);
  const [participants, setParticipants] = useState([]);

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    console.log(data);
    if (data) {
      setParticipants(
        data.filter((participant) => participant.participantType !== 'Seller')
      );
    }
  };

  const getInventories = async () => {
    const data = await auctionInventoryService.getInventories();
    if (data) {
      setInventories(data);
    }
  };

  useEffect(() => {
    getParticipants();
    getInventories();
  }, []);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const added = await winningService.addWinning({
          auctionInventoryId: values.auctionInventoryId,
          winnerId: values.winnerId
        });
        if (added) {
          message.success(`Added ${values.auctionInventoryId} to Winnings`);
          setSubmitLoading(false);
          history.goBack();
        }
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
    setSubmitLoading(false);
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
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
              {mode === 'ADD' ? 'Add Winning' : `Edit Employee Type`}
            </h2>
            <div className="mb-3">
              <Button
                className="mr-2"
                onClick={() =>
                  history.push('/app/dashboards/winning/winning-list')
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
            <GeneralField
              mode={mode}
              inventories={inventories}
              participants={participants}
            />
          </TabPane>
        </Tabs>
      </div>
    </Form>
  );
};

export default WinningForm;
