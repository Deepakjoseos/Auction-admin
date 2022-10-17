import React, { useState, useEffect } from 'react';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex';
import GeneralField from './GeneralField';
import useUpload from 'hooks/useUpload';
import { singleImageUploader } from 'utils/s3/s3ImageUploader';
import informationService from 'services/information';
import Utils from 'utils';
import { useHistory } from 'react-router-dom';
// import groupService from "services/group";
import auctionService from 'services/auction';
import auctionInventoryService from 'services/auctionInventory';
import cityService from 'services/city';
import brandService from 'services/brand';
import brandVariantService from 'services/brandVariant.service';
import fuelTypeService from 'services/fuelType';
import UploadImage from './upload-images';

const { TabPane } = Tabs;

const ADD = 'ADD';
const EDIT = 'EDIT';

const AuctionInventoryForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [auctions, setAuctions] = useState();
  const [auctionId, setAuctionId] = useState();
  const [sheet, setSheet] = useState();

  const [cities, setCities] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandVariants, setBrandVariants] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  const getCities = async () => {
    const data = await cityService.getCities();
    if (data) {
      setCities(data);
    }
  };

  const getBrands = async () => {
    const data = await brandService.getBrands();
    if (data) {
      setBrands(data);
    }
  };

  const getBrandVariants = async () => {
    const data = await brandVariantService.getAll();
    if (data) {
      setBrandVariants(data);
    }
  };

  const getFuelTypes = async () => {
    const data = await fuelTypeService.getFuelTypes();
    if (data) {
      setFuelTypes(data);
    }
  };

  useEffect(() => {
    getCities();
    getBrands();
    getBrandVariants();
    getFuelTypes();
  }, []);

  useEffect(() => {
    if (mode === ADD) fetchAuctions();

    if (mode === EDIT) fetchInventory();
  }, [form, mode, param, props]);

  const fetchAuctions = async () => {
    const data = await auctionService.getauctions();
    if (data) {
      setAuctions(data);
      // console.log(`Auctions`, data);
    }
  };

  const fetchInventory = async () => {
    const { id } = param;
    const data = await auctionInventoryService.getInventory(id);
    if (data) {
      form.setFieldsValue({
        ...data,
        hypothecation: data.hypothecation.toLowerCase() === 'true',
        // ...data.registrationInfo,
        // registrationDate: data.registrationInfo.registrationDate,
        rcAvailable: data.registrationInfo.rcAvailable,
        registrationYear: data.registrationInfo.year,
        ...data.vehicleInfo,
        ...data.insuranceInfo,
        insuranceType: data.insuranceInfo?.type,
        // insuranceExpiryDate: data.insuranceInfo?.expiryDate,
        insuranceInfo_Availability: data.insuranceInfo?.availability,
        ...data.taxInfo,
        taxType: data.taxInfo?.type,
        ...data.rtoInfo
      });
    } else {
      history.replace(
        '/app/dashboards/auction/auction-inventory/auction-inventory-list'
      );
    }
  };

  const onFinish = async () => {
    if (mode === ADD) {
      if (sheet) {
        const formData = new FormData();
        formData.append('file', sheet.originFileObj);
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
            console.log('info', info);
            message.error('Please enter all required field.');
          });
      } else message.error('Please upload file.');
    }

    if (mode === EDIT) {
      setSubmitLoading(true);
      form
        .validateFields()
        .then(async (values) => {
          const newAuctionInventoryObj = {
            registrationNumber: values.registrationNumber,
            reservedPrice: values.reservedPrice,
            registrationInfo: {
              rcAvailable: values.rcAvailable,
              registrationDate: values.registrationDate,
              registrationType: values.registrationType,
              year: values.registrationYear
            },
            vehicleInfo: {
              make: values.make,
              model: values.model,
              version: values.version.toString(),
              chasisNumber: values.chasisNumber,
              engineNumber: values.engineNumber,
              color: values.color,
              kmReading: values.kmReading,
              keyStatus: values.keyStatus,
              fuelType: values.fuelType,
              shape: values.shape,
              gearBox: values.gearBox,
              doorCount: values.doorCount,
              condition: values.condition,
              mfgYear: values.mfgYear,
              mfgMonth: values.mfgMonth
            },
            insuranceInfo: {
              availability: true,
              type: values.insuranceType,
              expiryDate: values.insuranceExpiryDate,
              noClaimBonus: values.noClaimBonus,
              noClaimBonusPercentage: values.noClaimBonusPercentage
            },
            images: {
              general: ['string'],
              interior: ['string'],
              exterior: ['string']
            },
            taxInfo: {
              paid: values.paid,
              rtoTaxDate: values.rtoTaxDate,
              type: values.taxType,
              validity: values.validity
            },
            rtoInfo: {
              currentRTOlocation: values.currentRTOlocation,
              lastRTODate: values.lastRTODate,
              lastRTOLocation: values.lastRTOLocation
            },
            hypothecation: values.hypothecation,
            repoDate: values.repoDate,
            endorsementRCBook: values.endorsementRCBook,
            octori: 'string',
            area: values.area,
            yardLocation: values.yardLocation,
            parkingLocation: values.parkingLocation,
            status: values.status
          };
          const edited = await auctionInventoryService.updateAuctionInventory(
            param.id,
            newAuctionInventoryObj
          );
          if (edited) {
            message.success(`Edited ${values.name} to Auction list`);
            history.goBack();
          }
          setSubmitLoading(false);
        })
        .catch((info) => {
          setSubmitLoading(false);
          console.log('info', info);
          message.error('Please enter all required field ');
        });
    }
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
                {mode === 'ADD'
                  ? 'Add New Auction Inventory'
                  : `Edit Auction Inventory`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/auction/auction-inventory/auction-inventory-list'
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
                  {mode === 'ADD' ? 'Add' : `Save`}
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
                cities={cities}
                brands={brands}
                brandVariants={brandVariants}
                fuelTypes={fuelTypes}
              />
            </TabPane>
            {mode === EDIT && (
              <TabPane tab="Upload Images" key="2">
                <UploadImage inventoryId={param.id} />
              </TabPane>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default AuctionInventoryForm;
