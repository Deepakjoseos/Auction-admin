import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useHistory } from "react-router-dom";
import stateService from "services/state";
import cityService from "services/city";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const CityForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (mode === EDIT) fetchCity();
    getStates();
  }, [form, mode, param, props]);

  const fetchCity = async () => {
    const { id } = param;
    const data = await cityService.getCity(id);
    if (data) {
      form.setFieldsValue({
        name: data.name,
        status: data.status,
        stateId: data.state._id,
      });
    } else {
      history.replace("/app/dashboards/general/city/city-list");
    }
  };

  const getStates = async () => {
    const data = await stateService.getStates();
    if (data) setStates(data);
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          console.log(values);
          const created = await cityService.createCity(values);
          if (created) {
            message.success(`Created ${values.name} to City list`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          const edited = await cityService.updateCity(param.id, values);
          if (edited) {
            message.success(`Edited ${values.name} to City list`);
            history.goBack();
          }
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
              <h2 className="mb-3">
                {mode === "ADD" ? "Add New City" : `Edit City`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("/app/dashboards/general/city/city-list")}
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
              <GeneralField states={states} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default CityForm;
