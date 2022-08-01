import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import agentService from 'services/agent'
import { values } from 'lodash'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const AgentForm = (props) => {

  const { mode = ADD, param } = props

  const history = useHistory()

  const [form] = Form.useForm()

  const [submitLoading, setSubmitLoading] = useState(false)
  const [agents, setAgents] = useState([])
  const [parent,setParent] = useState(null)

  useEffect(() => {
    const getAgents = async () => {
      const data = await agentService.getAgents()
      if (data) {
        setAgents(data)
        console.log(data, 'show-agents')
      }
    }
  
    getAgents()
    if (mode === EDIT) {
      const fetchBrandById = async () => {
        const { id } = param
        const data = await agentService.getAgentById(id)
        if (data) {
 
          const n= agents.find(e => e.id  === data.parentId);
          console.log('n',n)
          // return n?.name ? n.name :"-" 
          if(n?.name){
            setParent(n.name)
          }
          // For setting form values when Load if it is in EDIT mode
          
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            email: data.email,
            commission: data.commission,
            createAgents: data.createAgents,
            password: data.password

          })
        } else {
          history.replace('/app/dashboards/catalog/agent/agent-list')
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
          email: values.email,
          status: values.status,
          commission: values.commission,
          createAgents: values.createAgents,
          password: values.password,
          parentId:values.parentId

        }

        console.log(sendingValues, 'values=====')

        if (mode === ADD) {
          const created = await agentService.createAgent(sendingValues)
          if (created) {
            message.success(`Created ${values.name} to Brand list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await agentService.editAgent(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.name} to Agent list`)
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
                {mode === 'ADD' ? 'Add New Agent' : `Edit Agent`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/catalog/agent/agent-list')
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
              <GeneralField mode={mode} agents={agents}  parent={parent}/>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default AgentForm
