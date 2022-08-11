import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import informationService from 'services/information'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import participantService from 'services/Participant'
import authAdminService from 'services/auth/admin'
import { get } from 'lodash'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ParticipantForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [subAdmins, setSubAdmins] = useState([])
  const [participants, setParticipants] = useState([])
  const [isEmployee, setIsEmployee] = useState(false)
  const [isBuyer, setIsBuyer] = useState(false)
  //   const [editorRender, setEditorRender] = useState(false)

  useEffect(() => {
    const getAllSubAdmins = async () => {
      const data = await authAdminService.getAllSubAdmins()
      if (data) {
        setSubAdmins(data)
        console.log(data, 'show-subadmins')
      }
    }

    const getAllParticipants = async () => {
      const data = await authAdminService.getAllParticipants()
      if (data) {
        setParticipants(data)
      }
    }

    getAllSubAdmins()
    getAllParticipants()
    if (mode === EDIT) {
      const fetchParticipantById = async () => {
        const { id } = param
        const data = await participantService.getParticipantById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            email: data.email,
            password: data.password,
            contact: data.contact,
            gst: data.gst,
            status: data.status,

            // parentId: data.parentId,
            hdfcPanValidation: data.hdfcPanValidation,
            pan: data.pan,
            participantType: data.participantType,
            pcc: data.pcc,
            relationshipManagerId: data.relationshipManagerId,
            userType: data.userType,
            buyerEligibleBuisness: data.buyerEligibleBuisness,
            participantClient: data.participantClient,

            permanent_address: data.permanentAddress.address,
            permanent_city: data.permanentAddress.city,
            permanent_pincode: data.permanentAddress.pincode,
            permanent_state: data.permanentAddress.state,

            office_address: data.officeAddress.address,
            office_city: data.officeAddress.city,
            office_pincode: data.officeAddress.pincode,
            office_state: data.officeAddress.state,

            contact_person_name: data.contactPerson.phone,
            contact_person_phone: data.contactPerson.phone,
          })

          setIsEmployee(data.userType === 'Employee' ? true : false)
          setIsBuyer(data.participantType === 'Buyer' ? true : false)
        } else {
          history.replace('/app/dashboards/user/user-list')
        }
      }

      fetchParticipantById()
    }
  }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'valuewewes')
        const sendingValues = {
          name: values.name,
          email: values.email,
          status: values.status,
          password: values.password,
          contact: values.contact,
          gst: values.gst,
          hdfcPanValidation: values.hdfcPanValidation,
          pan: values.pan,
          participantType: values.participantType,
          participantClient: values.participantClient,
          pcc: values.pcc,
          //   parentId: values.parentId,
          relationshipManagerId: values.relationshipManagerId,
          userType: values.userType,
          buyerEligibleBuisness: values.buyerEligibleBuisness,
          permanentAddress: {
            address: values.permanent_address,
            city: values.permanent_city,
            pincode: values.permanent_pincode,
            state: values.permanent_state,
          },
          officeAddress: {
            address: values.office_address,
            city: values.office_city,
            pincode: values.office_pincode,
            state: values.office_state,
          },
          contactPerson: {
            name: values.contact_person_name,
            phone: values.contact_person_phone,
          },
        }
        if (mode === ADD) {
          const created = await participantService.createParticipant(
            sendingValues
          )
          if (created) {
            message.success(`Created ${values.name} to participant list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await participantService.editParticipant(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.name} to participant list`)
            history.goBack()
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
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
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ParticipantForm
