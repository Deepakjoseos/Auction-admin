import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag, Modal, Form, notification } from 'antd'
// import BrandListData from 'assets/data/product-list.data.json'
import {
    EyeOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import brandService from 'services/brand'
import agentService from 'services/agent'
import Password from 'antd/lib/input/Password'

const { Option } = Select

const getStockStatus = (status) => {
    if (status === 'Active') {
        return (
            <>
                <Tag color="green">Active</Tag>
            </>
        )
    }
    if (status === 'Hold') {
        return (
            <>
                <Tag color="red">Hold</Tag>
            </>
        )
    }


    return null
}
const AgentList = () => {
    let history = useHistory()

    const [list, setList] = useState([])
    const [searchBackupList, setSearchBackupList] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [agentIdForPassword,setAgentIdForPassword] = useState(null)
    const [agentPassword,setAgentPassword] = useState(null)

    useEffect(() => {
        // Getting Lotteries List to display in the table
        const getAgents = async () => {
            const data = await agentService.getAgents()
            if (data) {
                setList(data)
                setSearchBackupList(data)
                console.log(data, 'show-data')
            }
        }
        getAgents()
    }, [])
    const showModal = (row) => {
        setIsModalVisible(true);
        setAgentIdForPassword(row.id)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setAgentIdForPassword(null)
        setAgentPassword(null)
    };
  

    // Dropdown menu for each row
    const dropdownMenu = (row) => (
        <Menu>
            <Menu.Item onClick={() => viewDetails(row)}>
                <Flex alignItems="center">
                    <EyeOutlined />
                    <span className="ml-2">View Details</span>
                </Flex>
            </Menu.Item>
            <Menu.Item onClick={() => showModal(row)}>
                <Flex alignItems="center">
                    <EyeOutlined />
                    <span className="ml-2">Edit Password</span>
                </Flex>
            </Menu.Item>

        </Menu>


    )

    const addLottery = () => {
        history.push(`/app/dashboards/agent/add-agent`)
    }

    const viewDetails = (row) => {
        history.push(`/app/dashboards/agent/edit-agent/${row.id}`)
    }

    // Antd Table Columns
    const tableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => utils.antdTableSorter(a, b, 'email'),
        },
        {
            title: 'CreateAgents',
            dataIndex: 'createAgents',
            render: (text) => text ? "Yes" : "No",
            sorter: (a, b) => utils.antdTableSorter(a, b, 'createAgents'),
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Flex alignItems="center">{getStockStatus(status)}</Flex>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right">
                    <EllipsisDropdown menu={dropdownMenu(elm)} />
                </div>
            ),
        },
    ]

    // When Search is used
    const onSearch = (e) => {
        const value = e.currentTarget.value
        const searchArray = e.currentTarget.value ? list : searchBackupList
        const data = utils.wildCardSearch(searchArray, value)
        setList(data)
        setSelectedRowKeys([])
    }

    // Filter Status Handler
    const handleShowStatus = (value) => {
        if (value !== 'All') {
            const key = 'status'
            const data = utils.filterArray(searchBackupList, key, value)
            setList(data)
        } else {
            setList(searchBackupList)
        }
    }
  const  editAgentPassword  = async ()=>{
    console.log('agentpassword',agentPassword)
     if(agentPassword?.length > 0){
       const res = await agentService.editPassword(agentIdForPassword,{password:agentPassword})
      if(res){
        notification.success({
            message:"Edited Password successfully"
        })
        handleCancel()
        setAgentPassword(null)
        setAgentIdForPassword(null)
      }
     }
  }
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
                    onChange={handleShowStatus}
                    placeholder="Status"
                >
                    <Option value="All">All</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Hold">Hold</Option>
                </Select>
            </div>
        </Flex>
    )

    return (
        <>
            <Card>
                <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                    {filters()}
                    <div>
                        <Button
                            onClick={addLottery}
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            block
                        >
                            Add Agent
                        </Button>
                    </div>
                </Flex>
                <div className="table-responsive">
                    <Table columns={tableColumns} dataSource={list} rowKey="id" />
                </div>
            </Card>
            <Modal  footer={false} title="Edit Password" visible={isModalVisible}  onCancel={handleCancel}>
                <Form.Item
                    label="Password"
                    name="password"
                //   onChange={(e)=>setAgentIdForPassword(e.target.value)}
                
                >
                    <Input.Password value={agentPassword} onChange={(e)=>setAgentPassword(e.target.value)}/>

                    <Form.Item className="mt-2" wrapperCol={{ offset: 18, span: 16  }}>
                        <Button type="primary" htmlType="submit" onClick={editAgentPassword}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form.Item>
            </Modal>
        </>
    )
}

export default AgentList
