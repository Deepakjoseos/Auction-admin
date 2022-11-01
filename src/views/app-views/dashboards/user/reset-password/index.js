import { useState } from 'react';
import { message, Button, Form, Col, Row, Card, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import authSubAdminService from 'services/auth/subAdmin';

const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})');

const ResetPassword = ({ userId }) => {
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const history = useHistory();

  const onChangePasswordValueHandler = (event) => {
    setNewPasswordValue(event.target.value);
  };

  const onChangeConfirmValueHandler = (event) => {
    setConfirmPasswordValue(event.target.value);
  };

  const onResetPassword = () => {
    if (!newPasswordValue.match(passwordRegex)) {
      message.error(
        'Password is too weak. Password must have atleast:- 1 Upper & 1 Lower Character, 1 Special Character, 1 Number. Min Length 8.'
      );
      return;
    }

    if (confirmPasswordValue !== newPasswordValue) {
      message.error('Confirm Password not matching!');
      return;
    }

    const edited = authSubAdminService.restPassword({
      id: userId,
      password: newPasswordValue
    });
    
    if (edited) {
      message.success(`Reset Password Successfully`);
    }
  };
  return (
    <Row>
      <Col xs={24} sm={24} md={17}>
        <Card title="Password Reset">
          <Form.Item
            name="newPassword"
            label="New Password"
            placeholder="New Password"
          >
            <Input.Password
              value={newPasswordValue}
              onChange={onChangePasswordValueHandler}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
          >
            <Input.Password
              value={confirmPasswordValue}
              onChange={onChangeConfirmValueHandler}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="button"
            style={{ float: 'right', marginTop: '20px' }}
            onClick={onResetPassword}
          >
            Reset
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
