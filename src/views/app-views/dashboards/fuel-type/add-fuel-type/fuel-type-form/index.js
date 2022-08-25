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
import feeTypeService from 'services/FeeType'
import FuelTypeService from 'services/FuelType'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const FuelTypeForm = (props) => {
  console.log(props);
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

 

  useEffect(() => {
    if (mode === EDIT) {
      const fetchfuelTypeById = async () => {
        const { id } = param
        const data = await FuelTypeService.getFuelTypeById(id)
        if (data) {
        

          form.setFieldsValue({
            name: data.name,
            status:data.status
          })

        } else {
          history.replace('/app/dashboards/fee-type/fee-type-list')
        }
      }

      fetchfuelTypeById()
    }
  }, [form, mode, param, props])





  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          // Checking if image exists
        
          const created = await FuelTypeService.addFuelType(values)
          if (created) {
            message.success(`Created ${values.name} to FuelType list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
         
       
          const edited = await FuelTypeService.editFuelType(
           {id: param.id,
           data: values}
          )
          if (edited) {
            message.success(`Edited ${values.name} to Fuel Type list`)
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
                {mode === 'ADD' ? 'Add New FuelType' : `Edit FuelType`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/fuel-type/fuel-type-list')
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
                // uploadedImg={uploadedImg} 
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
                // propsImages={propsImages}
                form={form}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default FuelTypeForm
