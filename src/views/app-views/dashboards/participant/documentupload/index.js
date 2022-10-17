import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import participantService from 'services/Participant';

import DocumentField from './GeneralField';

const DocumentForm = (props) => {
  const { participantId } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sheet, setSheet] = useState();

  const onFinish = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    if (sheet) {
      const formData = new FormData();
      formData.append('file', sheet.originFileObj);
      setSubmitLoading(true);

      form
        .validateFields()
        .then(async (values) => {
          const uploaded = await participantService.uploadParticipant(
            participantId,
            formData
          );
          if (uploaded) {
            message.success(`Uploaded Participant.`);
            history.goBack();
            setSubmitLoading(false);
          }
        })
        .catch((info) => {
          setSubmitLoading(false);
          console.log('info', info);
          message.error('Please enter all required field.');
        });
    } else message.error('Please upload file.');
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
        <div className="container">
          <DocumentField
            setSheet={setSheet}
            onFinish={onFinish}
            submitLoading={submitLoading}
          />
        </div>
      </Form>
    </>
  );
};

export default DocumentForm;
