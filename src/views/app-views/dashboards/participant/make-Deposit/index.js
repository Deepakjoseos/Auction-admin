import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import { useHistory } from "react-router-dom";
import participantService from "services/Participant";
import constantsService from "services/constants";
import depositService from "services/deposit";
import DepositField from "./DepositField";

const DepositForm = (props) => {
  const { param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);

  useEffect(() => {
    getParticipants();
    registration();
  }, [form, param, props]);
  const registration = async () => {
    const data = await constantsService.getRegistrationConstant();
    if (data) setPaymentModes(data.paymentModes);
  };

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    if (data) setParticipants(data);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
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
        const deposited = await depositService.makeDeposit(data);
        if (deposited) {
          message.success(`Deposit ${values.amount}`);
          history.goBack();
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
          status: "Hold",
        }}
      >
        <div className="container">
          <DepositField
            participants={participants}
            paymentModes={paymentModes}
            onFinish={onFinish}
            submitLoading={submitLoading}
          />
        </div>
      </Form>
    </>
  );
};

export default DepositForm;
