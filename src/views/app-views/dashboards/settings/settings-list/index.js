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
import settingsService from 'services/settings'

const { Option } = Select


const SettingsList = () => {
    let history = useHistory()

    const [list, setList] = useState([])
    const [searchBackupList, setSearchBackupList] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    

    useEffect(() => {
        // Getting Lotteries List to display in the table
        const getSettings = async () => {
            const data = await settingsService.getSettings()
            if (data) {
                setList(data)
                setSearchBackupList(data)
                console.log(data, 'show-data')
            }
        }
        
        getSettings()
    }, [])
  
 

    // Dropdown menu for each row
    const dropdownMenu = (row) => (
        <Menu>
          <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">View Details</span>
            </Flex>
          </Menu.Item>
      
        </Menu>
      )

    const addSettings = () => {
        history.push(`/app/dashboards/settings/add-settings`)
    }

    const viewDetails = (row) => {
        history.push(`/app/dashboards/settings/edit-settings`)
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
             title: 'Phone',
             dataIndex: 'phone',
             sorter: (a, b) => utils.antdTableSorter(a, b, 'phone'),
         },
         {
             title: 'Address',
             dataIndex: 'address',
             sorter: (a, b) => utils.antdTableSorter(a, b, 'address'),
         },
      
         {
             title: 'Facebook',
             dataIndex: 'facebookUrl',
             sorter: (a, b) => utils.antdTableSorter(a, b, 'facebookUrl'),
         },
         {
             title: 'Instagram',
             dataIndex: 'instagramUrl',
             sorter: (a, b) => utils.antdTableSorter(a, b, 'instagramUrl'),
         },
         {
             title: 'Twitter',
             dataIndex: 'twitterUrl',
             sorter: (a, b) => utils.antdTableSorter(a, b, 'twitterUrl'),
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
         
        </Flex>
    )

    return (
        <>
            <Card>
                <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                    {filters()}
                    <div>
                        <Button
                            onClick={addSettings}
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            block
                        >
                            Add Settings
                        </Button>
                    </div>
                </Flex>
                <div className="table-responsive">
                    <Table columns={tableColumns} dataSource={list} rowKey="id" />
                </div>
            </Card>
         
        </>
    )
}

export default SettingsList
