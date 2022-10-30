import React, { useState, useEffect } from 'react';

import { Tabs, Form, message, Table, Menu, Modal, Input, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

import RegistrationField from './RegistrationField';
import moment from 'moment';

import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import utils from 'utils';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import constantsService from 'services/constants';
import registrationService from 'services/registration';
import useUpload from 'hooks/useUpload';
import fileManagerService from 'services/FileManager';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const RegistrationForm = (props) => {
  const { mode = ADD, param, participantId } = props;
  const history = useHistory();

  const [form] = Form.useForm();

  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [registrationsList, setRegistrationsList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [feeTypes, setFeeType] = useState([]);
  const [status, setStatus] = useState([]);
  const [uploadedImg, setImage] = useState(null);

  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // const getFeeTypes = async () => {
  //   const data = await constantsService.getFeeTypes();
  //   if (data) {
  //     setFeeType(Object.values(data));
  //     console.log(data, 'feetypes');
  //   }
  // };
  const getRegistration = async () => {
    const data = await constantsService.getRegistrationConstant();
    if (data) {
      setFeeType(data.FeeType);
      // setStatus(data.paymentStatus);
    }
  };

  const getAllRegistrations = async () => {
    const data = await registrationService.getParticipantRegistrations(
      participantId
    );
    console.log(data);
    if (data) {
      setRegistrationsList(data);
      setSearchBackupList(data);
    }
  };

  useEffect(() => {
    getAllRegistrations();
    getRegistration();
  }, []);

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

  const onFinish = async () => {
    console.log('submited');
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        // if (mode === ADD) {
        // Checking if image exists
        if (uploadedImg.length === 0 && uploadedImg === null) {
          message.error('Please upload image');
          return;
        }

        const imgValue = await fileManagerService.getImageUrl(
          uploadedImg[uploadedImg.length - 1].originFileObj
        );

        const sendingValues = {
          status: 'Evaluating',
          countedIn: moment(values?.countedIn).format('x'),
          date: moment(values?.date).format('x'),
          expiry: moment(values?.expiry).format('x'),
          fee: values?.fee,
          feeRemark: values?.feeRemark,
          feeType: values.feeType,
          mode: values?.mode,
          note: values?.note,
          participantId: participantId,

          paymentDate: moment(values?.paymentDate).format('x'),

          payment: {
            bankName: values.bankName,
            branchName: values.branchName,
            number: values.number,
            receipt: imgValue
          }
        };

        console.log(sendingValues, 'values=====');

        const created = await registrationService.createRegistration(
          sendingValues
        );
        if (created) {
          message.success(`Created  registration`);
        }

        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
  };

  const dropdownMenu = (row) => {
    // if (window.localStorage.getItem('auth_type') === 'Admin') {
    return (
      <Menu>
        <Menu.Item onClick={() => showModal(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
    // }
  };

  // const addBanner = () => {
  //   history.push(`/app/dashboards/banner/add-banner`)
  // }
  const showModal = (row) => {
    setSelectedRegistration(row);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const viewDetails = (row) => {
    console.log('row', row);
  };

  // For deleting a row

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Fee',
      dataIndex: 'fee',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'fee')
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'fee')
    },
    {
      title: 'Registration Date',
      dataIndex: 'date',
      render: (date) => {
        return moment(parseInt(date)).format('L');
      }
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry',
      render: (expiry) => {
        return moment(parseInt(expiry)).format('L');
      }
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      render: (paymentDate) => {
        return moment(parseInt(paymentDate)).format('L');
      }
    },
    {
      title: 'Fee Type',
      dataIndex: 'feeType',
      key: 'feeType'
      // render: (row) => {console},
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
      // render: (row) => {console},
    },
    // {
    //   title: 'Bank Name',
    //   dataIndex: 'payment',
    //   render: (payment) => (
    //     <Flex alignItems="center">{payment.bankName}</Flex>
    //   ),
    //   // sorter: (a, b) => a.agent.name.localeCompare(b.booking.agent.name),
    // },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      )
    }
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setRegistrationsList(data);
  };

  // Filter Status Handler
  // const handleShowStatus = (value) => {
  //   if (value !== 'All') {
  //     const key = 'status'
  //     const data = utils.filterArray(searchBackupList, key, value)
  //     setRegistrationsList(data)
  //   } else {
  //     setRegistrationsList(searchBackupList)
  //   }
  // }

  // Table Filters JSX Elements
  const filters = () => (
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      {/* <div className="mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
      </div> */}
    </Flex>
  );

  return (
    <>
      {registrationsList.length > 0 && (
        <Table
          className="table-responsive"
          columns={tableColumns}
          dataSource={registrationsList}
          rowKey="id"
        />
      )}
      {selectedRegistration && (
        <Modal
          title="Registration details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row gutter={[16, 16]}>
            <Col>
              <Col></Col>
              <h4>Fee: {selectedRegistration.fee}</h4>
              <h4>Fee remark: {selectedRegistration.feeRemark}</h4>
              <h4>Fee type: {selectedRegistration.feeType}</h4>
              <h4>Mode: {selectedRegistration.mode}</h4>
              <h4>Note: {selectedRegistration.note}</h4>
              <h4>Participant name: {selectedRegistration.participant.name}</h4>
              <h4>Bank name: {selectedRegistration.payment.bankName}</h4>
              <h4>Branch name: {selectedRegistration.payment.branchName}</h4>
              <h4>
                Payment date:{' '}
                {moment(parseInt(selectedRegistration.paymentDate)).format('L')}
              </h4>
              <h4>Status: {selectedRegistration.status}</h4>
              <br />
              <h4>Receipt:</h4>
              <img
                src={selectedRegistration.payment.receipt}
                width={200}
                height={200}
              />
            </Col>
          </Row>
        </Modal>
      )}
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        {/* <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
             
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push('/app/dashboards/participant/registration/list-registration/index')}
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
                Submit
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt> */}
        <div className="container">
          {/* <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}> */}
          {/* <TabPane tab="Generalfaefaef" key="1"> */}
          <RegistrationField
            feeTypes={feeTypes}
            status={status}
            onFinish={onFinish}
            propsImages={propsImages}
            participantId={participantId}
          />
          {/* </TabPane> */}
          {/* </Tabs> */}
        </div>
      </Form>
    </>
  );
};

export default RegistrationForm;
