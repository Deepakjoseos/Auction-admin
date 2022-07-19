import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message } from 'antd'
import firebase from 'firebase/app'
import { signOut } from 'redux/actions/Auth'
import { connect } from 'react-redux'

export class ChangePassword extends Component {
  changePasswordFormRef = React.createRef()

  onFinish = (values) => {
    console.log('val', values)

    firebase
      .auth()
      .currentUser.updatePassword(values.newPassword)
      .then(() => {
        // Update successful.
        message.success({ content: 'Password Changed!', duration: 2 })
      })
      .catch((err) => {
        // An error ocurred
        message.error({ content: err.message, duration: 2 })
        if (err.code === 'auth/requires-recent-login') {
          firebase.auth().signOut()
          this.props.signOut()
        }
        // ...
      })

    this.onReset()
  }

  onReset = () => {
    this.changePasswordFormRef.current.resetFields()
  }

  render() {
    return (
      <>
        <h2 className="mb-4">Change Password</h2>
        <Row>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Form
              name="changePasswordForm"
              layout="vertical"
              ref={this.changePasswordFormRef}
              onFinish={this.onFinish}
            >
              {/* <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your currrent password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item> */}
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your new password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject('Password not matched!')
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Change password
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

const mapDispatchToProps = {
  signOut,
}

export default connect(null, mapDispatchToProps)(ChangePassword)
