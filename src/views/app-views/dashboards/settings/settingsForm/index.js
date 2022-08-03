import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useHistory } from "react-router-dom";
import authAdminService from "services/auth/admin";
import settingsService from "services/settings";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const SettingsForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();
  const [form] = Form.useForm();
  console.log(mode);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues =
         { name: values?.name,
            address: values?.address,
            email: values?.email,
            phone: values?.phone,
            facebookUrl: values?.facebookUrl,
            instagramUrl: values?.instagramUrl,
            twitterUrl: values?.twitterUrl,
        }
               
          

        console.log(sendingValues, "values=====");

        if (mode === ADD) {
          const created = await settingsService.createSettings(sendingValues);
          if (created) {
            console.log(created);
            message.success(`Created New Settings`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
        
          
  
            const edited = await settingsService.editSettings(
              param.id,
              values
            )
            if (edited) {
              message.success(`Edited to Settings list`)
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
                {mode === "ADD" ? "Add New settings" : `Edit settings`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push("/app/dashboards/settings/settings-list")
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
                  {mode === "ADD" ? "Add" : `Save`}
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
  );
};

export default SettingsForm;
