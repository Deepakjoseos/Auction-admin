import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import lotteryService from 'services/lottery'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()

  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    if (mode === EDIT) {
      const fetchBrandById = async () => {
        const { id } = param
        const data = await lotteryService.getLotteryById(id)
        if (data) {
          // For setting form values when Load if it is in EDIT mode
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            startTime: moment(
              `${data.startTime.hour}: ${data.startTime.minute}`,
              'HH:mm'
            ),
            drawTime: moment(
              `${data.drawTime.hour}: ${data.drawTime.minute}`,
              'HH:mm'
            ),
            editTime: moment(
              `${data.editTime.hour}: ${data.editTime.minute}`,
              'HH:mm'
            ),
          })
        } else {
          history.replace('/app/dashboards/catalog/lottery/lottery-list')
        }
      }

      fetchBrandById()
    }
  }, [form, mode, param, props])

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          name: values.name,
          status: values.status,
          startTime: {
            hour: moment(values.startTime).hour(),
            minute: moment(values.startTime).minute(),
          },
          drawTime: {
            hour: moment(values.drawTime).hour(),
            minute: moment(values.drawTime).minute(),
          },
          editTime: {
            hour: moment(values.editTime).hour(),
            minute: moment(values.editTime).minute(),
          },
        }

        console.log(sendingValues, 'values=====')

        if (mode === ADD) {
          const created = await lotteryService.createLottery(sendingValues)
          if (created) {
            message.success(`Created ${values.name} to Brand list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await lotteryService.editLottery(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.name} to Brand list`)
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
                {mode === 'ADD' ? 'Add New Brand' : `Edit Brand`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/catalog/brand/brands-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
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
              <GeneralField />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
