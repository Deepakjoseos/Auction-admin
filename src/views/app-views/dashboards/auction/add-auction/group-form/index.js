import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import useUpload from "hooks/useUpload";
import { singleImageUploader } from "utils/s3/s3ImageUploader";
import informationService from "services/information";
import Utils from "utils";
import { useHistory } from "react-router-dom";
// import groupService from "services/group";
import auctionService from "services/auction";
const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const FeeTypeForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      const fetchfeeTypeById = async () => {
        const { id } = param;
        const data = await auctionService.getauctionById(id);
        if (data) {
          form.setFieldsValue({
            name: data.name,
            vehicleTypeId: data.vehicleType.name,
            cityId: data.city.name,
            regionId: data.region.name,
            status: data.status,
            business: data.business,

          });
        } else {
          history.replace("/app/dashboards/auction/auction-list");
        }
      };

      fetchfeeTypeById();
    }
  }, [form, mode, param, props]);

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, "values");
    values.bidLimit=Number(values.bidLimit)
 
    values.startTimestamp=`${(new Date(values.startTimestamp)).getTime()}`;
    values.endTimestamp=`${(new Date(values.endTimestamp)).getTime()}`;

        if (mode === ADD) {
          // Checking if image exists
          console.log(values, "asasasqwertyuijhgv");
          const created = await auctionService.createauction(values);
          if (created) {
            message.success(`Created ${values.name} to auction list`);
            history.goBack();
          }
        }
        if (mode === EDIT) {
          console.log(param.id);
          const edited = await auctionService.updateauction(param.id, values);
          if (edited) {
            message.success(`Edited ${values.name} to Auction list`);
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
          showRegNumber:false,
          showChasisNumber:false,
          showEngineNumber:false,
          showGST:false,
          extendAuctionForLessBid:false,
          showVehiclesWithoutLogin:false,
          auctionViewOnly:false,
          onlyPCCBuyersAllowed:false,
          showTNC:false,
          showVehicleDownload:false,
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
                {mode === "ADD" ? "Add New Auction" : `Edit Auction`}{" "}
              </h2>
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
                  // disabled={submitLoading}
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
                // uploadedImg={uploadedImg}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
                // propsImages={propsImages}
                form={form}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default FeeTypeForm;
