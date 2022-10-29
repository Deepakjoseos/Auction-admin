import React, { useState, useEffect, useCallback } from 'react';

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import { useHistory } from 'react-router-dom';
import auctionInventoryService from 'services/auctionInventory';

import approveBidService from 'services/approveBid';
import biddingService from 'services/Bidding';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const ApproveBidForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [biddings, setBiddings] = useState([]);

  const getBiddings = async () => {
    const data = await biddingService.getBiddings();
    if (data) {
      setBiddings(data);
    }
  };

  useEffect(() => {
    getBiddings();
  }, []);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const added = await approveBidService.addApproveBid(values);
        if (added) {
          message.success(`Added ${values.bidId} to approve bids`);
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
              {mode === 'ADD' ? 'Add Approve Bid' : `Edit Approve Bid`}
            </h2>
            <div className="mb-3">
              <Button
                className="mr-2"
                onClick={() =>
                  history.push('/app/dashboards/approve-bid/approveBid-list')
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
            <GeneralField mode={mode} biddings={biddings} />
          </TabPane>
        </Tabs>
      </div>
    </Form>
  );
};

export default ApproveBidForm;
