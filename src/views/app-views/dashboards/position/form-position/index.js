import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useHistory } from "react-router-dom";
import positionService from "services/position";
import lotteryTypeService from "services/lotteryType";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const PositionForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();
  const [form] = Form.useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [lotteryTypes, setLotteryTypes] = useState([]);

  useEffect(() => {
    if (mode === ADD) {
      const fetchTypes = async () => {
        const data = await lotteryTypeService.getLotteryTypes();
        if (data) {
          setLotteryTypes(data);
        }
      };

      fetchTypes();
    }
    if (mode === EDIT) {
      const fetchTypeById = async () => {
        const { id } = param;
        const data = await positionService.getPositionById(id);
        if (data) {
          // For setting form values when Load if it is in EDIT mode
          form.setFieldsValue({
            reward: data.amount,
            count: data.count,
            agentReward: data.agentCommission,
            lottery: data.lottery.name,
            lotteryType: data.lotteryType.name,
            rank: data.rank,
          });
        } else {
          history.replace("/app/dashboards/position/list");
        }
      };

      fetchTypeById();
    }
  }, [form, mode, param, props, history]);

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues =
          mode === ADD
            ? {
                rank: parseInt(values.rank),
                amount: Math.round(parseFloat(values.reward) * 100) / 100,
                agentCommission:
                  Math.round(parseFloat(values.agentReward) * 100) / 100,
                count: parseInt(values.count),
                lotteryTypeId: values.lotteryTypeId,
              }
            : {
                amount: Math.round(parseFloat(values.reward) * 100) / 100,
                agentCommission:
                  Math.round(parseFloat(values.agentReward) * 100) / 100,
                count: parseInt(values.count),
              };

        if (mode === ADD) {
          const created = await positionService.createPosition(sendingValues);
          if (created) {
            message.success(`Created New to Lottery Type`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          const edited = await positionService.editPosition(
            param.id,
            sendingValues
          );
          if (edited) {
            message.success(`Edited Position`);
            history.goBack();
          }
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        setSubmitLoading(false);
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
                {mode === "ADD" ? "Add New Position" : `Edit Position`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push("/app/dashboards/position/list")}
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
              <GeneralField mode={mode} lotteryTypes={lotteryTypes} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default PositionForm;
