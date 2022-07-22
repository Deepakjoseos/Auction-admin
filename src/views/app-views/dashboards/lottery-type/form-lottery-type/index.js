import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import lotteryGroupService from "services/lottery-group";
import { useHistory } from "react-router-dom";
import lotteryTypeService from "services/lotteryType";
import lotteryService from "services/lottery";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const LotteryTypeForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();
  const [form] = Form.useForm();
  console.log(mode);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [lotteryGroups, setLotteryGroups] = useState([]);
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    if (mode === ADD) {
      const fetchGroups = async () => {
        const data = await lotteryGroupService.getLotteryGroups();
        if (data) {
          setLotteryGroups(data);
        }
      };
      const fetchLotteries = async () => {
        const data = await lotteryService.getLotteries();
        if (data) {
          setLotteries(data);
        }
      };
      fetchLotteries();
      fetchGroups();
    }
    if (mode === EDIT) {
      const fetchTypeById = async () => {
        const { id } = param;
        const data = await lotteryTypeService.getLotteryTypeById(id);
        if (data) {
          // For setting form values when Load if it is in EDIT mode
          form.setFieldsValue({
            price: data.price,
            status: data.status,
          });
        } else {
          history.replace("/app/dashboards/lottery-type/list");
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
                price: Math.round(parseFloat(values.price) * 100) / 100,
                lotteryId: values.lotteryId,
                lotteryGroupId: values.lotteryGroupId,
                name: values.name,
              }
            : {
                price: Math.round(parseFloat(values.price) * 100) / 100,
                status: values.status,
              };

        console.log(sendingValues, "values=====");

        if (mode === ADD) {
          const created = await lotteryTypeService.createLotteryType(
            sendingValues
          );
          if (created) {
            message.success(`Created New to Lottery Type`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          const edited = await lotteryTypeService.editLotteryType(
            param.id,
            sendingValues
          );
          if (edited) {
            message.success(`Edited Lottery Group`);
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
                {mode === "ADD"
                  ? "Add New Lottery Group"
                  : `Edit Lottery Group`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push("/app/dashboards/lottery-group/list")
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
              <GeneralField
                mode={mode}
                lotteries={lotteries}
                groups={lotteryGroups}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default LotteryTypeForm;
