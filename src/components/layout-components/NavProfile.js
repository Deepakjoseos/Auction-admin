import React from 'react'
import { Menu, Dropdown, Avatar } from 'antd'
import { connect, useSelector } from 'react-redux'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import Icon from 'components/util-components/Icon'
import { signOut } from 'redux/actions/Auth'

const menuItem = [
  {
    title: 'Edit Profile',
    icon: EditOutlined,
    path: '/app/pages/profile',
  },
]

export const NavProfile = ({ signOut }) => {
  const { user } = useSelector((state) => state.auth)

  const profileImg = '/img/avatars/thumb-1.jpg'
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={user?.displayImage} />
          <div className="pl-3">
            <h4 className="mb-0">{user?.name}</h4>
            <span className="text-muted">{user?.type}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            )
          })}
          <Menu.Item key={menuItem.length + 1} onClick={(e) => signOut()}>
            <span>
              <LogoutOutlined />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={['click']}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={user?.displayImage} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  )
}

export default connect(null, { signOut })(NavProfile)
