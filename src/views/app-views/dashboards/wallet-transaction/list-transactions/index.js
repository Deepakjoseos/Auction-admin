import React, { useEffect, useState } from "react";
import { Card, Table, Input, Tag, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import walletTransactionService from "services/walletTransaction";
import participantService from "services/Participant";

const { Option } = Select;

const getStockStatus = (status) => {
  if (status === "Verified") {
    return (
      <>
        <Tag color="green">Verified</Tag>
      </>
    );
  }
  if (status === "Unverified") {
    return (
      <>
        <Tag color="red">Unverified</Tag>
      </>
    );
  }

  return null;
};

const WalletTransactionList = () => {
  const [list, setList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  //   const [currentSubAdminRole, setCurrentSubAdminRole] = useState({});
  useEffect(() => {
    getWalletTransaction();
    getParticipants();
  }, []);

  const getWalletTransaction = async (query) => {
    const data = await walletTransactionService.getTransactions(query);
    if (data) {
      setList(data);
      setSearchBackupList(data);
      console.log(data, "show-data");
    }
  };

  const getParticipants = async () => {
    const data = await participantService.getAllParticipants();
    setParticipants(data);
  };

  const tableColumns = [
    {
      title: "Transaction Type",
      dataIndex: "type",
      sorter: (a, b) => utils.antdTableSorter(a, b, "type"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
    },
    {
      title: "Wallet Balance",
      dataIndex: "balance",
      sorter: (a, b) => utils.antdTableSorter(a, b, "balance"),
    },
    {
      title: "Deposit Date",
      dataIndex: "createdAt",
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "createdAt"),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => utils.antdTableSorter(a, b, "description"),
    },
    {
      title: "Participant",
      dataIndex: "participant",
      render: (participant) => participant?.name,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const handleParticipantChange = async (value) => {
    if (value === "All") await getWalletTransaction();
    else {
      const query = { participantId: value };
      await getWalletTransaction(query);
    }
  };

  const handleTypeChange = (value) => {
    if (value !== "All") {
      const key = "type";
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
    }
  };

  const filters = () => (
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleParticipantChange}
          placeholder="Participant"
        >
          <Option value="All">All</Option>
          {participants.map((participant) => (
            <Option value={participant._id}>{participant.name}</Option>
          ))}
        </Select>
      </div>
      <div className="mr-md-3 mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleTypeChange}
          placeholder="Transaction Type"
        >
          <Option value="All">All</Option>
          <Option value="CREDIT">CREDIT</Option>
          <Option value="DEBIT">DEBIT</Option>
        </Select>
      </div>
    </Flex>
  );

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
        </Flex>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
    </>
  );
};

export default WalletTransactionList;
