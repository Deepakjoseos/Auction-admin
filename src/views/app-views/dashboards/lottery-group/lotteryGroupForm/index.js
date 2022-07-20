import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import lotteryGroupService from 'services/lottery-group'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const LotteryGroupForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()

  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    if (mode === EDIT) {
      const fetchGroupById = async () => {
        const { id } = param
        const data = await lotteryGroupService.getLotteryGroupById(id)
        if (data) {
          // For setting form values when Load if it is in EDIT mode
          form.setFieldsValue({
            number: data.number,
            status:data.status,
          
           
          })
        } else {
          history.replace('/app/dashboards/catalog/lottery/lottery-group-list')
        }
      }

      fetchGroupById()
    }
  }, [form, mode, param, props])

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          number: values.number,
          status:values.status,
          
        }

        console.log(sendingValues, 'values=====')

        if (mode === ADD) {
          const created = await lotteryGroupService.createLotteryGroup(sendingValues)
          if (created) {
            message.success(`Created New to Lottery Group`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await lotteryGroupService.editLotteryGroup(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited Lottery Group`)
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
          group: 1,
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
                {mode === 'ADD' ? 'Add New Lottery Group' : `Edit Lottery Group`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/lottery-group/lottery-group-list')
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
              <GeneralField mode={mode} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default LotteryGroupForm
