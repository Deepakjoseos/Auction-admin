import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useHistory } from "react-router-dom";
import transactionService from "services/transaction";
import agentService from "services/agent";

const { TabPane } = Tabs;



const TransactionForm = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [list,setTransaction] = useState()
  const [agents,setAgents] = useState([])
  

  useEffect(() => {
    const getAgents = async () => {
        const data = await agentService.getAgents()
        if (data) {
            setAgents(data)
            console.log(data, 'show-data')
        }
    }
    
    getAgents()  
    console.log('hi')

      const fetchTransactions = async () => {
        const data = await transactionService.getTransaction();
        if (data) {
          setTransaction(data);
        }
      };
    
      fetchTransactions()
    
   
  }, [form, history]);

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues =
         
             {
                amount:values.amount,
                senderId: values.senderId,
                type: values.type,
             }   
            
        console.log(sendingValues, "values=====");

          const created = await transactionService.createTransaction(
            sendingValues
          );
          if (created) {
            message.success(`Created New transaction`);
            history.goBack();
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
                Add New Transaction
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push("/app/dashboards/transaction/list")
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
                  Add
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField agents={agents}
                
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default TransactionForm;
