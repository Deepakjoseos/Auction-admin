import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import lotteryService from "services/lottery";
import { useHistory } from "react-router-dom";
import outcomeService from "services/outcome";

const { TabPane } = Tabs;

const OutcomeForm = (props) => {
  const history = useHistory();

  const [form] = Form.useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    const fetchLotteries = async () => {
      const lotteryData = await lotteryService.getLotteries();
      if (lotteryData) {
        setLotteries(lotteryData);
      }
    };

    fetchLotteries();
  }, [form, props]);

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          lotteryId: values.lotteryId,
          superLotteries: [
            { numbers: values.rank1.split(","), rank: 1 },
            { numbers: values.rank2.split(","), rank: 2 },
            { numbers: values.rank3.split(","), rank: 3 },
            { numbers: values.rank4.split(","), rank: 4 },
            { numbers: values.rank5.split(","), rank: 5 },
            { numbers: values.rank6.split(","), rank: 6 },
          ],
        };

        console.log(sendingValues, "values=====");

        const created = await outcomeService.drawLottery(sendingValues);
        if (created) {
          message.success(`Created Outcome`);
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
              <h2 className="mb-3">Draw Lottery</h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push("/app/dashboards/catalog/brand/brands-list")
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
                  Draw
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField lotteries={lotteries} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default OutcomeForm;
