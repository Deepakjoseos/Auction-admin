import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import participantService from 'services/Participant';
import constantsService from 'services/constants';
import depositService from 'services/deposit';
import DepositField from './DepositField';
import useUpload from 'hooks/useUpload';
import fileManagerService from 'services/FileManager';

const DepositForm = (props) => {
  const {  participantId } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  // const [participants, setParticipants] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [buyerEligibleBuisness, setBuyerEligibleBuisness] = useState([]);
  const [uploadedImg, setImage] = useState(null);

  useEffect(() => {
    registration();
    getBuyerEligibleBuisness();
  }, []);
  const registration = async () => {
    const data = await constantsService.getRegistrationConstant();
    if (data) setPaymentModes(data.paymentModes);
  };

  const getBuyerEligibleBuisness = async () => {
    const data = await constantsService.getParticipant();
    if (data) setBuyerEligibleBuisness(data.BuyerEligibleBuisness);
  };

  // const getParticipants = async () => {
  //   const data = await participantService.getAllParticipants();
  //   console.log(data, 'getParticipants');
  //   if (data) setParticipants(data);
  // };

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages
  } = useUpload(1);

  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages
  };

  useEffect(() => {
    setImage(fileListImages);
  }, [fileListImages]);

  const onFinish = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (uploadedImg.length === 0 && uploadedImg === null) {
          message.error('Please upload image');
          return;
        }

        const imgValue = await fileManagerService.getImageUrl(
          uploadedImg[uploadedImg.length - 1].originFileObj
        );
        const data = {
          participantId: participantId,
          amount: values.amount,
          remark: values.remark,
          date: `${new Date(values.date).getTime()}`,
          countedIn: `${new Date(values.countedIn).getTime()}`,
          paymentMode: values.paymentMode,
          bank: {
            name: values.bankName,
            branch: values.bankBranch,
            receiptNumber: values.receiptNumber
          },
          businessType: values.businessType,
          recieptUrl: imgValue
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
        <div className="container">
          <DepositField
            paymentModes={paymentModes}
            onFinish={onFinish}
            submitLoading={submitLoading}
            buyerEligibleBuisness={buyerEligibleBuisness}
            propsImages={propsImages}
            participantId={participantId}
          />
        </div>
      </Form>
    </>
  );
};

export default DepositForm;
