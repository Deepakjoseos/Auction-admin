import { useState } from 'react';
import { message, Button, Form, Col, Row, Card, Input } from 'antd';
import participantService from 'services/Participant';
import { useHistory } from 'react-router-dom';

const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})');

const ResetPassword = ({ participantId }) => {
  const [newPasswordValue, setNewPasswordValue] = useState('');

  const history = useHistory();

  const onChangeValueHandler = (event) => {
    setNewPasswordValue(event.target.value);
  };

  const onResetPassword = () => {
    if (!newPasswordValue.match(passwordRegex)) {
      message.error(
        'Password is too weak. Password must have atleast:- 1 Upper & 1 Lower Character, 1 Special Character, 1 Number. Min Length 8.'
      );
      return;
    }

    const edited = participantService.updateParticipantPassword(
      participantId,
      newPasswordValue
    );

    if (edited) {
      message.success(`Reset Password Successfully`);
      history.goBack();
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
              onChange={onChangeValueHandler}
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
