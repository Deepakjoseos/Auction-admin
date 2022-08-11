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
import stateService from 'services/state'

const { Option } = Select


const StateList = () => {
    let history = useHistory()

    const [list, setList] = useState([])
    const [searchBackupList, setSearchBackupList] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    

    useEffect(() => {
        // Getting Lotteries List to display in the table
        const getStates = async () => {
            const data = await stateService.getStates()
            if (data) {
                setList(data)
                setSearchBackupList(data)
                console.log(data, 'show-data')
            }
        }
        
        getStates()
    }, [])
  
 

    // Dropdown menu for each row
    // const dropdownMenu = (row) => (
    //     <Menu>
    //       <Menu.Item onClick={() => viewDetails(row)}>
    //         <Flex alignItems="center">
    //           <EyeOutlined />
    //           <span className="ml-2">View Details</span>
    //         </Flex>
    //       </Menu.Item>
      
    //     </Menu>
    //   )

    // const addSettings = () => {
    //     history.push(`/app/dashboards/settings/add-settings`)
    // }

    // const viewDetails = (row) => {
    //     history.push(`/app/dashboards/settings/edit-settings`)
    // }

    // Antd Table Columns
    const tableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
        },
         {
             title: 'Abbreviation',
             dataIndex: 'abbreviation',
             sorter: (a, b) => utils.antdTableSorter(a, b, 'abbreviation'),
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

 
 
    //  Table Filters JSX Elements
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
              
                </Flex>
                <div className="table-responsive">
                    <Table columns={tableColumns} dataSource={list} rowKey="id" />
                </div>
            </Card>
         
        </>
    )
}

export default StateList
