import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Form,
  Modal,
  Drawer,
  Space,
  message,
  Col
} from 'antd';
// import InformationListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import participantService from 'services/Participant';
import { useSelector } from 'react-redux';
import constantsService from 'services/constants';

const { Option } = Select;

const getStockStatus = (status) => {
  if (status === 'Active') {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    );
  }
  if (status === 'Hold') {
    return (
      <>
        <Tag color="red">Hold</Tag>
      </>
    );
  }
  return null;
};

const ParticipantList = (props) => {
  const history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege, fetchPrivilege } =
    props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [participantsConstants, setParticipantsConstants] = useState({});
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [searchParams, setSearchParams] = useState({});
  const [open, setOpen] = useState(false);
  const [excelForm] = Form.useForm();

  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (user) {
  //     const paricipantRole = user.roles.find(
  //       (role) => role.module === 'PARTICIPANT'
  //     );
  //     console.log('paricipantRole', paricipantRole);
  //     setCurrentSubAdminRole(paricipantRole);
  //   }
  // }, [user]);

  // const [participants, setParticipants] = useState([])

  const getParticipantConstants = async () => {
    const data = await constantsService.getParticipant();
    if (data) {
      setParticipantsConstants(data);
      console.log(data, 'show-data');
    }
  };

  useEffect(() => getParticipantConstants(), []);

  useEffect(() => {
    const getAllParticipants = async () => {
      const data = await participantService.getAllParticipants(
        new URLSearchParams(searchParams)
      );
      if (data) {
        setList(data);
        setSearchBackupList(data);
        console.log(data, 'show-data');
      }
    };
    getAllParticipants();
  }, [searchParams]);

  const dropdownMenu = (row) => {
    return (
      <Menu>
        {editPrivilege && (
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  const addProduct = () => {
    history.push(`/app/dashboards/participant/add-participant`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/participant/edit-participant/${row._id}`);
  };

  //   const deleteRow = async (row) => {
  //     const resp = await informationService.deleteInformation(row.id)

  //     if (resp) {
  //       const objKey = 'id'
  //       let data = list
  //       if (selectedRows.length > 1) {
  //         selectedRows.forEach((elm) => {
  //           data = utils.deleteArrayRow(data, objKey, elm.id)
  //           setList(data)
  //           setSelectedRows([])
  //         })
  //       } else {
  //         data = utils.deleteArrayRow(data, objKey, row.id)
  //         setList(data)
  //       }
  //     }
  //   }

  const tableColumns = [
    {
      title: 'id',
      dataIndex: '_id',
      sorter: (a, b) => utils.antdTableSorter(a, b, '_id')
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'username')
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact'
    },
    {
      title: 'Participant Type',
      dataIndex: 'participantType'
    },
    {
      title: 'GST',
      dataIndex: 'gst',
      render: (text, row) => {
        return <span>{row.gst ? 'Yes' : 'No'}</span>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
    },

    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          {editPrivilege && <EllipsisDropdown menu={dropdownMenu(elm)} />}
        </div>
      )
    }
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const handleFilters = (key, value) => {
    if (value !== 'All') {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        [key]: value
      }));
    } else {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = { ...prevSearchParams };
        delete newSearchParams[key];
        return newSearchParams;
      });
    }
  };

  const filters = () => (
    <Form>
      <Flex className="mb-1" mobileFlex={false}>
        <div className="mr-md-3 mb-3">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </div>
        <Flex className="mb-3">
          <Form.Item name="status" label="Status" className="mr-md-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => handleFilters('status', value)}
              placeholder="Status"
            >
              <Option value="All">All</Option>
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="participantType"
            label="Participant Type"
            className="mr-md-3"
          >
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => handleFilters('participantType', value)}
              placeholder="Participant Type"
            >
              <Option value="All">All</Option>
              {participantsConstants.ParticipantType?.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="userType" label="User Type" className="mr-md-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => handleFilters('userType', value)}
              placeholder="User Type"
            >
              <Option value="All">All</Option>
              {participantsConstants.UserType?.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  );

  const showModal = () => {
    excelForm.setFieldsValue({
      status: 'All',
      userType: 'All',
      participantType: 'All'
    });
    setOpen(true);
  };

  const onFinish = (e) => {
    console.log(e);
    setOpen(false);
    excelForm
      .validateFields()
      .then(async (values) => {
        const searchObj = {};
        Object.keys(values).forEach((value) => {
          if (values[value] && values[value] !== 'All') {
            searchObj[value] = values[value];
          }
        });
        console.log(searchObj);
        const queryParams = new URLSearchParams(searchObj);
        const downloadLink = await participantService.getExcelSheet(
          queryParams
        );

        if (downloadLink) {
          window.open(downloadLink);
        }
      })
      .catch((info) => {
        message.error('Something went wrong!');
      });
  };
  const onClose = (e) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="Download Excel"
        width={720}
        onClose={onClose}
        visible={open}
        bodyStyle={{
          paddingBottom: 80
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onFinish}>
              Download
            </Button>
          </Space>
        }
      >
        <Form
          form={excelForm}
          layout="vertical"
          name="excelForm"
          className="ant-advanced-search-form"
        >
          <Form.Item name="search" className="mr-md-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </Form.Item>
          <Form.Item name="status" label="Status" className="mr-md-3">
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Status"
            >
              <Option value="All">All</Option>
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="participantType"
            label="Participant Type"
            className="mr-md-3"
          >
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Participant Type"
            >
              <Option value="All">All</Option>
              {participantsConstants.ParticipantType?.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="userType" label="User Type" className="mr-md-3">
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="User Type"
            >
              <Option value="All">All</Option>
              {participantsConstants.UserType?.map((type) => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
          <Col>
            <div className="mb-2">
              {fetchPrivilege && (
                <Button
                  onClick={showModal}
                  type="primary"
                  icon={<FileExcelOutlined />}
                  block
                >
                  Generate Excel
                </Button>
              )}
            </div>
            <div className="mb-2">
              {addPrivilege && (
                <Button
                  onClick={addProduct}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Participant
                </Button>
              )}
            </div>
          </Col>
        </Flex>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
    </>
  );
};

export default ParticipantList;
