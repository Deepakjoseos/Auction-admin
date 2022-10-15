import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Col,
  Form,
  Row,
} from "antd";
// import InformationListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import qs from 'qs'
import auctionService from "services/auction";
import { useSelector } from "react-redux";
import vehicletypeService from "services/vehicleType";
import clientService from "services/client";
import cityService from "services/city";
import regionService from "services/region";
import _ from "lodash";
const { Option } = Select;

const getStockStatus = (status) => {
  if (status === "Active") {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    );
  }
  if (status === "Hold") {
    return (
      <>
        <Tag color="red">Hold</Tag>
      </>
    );
  }
  return null;
};
const GroupList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [vehicleTypeId, setVehicleTypeId] = useState([])
  const [city, setCity] = useState([])
  const [client, setClientById] = useState([])
  const [regionId, setRegionsByID] = useState([])
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => state.auth);



  
  const getauctions = async ( filterParams) => {
    setLoading(true)
    const data = await auctionService.getauctions(
      qs.stringify(filterParams)
    )
    if (data) {
      setList(data)

    }
   
  }




  useEffect(() => {
    
    const getVehicleTypeById = async () => {
      const data = await vehicletypeService.getVehicleTypes()
      if (data) {
        setVehicleTypeId(data)
      }
    }
    const getClientById = async () => {
      const data = await clientService.getClients()
      if (data) {
        setClientById(data)
      }
    }
    const getCity = async () => {
      const data = await cityService.getCities()
      if (data) {
        setCity(data)
      }
    }
    const getRegionsByID = async () => {
      const data = await regionService.getRegions()
      if (data) {
        setRegionsByID(data)
      }
    }
    getRegionsByID()
    getVehicleTypeById()
    getClientById()
    getCity()

  }, [])
  


 


  useEffect(() => {
    const getGroups = async () => {
      const data = await auctionService.getauctions();
      if (data) {
        setList(data);
        console.log(data);
        setSearchBackupList(data);
        console.log(data, "show-data");
      }
    };
    getGroups();
  }, []);

  const dropdownMenu = (row) => {
    if (window.localStorage.getItem("auth_type") === "Admin") {
      return (
        <Menu>
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
        </Menu>
      );
    } else {
      if (currentSubAdminRole?.edit) {
        return (
          <Menu>
            <Menu.Item onClick={() => viewDetails(row)}>
              <Flex alignItems="center">
                <EyeOutlined />
                <span className="ml-2">View Details</span>
              </Flex>
            </Menu.Item>
          </Menu>
        );
      }
    }
  };

  const addGroup = () => {
    history.push(`/app/dashboards/auction/auction/add-auction`);
  };

  const viewDetails = (row) => {
    history.push(`/app/dashboards/auction/auction/edit-auction/${row._id}`);
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    
    {
      title: "Bid Limit",
      dataIndex: "bidLimit",
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "Business",
      dataIndex: "businessType",
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "Format",
      dataIndex: "format",
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "Start Time",
      dataIndex: "startTimestamp",
      render: (status) => {
        var d = new Date(Number(status)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },
    {
      title: "End Time",
      dataIndex: "endTimestamp",
      render: (status) => {
        var d = new Date(Number(status)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "business"),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          {window.localStorage.getItem("auth_type") === "Admin" ? (
            <EllipsisDropdown menu={dropdownMenu(elm)} />
          ) : (
            currentSubAdminRole?.edit && (
              <EllipsisDropdown menu={dropdownMenu(elm)} />
            )
          )}
        </div>
      ),
    },
  ];

  
  // Filter Submit
  const handleFilterSubmit = async () => {
   

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true);
        // Removing falsy Values from values
        const sendingValues =  _.pickBy(values, _.identity);
        getauctions( sendingValues)
      })
      .catch((info) => {
        console.log("info", info);
        setFilterEnabled(false);
      });
  };

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields();

   
    getauctions({});
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
          <Form.Item
            name="vehicleTypeId"
            label="Vehicle Type"
          >
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
        <Col md={6} sm={24} xs={24} lg={6}C>
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




        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="clientId" label="Client">
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
              placeholder="client"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {client.map((client) => (
                <Option key={client._id} value={client._id}>
                  {client.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
     
     
     
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="type" label="Type">
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
          <Form.Item name="format" label="Format">
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
        >
          <Option value="">All</Option>
          <Option value="Open">Open</Option>
          <Option value="Close">Close</Option>
        </Select>
          </Form.Item>
        </Col>



        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="closeType" label="Close Type">
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
          placeholder="closeType"
        >
          <Option value="">All</Option>
          <Option value="Show Rank">Show Rank</Option>
          <Option value="Hide Rank">Hide Rank</Option>
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
          placeholder="Time status"
        >
          <Option value="">All</Option>
          <Option value="LIVE">Live</Option>
          <Option value="UPCOMMING">Upcomming</Option>
        </Select>
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
      <div className="mb-3">
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
      </div>
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

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const handleShowStatus = (value) => {
    if (value !== "All") {
      const key = "status";
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
    }

  };

  

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
        <div>
          <br></br><br></br><br></br><br></br><br></br>
          <br></br><br></br><br></br><br></br>
          {window.localStorage.getItem("auth_type") === "SubAdmin" ? (
            <>
              {currentSubAdminRole?.add && (
                <Button
                  onClick={addGroup}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Auction
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={addGroup}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Auction
            </Button>
          )}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default GroupList;
