import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Modal,
  Form,
  notification,
  Col,
  Row
} from 'antd';
import qs from 'qs'
import _, { get } from 'lodash'
import {
  SearchOutlined,
  EyeOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import stateService from 'services/state';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';

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

const StateList = (props) => {
  let history = useHistory();

  const { addPrivilege, editPrivilege, deletePrivilege } = props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [states, setStates] = useState([]);


  const [filterEnabled, setFilterEnabled] = useState(false)
  

  // Getting Lotteries List to display in the table
  const getStates = async (filterParams) => {
    setIsLoading(true);
    const data = await stateService.getStates(
      qs.stringify(filterParams)    
    );
    console.log(data);
    if (data) {
      setList(data);
      setStates(data)
      setSearchBackupList(data);
      console.log(data, 'show-data');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    
    getStates();
  }, []);

// On pagination Change
const handleTableChange = () => {
  getStates(
    filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
  )
}


// Filter Submit
const handleFilterSubmit = async () => {
  // setPagination(resetPagination())

  form
    .validateFields()
    .then(async (values) => {
      setFilterEnabled(true)
      // Removing falsy Values from values
      const sendingValues = _.pickBy(values, _.identity)
      getStates( sendingValues)
    })
    .catch((info) => {
      console.log('info', info)
      setFilterEnabled(false)
    })
}

const handleClearFilter = async () => {
  form.resetFields()

  // setPagination(resetPagination())
  getStates()
  setFilterEnabled(false)
}

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
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

  const addState = () => {
    history.push(`/app/dashboards/general/state/add-state`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/general/state/edit-state/${row._id}`);
  };

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Abbreviation',
      dataIndex: 'abbreviation',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'abbreviation')
    },
    {
      title: 'Region',
      dataIndex: 'region',
      render: (region) => <Flex alignItems="center">{region?.name}</Flex>
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'region')
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

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  //  Table Filters JSX Elements
  const filters = () => (
    // <Flex className="mb-1" mobileFlex={false}>
    //   <div className="mr-md-3 mb-3">
    //     <Input
    //       placeholder="Search"
    //       prefix={<SearchOutlined />}
    //       onChange={(e) => onSearch(e)}
    //     />
    //   </div>
    // </Flex>
    <Form
    layout="vertical"
    form={form}
    name="filter_form"
    className="ant-advanced-search-form"
  >
    <Row gutter={8} align="bottom">
     <Col md={6} sm={24} xs={24} lg={10}>
     <Form.Item name="name" label="Name" >
            <Select
              showSearch
              placeholder="Name"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
              //   defaultValue={
              //     states.find((state) => state._id === rules.stateId).name
              //   }
            >
              {states.map((state) => (
                <Option 
                // disabled={state.status === "Hold"} 
                value={state.name}>
                  {state.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
      </Col>
      <Col md={6} sm={24} xs={24} lg={6}>
      <Form.Item name="status" label="Status">
        <Select
          // defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          // onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
        </Form.Item>
      </Col>
      <Col  className='mb-4' md={6} sm={24} xs={24} lg={3}>
          <Button style={{marginLeft:"50px"}} type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
        </Col>
        <Col className='mb-4' md={6} sm={24} xs={24} lg={3}>
          <Button style={{marginLeft:"60px"}} type="primary" onClick={handleClearFilter}>
            Clear
          </Button>
        </Col> 
        </Row>
    </Form>
  );

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
          <div>
            {addPrivilege && (
              <Button
                onClick={addState}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Add State
              </Button>
            )}
          </div>
        </Flex>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" onChange={handleTableChange}
            // pagination={pagination}
            loading={isLoading}/>
        </div>
      </Card>
    </>
  );
};

export default StateList;
