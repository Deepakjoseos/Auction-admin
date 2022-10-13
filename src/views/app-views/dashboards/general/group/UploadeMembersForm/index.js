import React, { useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import groupService from "services/group";
import UploadMembersField from "./UploadMembersField";

const { TabPane } = Tabs;

const UploadeMembersForm = (props) => {
  const { param } = props;
  const history = useHistory();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sheet, setSheet] = useState();

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, "values");

        const formData = new FormData();
        formData.append("file", sheet.originFileObj);
        setSubmitLoading(true);

        const uploaded = await groupService.uploadMembers(param.id, formData);
        if (uploaded) {
          message.success(`Uploaded Group Members.`);
          history.goBack();
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required field ");
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
          status: "Hold",
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
              <h2 className="mb-3">Upload Group Members</h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push("/app/dashboards/group/group-list")
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  disabled={submitLoading}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  Upload
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="Upload Participants" key="3">
              <UploadMembersField setSheet={setSheet} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default UploadeMembersForm;
