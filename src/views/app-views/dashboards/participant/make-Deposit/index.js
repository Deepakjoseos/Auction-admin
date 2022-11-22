import React, { useState, useEffect } from 'react';
import { Form, message, Table } from 'antd';
import { useHistory } from 'react-router-dom';
import participantService from 'services/Participant';
import constantsService from 'services/constants';
import depositService from 'services/deposit';
import DepositField from './DepositField';
import useUpload from 'hooks/useUpload';
import fileManagerService from 'services/FileManager';
import utils from 'utils';
import Flex from 'components/shared-components/Flex';

const DepositForm = (props) => {
  const { participantId } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  // const [participants, setParticipants] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [buyerEligibleBuisness, setBuyerEligibleBuisness] = useState([]);
  const [uploadedImg, setImage] = useState(null);
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    getDeposits();
  }, []);

  const getDeposits = async () => {
    const data = await depositService.getDeposits(
      `participantId=${participantId}`
    );
    if (data) {
      setDeposits(data);
      console.log(data, 'show-data');
    }
  };

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
          setSubmitLoading(false);
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
          form.resetFields();
          getDeposits();
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
    },
    {
      title: 'Counted In',
      dataIndex: 'countedIn',
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'countedIn')
    },
    {
      title: 'Deposit Date',
      dataIndex: 'createdAt',
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt')
    },
    {
      title: 'Business Type',
      dataIndex: 'businessType',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'businessType')
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentMode')
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'remark')
    },
    // {
    //   title: 'Participant',
    //   dataIndex: 'participant',
    //   render: (participant) => participant?.name,
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    // },
    {
      title: 'Manager',
      dataIndex: 'relationshipManager',
      render: (relationshipManager) => relationshipManager?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    }
  ];

  return (
    <>
      {deposits?.length > 0 && (
        <Table
          className="table-responsive"
          columns={tableColumns}
          dataSource={deposits}
          rowKey="id"
        />
      )}
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
