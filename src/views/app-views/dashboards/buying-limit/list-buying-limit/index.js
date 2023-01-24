import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Select, Form ,Row ,Col ,Button,} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import qs from 'qs'
import _, { get } from 'lodash'
import buyinglLimitService from 'services/buyingLimit';
import useQueryFilters from 'hooks/useQueryFilters';
import participantService from 'services/Participant';

const { Option } = Select; 

const BuyingLimitList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [participants, setParticipants] = useState([]);
  //   const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses,setStatuses] = useState([])
  const [form] = Form.useForm()

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  })
  const { handleFilters, isLoading, setIsLoading, searchParams } =
    useQueryFilters();

  useEffect(() => {
    getBuyingLimits({
      pagination,
    });
  }, []);

  useEffect(() => {
    getParticipants();
  }, []);

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    setParticipants(data);
    // console.log(data,'buying lii')
  };

  const getBuyingLimits = async (paginationParams = {}, filterParams) => {
    setIsLoading(true);
    const data = await buyinglLimitService.getAll(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
      );
    console.log(data);
    if (data) {
      setList(data.data);
      setSearchBackupList(data.data);
      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.count,
      })
      // console.log(data, 'show-data');
    }
    setIsLoading(false);
  };

// pagination generator
const getPaginationParams = (params) => ({
  limit: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
})


  // On pagination Change
  const handleTableChange = (newPagination) => {
    getBuyingLimits(
      { 
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })



// Filter Submit
const handleFilterSubmit = async () => {
setPagination(resetPagination())

form
  .validateFields()
  .then(async (values) => {
    setFilterEnabled(true)
    // Removing falsy Values from values
    const sendingValues = _.pickBy(values, _.identity)
    getBuyingLimits({ pagination: resetPagination() }, sendingValues)
  })
  .catch((info) => {
    console.log('info', info)
    setFilterEnabled(false)
  })
}

const handleClearFilter = async () => {
form.resetFields()

setPagination(resetPagination())
getBuyingLimits({ pagination: resetPagination() }, {})
setFilterEnabled(false)
}

  const tableColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Participant',
      dataIndex: 'participant',
      render: (participant) => participant?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Done By',
      dataIndex: 'doneBy',
      render: (doneBy) => doneBy?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'remark')
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      render: (date) => {
        var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        var d = new Date(Number(date)).toLocaleString('en-IN', options);
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'timestamp')
    }
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const filters = () => (
      <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
      >
      <Row gutter={8} align="bottom">
      <Col md={6} sm={24} xs={24} lg={6}>
            <Form.Item name='participantId' label="Participants" >
        <Select
        showSearch
        placeholder="Participants"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        optionFilterProp="children"
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          // onChange={(value) => handleFilters('participantId', value)}
          // placeholder="Participant"
        >
          <Option value="All">All</Option>
          {participants.map((participant) => (
            <Option value={participant._id}>{participant.name}</Option>
          ))}
        </Select>
        </Form.Item>
        </Col> 
        <Col style={{marginLeft:"80px"}} className="mb-4">
          <Button type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
        </Col>
        <Col className="mb-4">
          <Button type="primary" onClick={handleClearFilter}>
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
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            scroll={{
              x: true,
            }}
            loading={isLoading}
            onChange={handleTableChange}
            pagination={pagination}
          />
        </div>
      </Card>
    </>
  );
};

export default BuyingLimitList;
