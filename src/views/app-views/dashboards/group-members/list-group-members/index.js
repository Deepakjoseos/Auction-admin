import React, { useEffect, useState } from "react";
import { Card, Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";

import groupService from "services/group";

const GroupMemberList = () => {
  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const data = await groupService.getGroups();
    if (data) {
      let participants = [];
      data?.forEach((dat) => {
        dat.participants.forEach((part) => {
          participants.push({ name: dat.name, ...part });
        });
      });

      setList(participants);
      setSearchBackupList(participants);
      console.log(participants, "show-data");
    }
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Member",
      dataIndex: "member",
      render: (_, rec) => <>{rec.member?.name}</>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Remark",
      dataIndex: "remark",
      sorter: (a, b) => utils.antdTableSorter(a, b, "remark"),
    },
    {
      title: "Date Added",
      dataIndex: "timestamp",
      render: (date) => {
        var d = new Date(Number(date)).toDateString();
        return <Flex alignItems="center">{d}</Flex>;
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, "timestamp"),
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      render: (_, rec) => <>{rec.addedBy?.name}</>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
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

export default GroupMemberList;
