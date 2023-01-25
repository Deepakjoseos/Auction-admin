/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
// import GeneralField from '../GeneralField'
import GeneralField from './GeneralField';
import { useHistory } from 'react-router-dom';
import participantService from 'services/Participant';
import authAdminService from 'services/auth/admin';
import { useSelector } from 'react-redux';
import clientService from 'services/client';
// import Registrations from '../../registration/list-registration/index'
import feeTypeService from 'services/FeeType';
import RegistrationForm from '../registration/registrationForm/index';
import DepositForm from '../make-Deposit';
import WalletField from '../wallet/walletField';
import WalletTransaction from '../../wallet-transaction';
import WalletTransactionParticipant from './wallet-transactions-list';
import WalletFieldForm from '../wallet';
import DocumentFieldForm from '../documentupload';
import constantsService from 'services/constants';
import { set } from 'lodash';
import stateService from 'services/state';
import ResetPassword from '../reset-password';
import GroupMemberList from '../list-group-members';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const ParticipantForm = (props) => {
  const { mode = ADD, param } = props;
  const id = param?.id;
  const history = useHistory();

  const [form] = Form.useForm();
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false);
  const [subAdmins, setSubAdmins] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [clients, setClients] = useState([]);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [currentParticipant, setCurrentParticipant] = useState();
  const [participant, setParticipant] = useState([]);
  const [usertype, setUsertype] = useState([]);
  const [buyerEligibleBuisness, setBuyerEligibleBuisness] = useState([]);
  const [states, setStates] = useState([]);

  //   const [editorRender, setEditorRender] = useState(false)
  const getAllParticipants = async () => {
    const data = await participantService.getAllParticipants();
    if (data) {
      setParticipants(data);
    }
  };

  const getAllSubAdmins = async () => {
    const data = await authAdminService.getAllSubAdmins();
    if (data) {
      setSubAdmins(data);
      console.log(data, 'show-subadmins');
    }
  };
  const getAllClients = async () => {
    const data = await clientService.getClients();
    if (data) {
      setClients(data);
    }
  };

  const getParticipant = async () => {
    const data = await constantsService.getParticipant();
    if (data) {
      setParticipant(data);
      setUsertype(data);
      setBuyerEligibleBuisness(data);
    }
  };

  const getAllStates = async () => {
    const data = await stateService.getStates();
    if (data) {
      setStates(data);
    }
  };

  const fetchParticipantById = async () => {
    const { id } = param;
    const data = await participantService.getParticipantById(id);

    if (data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        password: data.password,
        contact: data.contact,
        gst: data.gst,
        status: data.status,
        clientId: data.client,

        // parentId: data.parentId,
        hdfcPanValidation: data.hdfcPanValidation,
        pan: data.panNumber,
        ParticipantType: data.participantType,
        pcc: data.pcc,
        relationshipManagerId: data.relationshipManager,
        UserType: data.userType,
        BuyerEligibleBuisness: data.buyerEligibleBuisness,
        ParticipantClient: data.participantClient,

        permanent_address: data.permanentAddress.address,
        permanent_city: data.permanentAddress.city,
        permanent_pincode: data.permanentAddress.pincode,
        permanent_state: data.permanentAddress.state,

        office_address: data.officeAddress.address,
        office_city: data.officeAddress.city,
        office_pincode: data.officeAddress.pincode,
        office_state: data.officeAddress.state,

        contact_person_name: data.contactPerson.phone,
        contact_person_phone: data.contactPerson.phone
      });
      setCurrentParticipant(data);
      setIsEmployee(data.userType === 'Employee' ? true : false);
      setIsBuyer(data.participantType === 'Buyer' ? true : false);
    } else {
      history.replace('/app/dashboards/user/user-list');
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem('auth_type') === 'Admin') {
      getAllSubAdmins();
    }
    getParticipant();
    getAllParticipants();
    getAllClients();
    getAllStates();
    if (mode === EDIT) {
      fetchParticipantById();
    }
  }, [mode]);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'valuewewes');

        const sendingValues = {
          name: values.name,
          email: values.email,
          status: values.status,
          password: values.password,
          contact: values.contact,
          gst: values.gst,
          hdfcPanValidation: values.hdfcPanValidation,
          panNumber: values.pan,
          participantType: values.ParticipantType,
          participantClient: values.participantClient,
          pcc: values.pcc,
          clientId: values.clientId,
          //   parentId: values.parentId,
          relationshipManagerId: values.relationshipManagerId,
          userType: values?.UserType,
          buyerEligibleBuisness: values.BuyerEligibleBuisness,
          permanentAddress: {
            address: values.permanent_address,
            city: values.permanent_city,
            pincode: values.permanent_pincode,
            state: values.permanent_state
          },
          officeAddress: {
            address: values.office_address,
            city: values.office_city,
            pincode: values.office_pincode,
            state: values.office_state
          },
          contactPerson: {
            name: values.contact_person_name,
            phone: values.contact_person_phone
          }
        };

        if (window.localStorage.getItem('auth_type') === 'SubAdmin')
          sendingValues.relationshipManagerId = user?._id;
        const body = { ...sendingValues, buyingLimit: 0, securityDeposit: 0 };
        console.log(sendingValues, 'sendingValues', user?._id);

        if (mode === ADD) {
          const created = await participantService.createParticipant(body);
          if (created) {
            message.success(`Created ${values.name} to participant list`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          const edited = await participantService.editParticipant(
            param.id,
            sendingValues
          );
          if (edited) {
            message.success(`Edited ${values.name} to participant list`);
            history.goBack();
          }
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log('info', info);
        message.error('Please enter all required field ');
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold'
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD' ? 'Add New Participant' : `Edit Participant`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/participant/participant-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  // disabled={submitLoading}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                subAdmins={subAdmins}
                form={form}
                participants={participants}
                mode={mode}
                setIsEmployee={setIsEmployee}
                isEmployee={isEmployee}
                setIsBuyer={setIsBuyer}
                isBuyer={isBuyer}
                clients={clients}
                participant={participant}
                buyerEligibleBuisness={buyerEligibleBuisness}
                usertype={usertype}
                states={states}
              />
            </TabPane>
            {id && (
              <>
                <TabPane tab="Reset Password" key="7">
                  <ResetPassword participantId={param?.id} />
                </TabPane>

                {isBuyer && (
                  <>
                    <TabPane tab="Registration" key="2">
                      <RegistrationForm participantId={param?.id} />
                    </TabPane>
                    <TabPane tab="Deposit" key="3">
                      <DepositForm participantId={param?.id} />
                    </TabPane>
                    <TabPane tab="Document Upload" key="4">
                      <DocumentFieldForm participantId={param?.id} />
                    </TabPane>
                    <TabPane tab="Wallet" key="5">
                      <WalletFieldForm participantId={param?.id} />
                    </TabPane>
                    <TabPane tab="Wallet Transactions" key="6">
                      <WalletTransactionParticipant participantId={param?.id} />
                    </TabPane>
                    <TabPane tab="Groups memberships" key="8">
                      <GroupMemberList participantId={param?.id} />
                    </TabPane>{' '}
                  </>
                )}
              </>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ParticipantForm;
