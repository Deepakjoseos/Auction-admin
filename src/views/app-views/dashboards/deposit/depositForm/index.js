import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useHistory } from "react-router-dom";
import participantService from "services/Participant";
import constantsService from "services/constants";
import depositService from "services/deposit";

const { TabPane } = Tabs;

const MAKE = "MAKE";

const DepositForm = (props) => {
  const { mode = MAKE, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);

  useEffect(() => {
    if (mode === MAKE) {
      getParticipants();
      registration();
    }
  }, [form, mode, param, props]);

  const registration = async () => {
    const data = await constantsService.getRegistrationConstant();
    if (data) setPaymentModes(data.paymentModes);
  };

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    if (data) setParticipants(data);
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (mode === MAKE) {
          const data = {
            participantId: values.participantId,
            amount: values.amount,
            remark: values.remark,
            date: `${new Date(values.date).getTime()}`,
            countedIn: `${new Date(values.countedIn).getTime()}`,
            paymentMode: values.paymentMode,
            bank: {
              name: values.bankName,
              branch: values.bankBranch,
              receiptNumber: values.receiptNumber,
            },
            businessType: values.businessType,
            recieptUrl: values.recieptUrl,
          };
          console.log(data);
          const deposited = await depositService.makeDeposit(data);
          if (deposited) {
            message.success(`Deposit ${values.amount}`);
            history.goBack();
          }
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required field ");
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
          status: 'Hold',
          remark: 'No Remark'
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
                {mode === 'MAKE' ? 'Make Deposit' : `Edit City`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push('/app/dashboards/city/city-list')}
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'MAKE' ? 'Make' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                participants={participants}
                paymentModes={paymentModes}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default DepositForm;
