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
import auctionInventoryService from "services/auctionInventory";
const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const AuctionInventoryForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [auctions, setAuctions] = useState();
  const [auctionId, setAuctionId] = useState();
  const [sheet, setSheet] = useState();

  useEffect(() => {
    if (mode === ADD) fetchAuctions();

    if (mode === EDIT) fetchInventory();
  }, [form, mode, param, props]);

  const fetchAuctions = async () => {
    const data = await auctionService.getauctions();
    if (data) {
      setAuctions(data);
      console.log(`Auctions`, data);
    }
  };

  const fetchInventory = async () => {
    const { id } = param;
    const data = await auctionInventoryService.getInventory(id);
    console.log(data);
    if (data) {
      // form.setFieldsValue({
      //   name: data.name,
      //   businessType: data.businessType,
      //   type: data.type,
      //   cityId: data.cityId,
      //   regionId: data.regionId,
      //   clientId: data.clientId,
      //   vehicleTypeId: data.vehicleTypeId,
      //   format: data.format,
      //   status: data.status,
      //   closeType: data.closeType,
      //   bidLimit: data.bidLimit,
      //   termsAndConditions: data.termsAndConditions,
      //   // startTimestamp: data.startTimestamp,
      //   // endTimestamp: data.endTimestamp,
      //   showRegNumber: data.showRegNumber,
      //   showChasisNumber: data.showChasisNumber,
      //   showEngineNumber: data.showEngineNumber,
      //   showGST: data.showGST,
      //   extendAuctionForLessBid: data.extendAuctionForLessBid,
      //   showVehiclesWithoutLogin: data.showVehiclesWithoutLogin,
      //   auctionViewOnly: data.auctionViewOnly,
      //   onlyPCCBuyersAllowed: data.onlyPCCBuyersAllowed,
      //   showTNC: data.showTNC,
      //   showVehicleDownload: data.showVehicleDownload,
      // });
      form.setFieldsValue({
        ...data,
        startTimestamp: "",
        endTimestamp: "",
      });
    } else {
      history.replace("/app/dashboards/auction/auction-list");
    }
  };

  const onFinish = async () => {
    if (mode === ADD && sheet) {
      const formData = new FormData();
      formData.append("file", sheet.originFileObj);
      setSubmitLoading(true);

      form
        .validateFields()
        .then(async (values) => {
          const uploaded = await auctionInventoryService.uploadInventory(
            values.auctionId,
            formData
          );
          if (uploaded) {
            message.success(`Uploaded Auction Inventory.`);
            history.goBack();
            setSubmitLoading(false);
          }
        })
        .catch((info) => {
          setSubmitLoading(false);
          console.log("info", info);
          message.error("Please enter all required field.");
        });
    } else message.error("Please upload file.");
    // form
    //   .validateFields()
    //   .then(async (values) => {
    //     console.log(values, "values");
    //     values.bidLimit = Number(values.bidLimit);

    //     values.startTimestamp = `${new Date(values.startTimestamp).getTime()}`;
    //     values.endTimestamp = `${new Date(values.endTimestamp).getTime()}`;

    //     if (mode === ADD) {
    //       // Checking if image exists
    //       console.log(values, "asasasqwertyuijhgv");
    //       const created = await auctionService.createauction(values);
    //       if (created) {
    //         message.success(`Created ${values.name} to auction list`);
    //         history.goBack();
    //       }
    //     }
    //     if (mode === EDIT) {
    //       console.log(param.id);
    //       const edited = await auctionService.updateauction(param.id, values);
    //       if (edited) {
    //         message.success(`Edited ${values.name} to Auction list`);
    //         history.goBack();
    //       }
    //     }
    //     setSubmitLoading(false);
    //   })
    //   .catch((info) => {
    //     setSubmitLoading(false);
    //     console.log("info", info);
    //     message.error("Please enter all required field ");
    //   });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
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
                {mode === "ADD" ? "Add New Auction Inventory" : `Edit Auction`}{" "}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      "/app/dashboards/auction-inventory/auction-inventory-list"
                    )
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
                setSheet={setSheet}
                auctions={auctions}
                auctionId={auctionId}
                mode={mode}
                setAuctionId={setAuctionId}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default AuctionInventoryForm;
