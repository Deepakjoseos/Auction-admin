import React, { useEffect } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  List,
  Button,
  notification,
} from 'antd'

import Editor from 'components/shared-components/Editor'
import CopyToClipboard from 'react-copy-to-clipboard'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],

  listingType: [
    {
      required: true,
      message: 'Required',
    },
  ],
  status: [
    {
      required: true,
      message: 'Required',
    },
  ],

  emailSubject: [
    {
      required: true,
      message: 'Required',
    },
  ],

  emailContent: [
    {
      required: true,
      message: 'Required',
    },
  ],

  smsTemplateId: [
    {
      required: true,
      message: 'Required',
    },
  ],

  smsContent: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ form, tempConstants, form_statuses }) => {

  console.log('constantstemplist', tempConstants)
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="listingType"
            label="Listing Type"
            rules={rules.listingType}
          >
            <Select placeholder="Listing Type" showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {tempConstants?.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              {/* {form_statuses.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))} */}
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
        </Card>

        <Card title="Email">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Form.Item
                name="emailSubject"
                label="Email Subject"
                rules={rules.emailSubject}
              >
                <Input placeholder="Email Subject" />
              </Form.Item>

              <Form.Item
                name="emailContent"
                label="Email Content"
                rules={rules.emailContent}
              >
                <Editor
                  placeholder="Write something..."
                  editorHtml={form.getFieldValue('emailContent') || ''}
                  onChange={(e) => form.setFieldsValue({ emailContent: e })}
                  name="emailContent"
                />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={8}>
              <h5>Copy Keys</h5>
              <div
                style={{
                  height: '445px',
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <List
                  dataSource={
                    tempConstants?.KEYS
                      ? Object.values(tempConstants['KEYS'])
                      : []
                  }
                  renderItem={(item) => (
                    <List.Item key={item}>
                      <List.Item.Meta title={item} />

                      <CopyToClipboard
                        text={item}
                        onCopy={() =>
                          notification.success({
                            message: 'Copied To Clipboard',
                          })
                        }
                      >
                        <Button type="primary">Copy</Button>
                      </CopyToClipboard>
                    </List.Item>
                  )}
                />
              </div>
            </Col> */}
            <Col xs={24} sm={24} md={16}>
              <Form.Item name="emailStatus" label="Status" rules={rules.status}>
                <Select placeholder="Status">
                  <Option value="Active">Active</Option>
                  <Option value="Hold">Hold</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* SMS */}

        <Card title="SMS">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Form.Item
                name="smsTemplateId"
                label="SMS Template Id"
                rules={rules.smsTemplateId}
              >
                <Input placeholder="SMS Template Id" />
              </Form.Item>

              <Form.Item
                name="smsContent"
                label="SMS Content"
                rules={rules.smsContent}
              >
                <Input
                // .TextArea rows={4}
                  placeholder="Write something..."
                  // editorHtml={form.getFieldValue('smsContent') || ''}
                  // onChange={(e) => form.setFieldsValue({ smsContent: e })}
                  name="smsContent"
                />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={8}>
              <h5>Copy Keys</h5>
              <div
                style={{
                  height: '445px',
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <List
                  dataSource={
                    tempConstants?.KEYS
                      ? Object.values(tempConstants['KEYS'])
                      : []
                  }
                  renderItem={(item) => (
                    <List.Item key={item}>
                      <List.Item.Meta title={item} />

                      <CopyToClipboard
                        text={item}
                        onCopy={() =>
                          notification.success({
                            message: 'Copied To Clipboard',
                          })
                        }
                      >
                        <Button type="primary">Copy</Button>
                      </CopyToClipboard>
                    </List.Item>
                  )}
                />
              </div>
            </Col> */}
            <Col xs={24} sm={24} md={16}>
              <Form.Item name="smsStatus" label="Status" rules={rules.status}>
                <Select placeholder="Status">
                  <Option value="Active">Active</Option>
                  <Option value="Hold">Hold</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* FCM */}

        <Card title="FCM">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Form.Item
                name="fcmTitle"
                label="FCM Title"
                rules={rules.fcmTitle}
              >
                <Input placeholder="FCM Title" />
              </Form.Item>

              <Form.Item
                name="fcmDescription"
                label="FCM Description"
                rules={rules.fcmDescription}
              >
                <Input
                // .TextArea rows={4}
                  placeholder="Write something..."
                  // editorHtml={form.getFieldValue('fcmDescription') || ''}
                  // onChange={(e) => form.setFieldsValue({ fcmDescription: e })}
                  name="fcmDescription"
                />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={8}>
              <h5>Copy Keys</h5>
              <div
                style={{
                  height: '445px',
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <List
                  dataSource={
                    tempConstants?.KEYS
                      ? Object.values(tempConstants['KEYS'])
                      : []
                  }
                  renderItem={(item) => (
                    <List.Item key={item}> 
                      <List.Item.Meta title={item} />

                      <CopyToClipboard
                        text={item}
                        onCopy={() =>
                          notification.success({
                            message: 'Copied To Clipboard',
                          })
                        }
                      >
                        <Button type="primary">Copy</Button>
                      </CopyToClipboard>
                    </List.Item>
                  )}
                />
              </div>
            </Col> */}
            <Col xs={24} sm={24} md={16}>
              <Form.Item name="fcmStatus" label="Status" rules={rules.status}>
                <Select placeholder="Status">
                  <Option value="Active">Active</Option>
                  <Option value="Hold">Hold</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
