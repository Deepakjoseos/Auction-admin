import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import { useHistory } from "react-router-dom";
import participantService from "services/Participant";

import DocumentField from "./GeneralField";

const DocumentForm = (props) => {
  const { param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [documentupload, setDocumentupload] = useState([]);

  useEffect(() => {
    getParticipants();
    document();
  }, [form, param, props]);
  const document = async () => {
    const data = await participantService.editParticipantDocument();
    if (data) setDocumentupload(data.documentupload);
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
          title: values.title,
          url: values.url,
          documentNumber: values.documentNumber,
          description: values.description,
          // date: `${new Date(values.date).getTime()}`,
          // countedIn: `${new Date(values.countedIn).getTime()}`,
          // paymentMode: values.paymentMode,
          // bank: {
          //   name: values.bankName,
          //   branch: values.bankBranch,
          //   receiptNumber: values.receiptNumber,
          // },
          // businessType: values.businessType,
          // recieptUrl: values.recieptUrl,
        };
        const deposited = await participantService.editParticipantDocument(data);
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
          <DocumentField
            participants={participants}
            documentupload={documentupload}
            onFinish={onFinish}
            submitLoading={submitLoading}
          />
        </div>
      </Form>
    </>
  );
};

export default DocumentForm;
