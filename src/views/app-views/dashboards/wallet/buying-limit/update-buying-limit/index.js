import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import participantService from "services/Participant";
import BuyingLimitField from "./BuyingLimitField";
import buyinglLimitService from "services/buyingLimit";

const { TabPane } = Tabs;

const BuyingLimitForm = (props) => {
  const { param } = props;
  const history = useHistory();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [participantId, setParticipantId] = useState();

  useEffect(() => {
    fetchParticipant();
  }, [form, param, props]);

  const fetchParticipant = async () => {
    const { id } = param;
    const data = await participantService.getParticipantById(id);
    if (data) {
      form.setFieldsValue({
        amount: data.wallet.currentBuyingLimit,
        remark: data.wallet.remark,
        participant: data.name,
      });
      setParticipantId(data._id);
    } else {
      history.replace("/app/dashboards/wallet/wallet-list");
    }
  };

  const onFinish = async () => {
    console.log('walletYupdates')
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const data = {
          amount: values.amount,
          remark: values.remark,
          participantId,
        };
        const updated = await buyinglLimitService.update(data);
        if (updated) {
          message.success(
            `Updated buying limit to ${values.amount} for ${values.participant}`
          );
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
              <h2 className="mb-3">"Update Buying Limit"</h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push("/app/dashboards/wallet/wallet-list")
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
                  Update
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <BuyingLimitField />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default BuyingLimitForm;
