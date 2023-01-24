import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Menu,
  Form,
  Row,
  Col,
  Select,
  DatePicker
} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import { useSelector } from 'react-redux';
import auctionInventoryService from 'services/auctionInventory';
import useQueryFilters from 'hooks/useQueryFilters';
import sheetService from 'services/sheet';
import _ from 'lodash';
import vehicletypeService from 'services/vehicleType';
import clientService from 'services/client';
import cityService from 'services/city';
import regionService from 'services/region';
import brandService from 'services/brand';

const { Option } = Select;

const pageSize = 8;

const AuctionInventoryList = (props) => {
  let history = useHistory();
  const params = new URLSearchParams(props.location.search);
  const auctionId = params.get('auctionId');

  const { addPrivilege, editPrivilege, deletePrivilege, fetchPrivilege } =
    props;

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [registrationNumberList, setRegistrationNumberList] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [downloadLink, setDownloadLink] = useState(null);

  const [filterEnabled, setFilterEnabled] = useState(false);
  const [vehicleTypeId, setVehicleTypeId] = useState([]);
  const [city, setCity] = useState([]);
  const [regionId, setRegionsByID] = useState([]);
  const [brands, setBrands] = useState([]);

  const [form] = Form.useForm();

  const {
    handleFilters,
    isLoading,
    onChangeCurrentPageNumber,
    setIsLoading,
    searchParams,
    totalCount,
    setTotalCount,
    setSearchParams
  } = useQueryFilters(
    auctionId
      ? {
          limit: pageSize,
          page: 1,
          auctionId: auctionId
        }
      : {
          limit: pageSize,
          page: 1
        }
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getVehicleTypeById = async () => {
      const data = await vehicletypeService.getVehicleTypes();
      if (data) {
        setVehicleTypeId(data);
      }
    };

    const getCity = async () => {
      const data = await cityService.getCities();
      if (data) {
        setCity(data);
      }
    };
    const getRegionsByID = async () => {
      const data = await regionService.getRegions();
      if (data) {
        setRegionsByID(data);
      }
    };

    const getRegistrationNumbers = async () => {
      const data = await auctionInventoryService.getRegistrationNumbers();

      if (data) {
        setRegistrationNumberList(data);
      }
    };

    const getDownloadLink = async () => {
      const data = await sheetService.getSheets('sheetName=AUCTIONINVENTORY');

      if (data) {
        setDownloadLink(data);
      }
    };

    const getBrands = async () => {
      const data = await brandService.getBrands();

      if (data) {
        setBrands(data);
      }
    };

    getRegionsByID();
    getVehicleTypeById();
    getCity();
    getRegistrationNumbers();
    getDownloadLink();
    // getBrands();
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      setIsLoading(true);
      const data = await auctionInventoryService.getInventories(
        new URLSearchParams(searchParams)
      );
      if (data) {
        setList(data.inventories);
        setSearchBackupList(data.inventories);
        setTotalCount(data.inventories.length > 0 ? data.pages * pageSize : 0);
        console.log(data, 'show-data');
      }
      setIsLoading(false);
    };
    getGroups();
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
        <Menu.Item onClick={() => viewBiddings(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Biddings</span>
          </Flex>
        </Menu.Item>
        <Menu.Item onClick={() => viewComments(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Comments</span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
  };

  const addGroup = () => {
    history.push(
      `/app/dashboards/auction/auction-inventory/add-auction-inventory`
    );
  };

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/auction/auction-inventory/edit-auction-inventory/${row._id}`
    );
  };

  const viewBiddings = (row) => {
    history.push(
      `/app/dashboards/auction/bidding/bidding-list?inventoryId=${row._id}`
    );
  };

  const viewComments = (row) => {
    history.push(
      `/app/dashboards/auction/comment/comment-list?inventoryId=${row._id}`
    );
  };

  const tableColumns = [
    {
      title: 'Auction Name',
      dataIndex: 'auction',
      render: (auction) => <Flex alignItems="center">{auction?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Chasis Number',
      dataIndex: 'vehicleInfo',
      render: (vehicleInfo) => (
        <Flex alignItems="center">{vehicleInfo?.chasisNumber} </Flex>
      )
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'Registration number',
      dataIndex: 'registrationNumber',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'registrationNumber')
    },
    {
      title: 'Bid Limit',
      dataIndex: 'auction',
      render: (auction) => <Flex alignItems="center">{auction?.bidLimit} </Flex>
      //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTimestamp',
      render: (startTimestamp) => {
        var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        var d = new Date(Number(startTimestamp)).toLocaleString('en-IN', options);
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'startTimestamp')
    },
    {
      title: 'End Time',
      dataIndex: 'endTimestamp',
      render: (endTimestamp) => {
        var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        var d = new Date(Number(endTimestamp)).toLocaleString('en-IN', options);
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'endTimestamp')
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      render: (createdBy) => <Flex alignItems="center">{createdBy?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdBy')
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      render: (updatedBy) => <Flex alignItems="center">{updatedBy?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'updatedBy')
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          {<EllipsisDropdown menu={dropdownMenu(elm)} />}
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

  // Filter Submit
  const handleFilterSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true);
        // Removing falsy Values from values

        const sendingValues = _.pickBy(values, _.identity);
        if (sendingValues.startTimestamp) {
          sendingValues.startTimestamp = new Date(
            sendingValues.startTimestamp
          ).getTime();
        }

        if (sendingValues.endTimestamp) {
          sendingValues.endTimestamp = new Date(
            sendingValues.endTimestamp
          ).getTime();
        }
        console.log(sendingValues);
        setSearchParams(sendingValues);
      })
      .catch((info) => {
        console.log('info', info);
        setFilterEnabled(false);
      });
  };

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields();

    setSearchParams({});
    setFilterEnabled(false);
  };

  const filtersComponent = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="businessType" label="Business Type">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedPrescriptionRequired(value)}
              // onSelect={handleQuery}
              // value={selectedPrescriptionrequired}
              defaultValue={''}
              placeholder="businessType"
            >
              <Option value="">All</Option>
              <Option value="Bank">Bank</Option>
              <Option value="Consumer Auction">Consumer Auction</Option>
              <Option value="Insurance">Insurance</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="vehicleTypeId" label="Vehicle Type">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedBrandId(value)}
              // onSelect={handleQuery}
              placeholder="vehicleType"
              defaultValue={''}
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {vehicleTypeId.map((vehicleTypeId) => (
                <Option key={vehicleTypeId._id} value={vehicleTypeId._id}>
                  {vehicleTypeId.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="cityId" label="City">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedBrandId(value)}
              // onSelect={handleQuery}
              placeholder="cityId"
              defaultValue={''}
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {city.map((Cities) => (
                <Option key={Cities._id} value={Cities._id}>
                  {Cities.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="regionId" label="Region">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedBrandId(value)}
              // onSelect={handleQuery}
              placeholder="regionId"
              defaultValue={''}
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {regionId.map((regionId) => (
                <Option key={regionId._id} value={regionId._id}>
                  {regionId.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="make" label="Make">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedBrandId(value)}
              // onSelect={handleQuery}
              placeholder="Make"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {brands.map((brand) => (
                <Option key={brand} value={brand}>
                  {brand}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="auctionType" label="Type">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedPrescriptionRequired(value)}
              // onSelect={handleQuery}
              // value={selectedPrescriptionrequired}
              defaultValue={''}
              placeholder="type"
            >
              <Option value="">All</Option>
              <Option value="Yard">Yard</Option>
              <Option value="Online">Online</Option>
              <Option value="Open">Open</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="auctionFormat" label="Format">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedPrescriptionRequired(value)}
              // onSelect={handleQuery}
              // value={selectedPrescriptionrequired}
              placeholder="format"
              defaultValue={''}
            >
              <Option value="">All</Option>
              <Option value="Open">Open</Option>
              <Option value="Close">Close</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="timeStatus" label="Time Status">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedPrescriptionRequired(value)}
              // onSelect={handleQuery}
              // value={selectedPrescriptionrequired}
              defaultValue={''}
              placeholder="Time status"
            >
              <Option value="">All</Option>
              <Option value="LIVE">Live</Option>
              <Option value="UPCOMING">Upcoming</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="registrationNumber" label="Registration Number">
            {/* <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Registration Number"
              defaultValue={''}
            >
              <Option value=""> All </Option>
              {registrationNumberList.map((reg) => (
                <Option value={reg._id}> {reg._id} </Option>
              ))}
            </Select> */}
            <Input
          placeholder="Registration Number"
          prefix={<SearchOutlined />}
          // onChange={(e) => onSearch(e)}
        />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name={'startTimestamp'} label="Start Date">
            <DatePicker className="w-100" style={{ minWidth: 180 }} />
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name={'endTimestamp'} label="End Date">
            <DatePicker className="w-100" style={{ minWidth: 180 }} />
          </Form.Item>
        </Col>

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
              placeholder="Status"
            >
              <Option value="All">All</Option>
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </div> */}
        </Flex>

        <Col className="mb-4">
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
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="between"
          mobileFlex={false}
          className="ml-4"
        >
          {addPrivilege && (
            <Button
              onClick={addGroup}
              type="primary"
              icon={<PlusCircleOutlined />}
              className="mb-2"
              block
            >
              Upload Auction Inventory
            </Button>
          )}

          {fetchPrivilege && downloadLink && (
            <Button type="primary" icon={<DownloadOutlined />} block>
              <a
                style={{
                  textDecoration: 'none',
                  color: 'black'
                }}
                href={downloadLink}
                download
              >
                Download Auction Inventories
              </a>
            </Button>
          )}
        </Flex>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          pagination={{
            total: totalCount,
            defaultCurrent: 1,
            defaultPageSize: pageSize,
            onChange: onChangeCurrentPageNumber
          }}
          loading={isLoading}
        />
      </div>
    </Card>
  );
};

export default AuctionInventoryList;
