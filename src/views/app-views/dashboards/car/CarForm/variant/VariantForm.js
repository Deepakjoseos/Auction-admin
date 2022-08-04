import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tabs,
  Upload,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
// import productTemplateService from 'services/productTemplate'
import { useHistory, useParams } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import ImageDescription from '../../../../../../components/shared-components/ImageDescription'
import carService from 'services/car'
//   import attributeService from 'services/attribute'

const VariantsForm = ({
  form,
  openVariantsForm,
  setOpenVariantsForm,
  selectedVariant,
  setSelectedVariant,
  refreshData,
}) => {
  const { Option } = Select
  const history = useHistory()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [images, setImages] = useState([])
  const [attributes, setAttributes] = useState([])
  const [selectedAttributeValues, setSelectedAttributeValues] = useState([])

  const { id } = useParams()

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

  const rules = {
    name: [
      {
        required: 'yes',
        message: 'Required',
      },
    ],
    price: [
      {
        required: 'yes',
        message: 'Required',
      },
    ],
    quantity: [
      {
        required: 'yes',
        message: 'Required',
      },
    ],
  }

  useEffect(() => {
    if (selectedVariant) {
      console.log(selectedVariant.description, 'desc')
      form.setFieldsValue({
        ...selectedVariant,
        //   description: selectedVariant.description,
        // name: selectedVariant.name,
        // price: selectedVariant.price,
        // quantity: selectedVariant.quantity,
        //   attributes: selectedVariant.attributes.map((attr) => {
        //     return { attributeId: attr.id, valueId: attr.value.id }
        //   }),
      })

      //   onAttributeChange()

      //   attributes.map((cur) => {
      //     setTimeout(() => {
      //       // alert('heyyy')\
      //       console.log('doneeeee')
      //       onSelectAttribute(cur.id)
      //     }, 1000)
      //   })

      // onSelectAttribute()

      const images = selectedVariant?.images?.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur?.image,
          description: cur?.description,
        }
      })

      setImages(images)

      setFileListImages(images)
    }
  }, [selectedVariant])

  useEffect(() => {
    console.log(form.getFieldValue('attributes'), 'plss')
  }, [form])

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    console.log(fileListImages, 'hey-me')
    setImages(fileListImages)
  }, [fileListImages])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values')

        if (selectedVariant === null) {
          // Checking if image exists
          if (images.length !== 0 && images !== null) {
            const imgValues = await multipleImageUpload(
              images,
              'car-variant',
              'descriptionRequired'
            )

            values.images = imgValues

            const created = await carService.createCarVariant(id, values)
            if (created) {
              message.success(`Created Variant Success`)
              setOpenVariantsForm(false)
              setSelectedVariant(null)
              refreshData()
              onFormModalClose()
            }
          } else {
            message.error('Please upload image')
          }
        }
        if (selectedVariant) {
          // Checking if image exists
          if (images.length !== 0 && images !== null) {
            console.log('images', images)
            const imgValues = await multipleImageUpload(
              images,
              'car-variant',
              'descriptionRequired'
            )
            values.images = imgValues

            const edited = await carService.updateCarVariant(
              id,
              selectedVariant.id,
              values
            )
            if (edited) {
              message.success(`Edited Variant Success`)
              setOpenVariantsForm(false)
              setSelectedVariant(null)
              refreshData()
              onFormModalClose()
            }
          } else {
            message.error('Please upload image')
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field')
      })
  }

  // useEffect(() => {
  //   onAttributeChange()
  // }, [selectedVariant])

  //   const getAttributes = async () => {
  //     const data = await attributeService.getAttributes()
  //     const activeAttributes = data.filter((item) => item.status === 'Active')
  //     setAttributes(activeAttributes)
  //     return activeAttributes
  //   }

  //   const onSelectAttribute = (attributeId) => {
  //     const attribute = attributes.find((item) => item.id === attributeId)

  //     console.log(attribute, 'attributeId')

  //     // const formattedAttributeValues = attribute.values.map((item) => {
  //     //   return {
  //     //     id: item.id,
  //     //     valueId: item.value.id,
  //     //   }
  //     // })

  //     setSelectedAttributeValues(attribute.values)
  //   }
  //   useEffect(() => {
  //     getAttributes()
  //   }, [selectedVariant])

  // Cut off already selected values from the list of attributes
  //   const onAttributeChange = async () => {
  //     const attributes = await getAttributes()

  //     const restAttributesListItems = attributes.filter(
  //       ({ id: id1 }) =>
  //         !form
  //           .getFieldValue('attributes')
  //           ?.some(({ attributeId: id2 }) => id2 === id1)
  //     )

  //     setAttributes(restAttributesListItems)
  //   }

  const onFormModalClose = () => {
    setOpenVariantsForm(false)
    // window.location.reload()
    setImages([])
    setAttributes([])
    setSelectedAttributeValues([])
    form.resetFields()
    setFileListImages([])
    setSelectedVariant(null)
  }

  return (
    <Drawer
      title={selectedVariant ? 'Edit Variant' : 'Create Variant'}
      width={'100%'}
      onClose={() => onFormModalClose()}
      visible={openVariantsForm}
      bodyStyle={{ paddingBottom: 80 }}
      // destroyOnClose

      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => onFormModalClose()}
            style={{ marginRight: 8 }}
            htmlType="button"
          >
            Cancel
          </Button>
          <Button
            htmlType="button"
            onClick={onFinish}
            type="primary"
            loading={submitLoading}
          >
            Submit
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        hideRequiredMark
      >
        <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
          <Tabs.TabPane tab="General" key="1">
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Card title="Engine and Transmission">
              <Form.Item name="color" label="Color">
                <Input placeholder="Color" />
              </Form.Item>
              <Form.Item name="engineType" label="Engine Type">
                <Input placeholder="Engine Type" />
              </Form.Item>
              <Form.Item name="displacement" label="Displacement(cc)">
                <Input placeholder="Displacement(cc)" />
              </Form.Item>
              <Form.Item name="maxPower" label="Max Power">
                <Input placeholder="Max Power" />
              </Form.Item>
              <Form.Item name="maxTorque" label="Max Torque">
                <Input placeholder="Max Torque" />
              </Form.Item>
              <Form.Item name="cylinderCount" label="No. of cylinder">
                <Input placeholder="No. of cylinder" />
              </Form.Item>
              <Form.Item
                name="cylinderValvesCount"
                label="Cylinder Valves Count"
              >
                <Input placeholder="cylinderValvesCount" />
              </Form.Item>
              <Form.Item name="transmissionType" label="Transmission Type">
                <Input placeholder="transmissionType" />
              </Form.Item>
              <Form.Item name="gearBox" label="Gear Box">
                <Input placeholder="Gear Box" />
              </Form.Item>
            </Card>

            <Card title="Fuel & Performance">
              <Form.Item name="fueltype" label="Fuel Type">
                <Select placeholder="Fuel Type">
                  <Option value="Petrol">Petrol</Option>
                  <Option value="Diesel">Diesel</Option>
                </Select>
              </Form.Item>
              <Form.Item name="petrolMileage" label="Petrol Mileage (ARAI)">
                <Input placeholder="Petrol Mileage (ARAI)" />
              </Form.Item>
              <Form.Item
                name="petrolFuelTankCapacity"
                label="Petrol Fuel Tank Capacity (Litres)"
              >
                <Input placeholder="Petrol Fuel Tank Capacity (Litres)" />
              </Form.Item>
              {/* <Form.Item
                name="Petrol Highway Mileage"
                label="Petrol Highway Mileage"
              >
                <Input placeholder="Petrol Highway Mileage" />
              </Form.Item>
              <Form.Item
                name="Emission Norm Compliance"
                label="Emission Norm Compliance"
              >
                <Input placeholder="Emission Norm Compliance" />
              </Form.Item> */}
            </Card>

            <Card title="Suspension, Steering & Brakes">
              {/* <Form.Item name="Front Suspension" label="Front Suspension">
                <Select placeholder="Front Suspension">
                  <Option value="Petrol">Petrol</Option>
                  <Option value="Diesel">Diesel</Option>
                </Select>
              </Form.Item> */}
              <Form.Item name="frontSuspension" label="Front Suspension">
                <Input placeholder="Front Suspension" />
              </Form.Item>
              <Form.Item name="rearSuspension" label="Rear Suspension">
                <Input placeholder="Rear Suspension" />
              </Form.Item>
              <Form.Item name="steeringType" label="Steering Type">
                <Input placeholder="Steering Type" />
              </Form.Item>
              <Form.Item name="frontBrakeType" label="Front Brake Type">
                <Input placeholder="Front Brake Type" />
              </Form.Item>
              <Form.Item name="rearBrakeType" label="Rear Brake Type">
                <Input placeholder="Rear Brake Type" />
              </Form.Item>
            </Card>

            <Card
              title="Dimensions & Capacity
"
            >
              {/* <Form.Item name="Front Suspension" label="Front Suspension">
                <Select placeholder="Front Suspension">
                  <Option value="Petrol">Petrol</Option>
                  <Option value="Diesel">Diesel</Option>
                </Select>
              </Form.Item> */}
              <Form.Item name="length" label="Length (mm)">
                <Input placeholder="Length (mm)" />
              </Form.Item>
              <Form.Item name="width" label="Width (mm)">
                <Input placeholder="Width (mm)" />
              </Form.Item>
              <Form.Item name="height" label="Height (mm)">
                <Input placeholder="Height (mm)" />
              </Form.Item>
              <Form.Item name="bootSpace" label="Boot Space (Litres)">
                <Input placeholder="Boot Space (Litres)" />
              </Form.Item>
              <Form.Item name="seatingCapacity" label="Seating Capacity">
                <Input placeholder="Seating Capacity" />
              </Form.Item>
              <Form.Item
                name="groundClearanceUnladen"
                label="Ground Clearance Unladen (mm)"
              >
                <Input placeholder="Ground Clearance Unladen (mm)" />
              </Form.Item>
              <Form.Item name="noOfDoors" label="No of Doors">
                <Input placeholder="No of Doors" />
              </Form.Item>
            </Card>

            <Card
              title="Comfort & Convenience
"
            >
              <Form.Item name="powerSteering" label="Power Steering">
                <Select placeholder="Power Steering">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="powerWindowsFront" label="Power Windows-Front">
                <Select placeholder="Power Windows-Front">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="powerWindowsRear" label="Power Windows-Rear">
                <Select placeholder="Power Windows-Rear">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="airConditioner" label="Air Conditioner">
                <Select placeholder="Air Conditioner">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="heater" label="Heater">
                <Select placeholder="Heater">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="lowFuelWarningLight"
                label="Low Fuel Warning Light"
              >
                <Select placeholder="Low Fuel Warning Light">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="accessoryPowerOutlet"
                label="Accessory Power Outlet"
              >
                <Select placeholder="Accessory Power Outlet">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="rearSeatHeadrest" label="Rear Seat Headrest">
                <Select placeholder="Rear Seat Headrest">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="seatLumbarSupport" label="Seat Lumbar Support">
                <Select placeholder="Seat Lumbar Support">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="parkingSensors" label="Parking Sensors">
                <Input placeholder="Parking Sensors" />
              </Form.Item>
              <Form.Item name="foldableRearSeat" label="Foldable Rear Seat">
                <Input placeholder="Foldable Rear Seat" />
              </Form.Item>
              <Form.Item name="keyLessEntry" label="KeyLess Entry">
                <Select placeholder="KeyLess Entry">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="voiceControl" label="Voice Control">
                <Select placeholder="Voice Control">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="usbCharger" label="USB Charger">
                <Select placeholder="USB Charger">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="laneChangeIndicator"
                label="Lane Change Indicator"
              >
                <Select placeholder="Lane Change Indicator">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="additionalFeatures" label="Additional Features">
                <Input placeholder="Additional Features" />
              </Form.Item>
            </Card>

            <Card
              title="Interior
"
            >
              <Form.Item name="tachometer" label="Tachometer">
                <Select placeholder="Tachometer">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="powerAdjustableExteriorRearViewMirror"
                label="Power Adjustable Exterior Rear View Mirror"
              >
                <Select placeholder="Power Adjustable Exterior Rear View Mirror">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="manuallyAdjustableExtRearViewMirror"
                label="Manually Adjustable Ext. Rear View Mirror"
              >
                <Select placeholder="Manually Adjustable Ext. Rear View Mirror">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="wheelCovers" label="Wheel Covers">
                <Select placeholder="Wheel Covers">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="powerAntenna" label="Power Antenna">
                <Select placeholder="Power Antenna">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="rearSpoiler" label="Rear Spoiler">
                <Select placeholder="Rear Spoiler">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="chromeGrille" label="Chrome Grille">
                <Select placeholder="Chrome Grille">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="halogenHeadlamps" label="Halogen Headlamps">
                <Select placeholder="Halogen Headlamps">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="roofRail" label="Roof Rail">
                <Select placeholder="Roof Rail">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="tyreSize" label="Tyre Size">
                <Input placeholder="Tyre Size" />
              </Form.Item>
              <Form.Item name="tyreType" label="Tyre Type">
                <Input placeholder="Tyre Type" />
              </Form.Item>

              <Form.Item name="ledDrls" label="LED DRLs">
                <Select placeholder="LED DRLs">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="ledTaillights" label="LED Taillights">
                <Select placeholder="LED Taillights">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="additionalInteriorFeatures"
                label="Additional Features"
              >
                <Input placeholder="Additional Features" />
              </Form.Item>
            </Card>

            <Card title="Exterior">
              <Form.Item
                name="adjustableHeadlights"
                label="Adjustable Headlights"
              >
                <Select placeholder="Adjustable Headlights">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="electronicMultiTripmeter"
                label="Electronic Multi-Tripmeter"
              >
                <Select placeholder="Electronic Multi-Tripmeter">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="fabricUpholstery" label="Fabric Upholstery">
                <Select placeholder="Fabric Upholstery">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="leatherSteeringWheel"
                label="Leather Steering Wheel"
              >
                <Select placeholder="Leather Steering Wheel">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="gloveCompartment" label="Glove Compartment">
                <Select placeholder="Glove Compartment">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="digitalClock" label="Digital Clock">
                <Select placeholder="Digital Clock">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="digitalOdometer" label="Digital Odometer">
                <Select placeholder="Digital Odometer">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="additionalExteriorFeatures"
                label="Additional Features"
              >
                <Input placeholder="Additional Features" />
              </Form.Item>
            </Card>

            <Card title="Safety">
              <Form.Item
                name="antiLocBrakingSystem"
                label="Anti-Lock Braking System"
              >
                <Select placeholder="Anti-Lock Braking System">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="centralLocking" label="Central Locking">
                <Select placeholder="Central Locking">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="powerDoorLocks" label="Power Door Locks">
                <Select placeholder="Power Door Locks">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="childSafetyLocks" label="Child Safety Locks">
                <Select placeholder="Child Safety Locks">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="noOfAirbags" label="No of Airbags">
                <Input placeholder="No of Airbags" />
              </Form.Item>

              <Form.Item name="driverAirbag" label="Driver Airbag">
                <Select placeholder="Driver Airbag">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="passengerAirbag" label="Passenger Airbag">
                <Select placeholder="Passenger Airbag">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="dayAndNightRearViewMirror"
                label="Day & Night Rear View Mirror"
              >
                <Select placeholder="Day & Night Rear View Mirror">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="passengerSideRearViewMirror"
                label="Passenger Side Rear View Mirror"
              >
                <Select placeholder="Passenger Side Rear View Mirror">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="rearSeatBelts" label="Rear Seat Belts">
                <Select placeholder="Rear Seat Belts">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="seatBeltWarning" label="Seat Belt Warning">
                <Select placeholder="Seat Belt Warning">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="adjustableSeats" label="Adjustable Seats">
                <Select placeholder="Adjustable Seats">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="engineImmobilizer" label="Engine Immobilizer">
                <Select placeholder="Engine Immobilizer">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="crashSensor" label="Crash Sensor">
                <Select placeholder="Crash Sensor">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="centrallyMountedFuelTank"
                label="Centrally Mounted Fuel Tank"
              >
                <Select placeholder="Centrally Mounted Fuel Tank">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="engineCheckWarning" label="Engine Check Warning">
                <Select placeholder="Engine Check Warning">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="ebd" label="EBD">
                <Select placeholder="EBD">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="advanceSafetyFeatures"
                label="Advance Safety Features"
              >
                <Input placeholder="Advance Safety Features" />
              </Form.Item>
              <Form.Item name="rearCamera" label="Rear Camera">
                <Select placeholder="Rear Camera">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="speedAlert" label="Speed Alert">
                <Select placeholder="Speed Alert">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="speedSensingAutoDoorLock"
                label="Speed Sensing Auto Door Lock"
              >
                <Select placeholder="Speed Sensing Auto Door Lock">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="pretensionersAndForceLimiterSeatbelts"
                label="Pretensioners & Force Limiter Seatbelts"
              >
                <Select placeholder="Pretensioners & Force Limiter Seatbelts">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
            </Card>

            <Card title="Entertainment & Communication">
              <Form.Item name="speakersFront" label="Speakers Front">
                <Select placeholder="Speakers Front">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="speakersRear" label="Speakers Rear">
                <Select placeholder="Speakers Rear">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="integrated2dinAudio"
                label="Integrated 2DIN Audio"
              >
                <Select placeholder="Integrated 2DIN Audio">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="touchScreen" label="Touch Screen">
                <Select placeholder="Touch Screen">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="androidAuto" label="Android Auto">
                <Select placeholder="Android Auto">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="appleCarPlay" label="Apple CarPlay">
                <Select placeholder="Apple CarPlay">
                  <Option value={'yes'}>Yes</Option>
                  <Option value={'no'}>No</Option>
                </Select>
              </Form.Item>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Images" key="2">
            <Card title="Media">
              <Upload listType="picture-card" name="image" {...propsImages}>
                <CustomIcon className="display-3" svg={ImageSvg} />
              </Upload>
            </Card>
            <h4>Add Image Description</h4>
            {images?.map((cur) => (
              <>
                {cur?.url ? (
                  <>
                    <ImageDescription
                      url={cur?.url}
                      description={cur?.description}
                      file={null}
                      setImages={setImages}
                      images={images}
                      id={cur?.uid}
                    />
                  </>
                ) : (
                  <>
                    <ImageDescription
                      url={null}
                      description={cur?.description}
                      file={cur?.originFileObj}
                      setImages={setImages}
                      images={images}
                      id={cur?.uid}
                    />
                  </>
                )}
              </>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </Drawer>
  )
}

export default VariantsForm
