import React, { useEffect, useState } from "react";
import { Card, Table, Input, Tag, Select,Button } from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import transactionService from "services/transaction";
import { Option } from "rc-select";
import {
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const getStatus = (type) => {
  if (type === "Credit") {
    return (
      <>
        <Tag color="green">Credit</Tag>
      </>
    );
  }
  if (type === "Debit") {
    return (
      <>
        <Tag color="red">Debit</Tag>
      </>
    );
  }

  return null;
};

const TransactionList = () => {
  let history = useHistory()

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  useEffect(() => {
    // Getting Lotteries List to display in the table
    const getLottoryTypes = async () => {
      const data = await transactionService.getTransaction();
      if (data) {
        setList(data);
        setSearchBackupList(data);
      }
    };
    getLottoryTypes();
  }, []);

  const handleTransactionType = (value) => {
    if (value !== "All") {
      const key = "type";
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
    }
  };
 
  // Antd Table Columns
  const tableColumns = [
    {
      title: "Sender",
      dataIndex: "sender",
      render: (sender) => <Flex alignItems="center">{sender?.name}</Flex>,
      sorter: (a, b) => a.sender.name.localeCompare(b.sender.name),
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render: (receiver) => <Flex alignItems="center">{receiver?.name}</Flex>,
      sorter: (a, b) => a.receiver.name.localeCompare(b.receiver.name),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => <Flex alignItems="center">{getStatus(type)}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "type"),
    },
   
  ];
  const addTransaction = () => {
    history.push(`/app/dashboards/transaction/add-transaction`);
  };

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

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
      <div className="mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleTransactionType}
          placeholder="Type"
        >
          <Option value="All">All</Option>
          <Option value="Credit">Credit</Option>
          <Option value="Debit">Debit</Option>
        </Select>
      </div>
      <Button  
            onClick={addTransaction}
            type="primary"
            icon={<PlusCircleOutlined />}
           
          >
            Add Transaction
          </Button>
    </Flex>
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default TransactionList;
