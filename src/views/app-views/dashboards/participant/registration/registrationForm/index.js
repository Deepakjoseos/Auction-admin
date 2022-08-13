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
import roleService from 'services/role'
import constantsService from 'services/constants'
import RegistrationField from './RegistrationField'
import feeTypeService from 'services/FeeType'
import registrationService from 'services/registration'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const RegistrationForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()

  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
   const [feeTypes,setFeeType]=useState([])

  useEffect(() => {
    const getFeeTypes = async () => {
        const data = await feeTypeService.getFeeTypes()
        if (data) {
          setFeeType(data)
          console.log(data, 'feetypes')
        }
      }
      getFeeTypes()
    // if (mode === EDIT) {
    //   const fetchInformationById = async () => {
    //     const { id } = param
    //    const data = await informationService.getInformationById(id)
    //    if (data) {
    //      let himg = []
    //      if (data.image) {
    //        himg = [
    //          {
    //            uid: Math.random() * 1000,
    //            name: Utils.getBaseName(data.image),
    //            url: data.image,
    //            thumbUrl: data.image,
    //          },
    //        ]
    //        setImage(himg)
    //        setFileListImages(himg)
    //      }
    //      form.setFieldsValue({
    //        name: data.name,
    //        status: data.status,
    //        priority: data.priority,
    //        description: data.description,
    //      })
    //      setEditorRender(true)
    //    } else {
    //      history.replace('/app/dashboards/information/information-list')
    //    }
    //   }
    //   fetchInformationById()
    // }
  }, [form, mode, param, props])


  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        // if (mode === ADD) {
        // Checking if image exists

        const sendingValues = {

          status: values?.status,
          countedIn:values?.countedIn,
          date:values?.date,
          expiry:values?.expiry,
          fee:values?.fee,
          feeRemark:values?.feeRemark,
          feeTypeId:values?.feeTypeId,
          mode:values?.mode,
          note:values?.note,
          participantId:values?.participantId,
     
          paymentDate:values?.paymentDate,
      
          payment: {
            bankName: values.bankName,
            branchName: values.branchName,
            number: values.number,
            receipt: values.receipt,
          },
        }

        console.log(sendingValues, 'values=====')

        const created = await registrationService.createRegistration(sendingValues)
        if (created) {
          message.success(`Created  registration`)
          history.goBack()
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
             
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push('/app/dashboards/participant/registration/list-registration/index')}
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
              <RegistrationField
              feeTypes={feeTypes} 
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default RegistrationForm
