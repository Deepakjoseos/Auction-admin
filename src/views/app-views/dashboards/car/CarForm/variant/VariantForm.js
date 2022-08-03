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
import ImageDescription from '../ImageField/ImageDescription'
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
        required: true,
        message: 'Required',
      },
    ],
    price: [
      {
        required: true,
        message: 'Required',
      },
    ],
    quantity: [
      {
        required: true,
        message: 'Required',
      },
    ],
  }

  useEffect(() => {
    if (selectedVariant) {
      console.log(selectedVariant.description, 'desc')
      form.setFieldsValue({
        //   description: selectedVariant.description,
        name: selectedVariant.name,
        price: selectedVariant.price,
        quantity: selectedVariant.quantity,
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

      const images = selectedVariant.images.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur,
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

  //   const onFinish = async () => {
  //     setSubmitLoading(true)
  //     form
  //       .validateFields()
  //       .then(async (values) => {
  //         console.log(values, 'values')

  //         if (selectedVariant === null) {
  //           // Checking if image exists
  //           if (images.length !== 0 && images !== null) {
  //             const imgValues = await multipleImageUpload(
  //               images,
  //               'productTemplate-variant'
  //             )

  //             values.images = imgValues

  //             const created =
  //               await productTemplateService.createProductTemplateVariant(
  //                 id,
  //                 values
  //               )
  //             if (created) {
  //               message.success(`Created Variant Success`)
  //               setOpenVariantsForm(false)
  //               setSelectedVariant(null)
  //               refreshData()
  //               onFormModalClose()
  //             }
  //           } else {
  //             message.error('Please upload image')
  //           }
  //         }
  //         if (selectedVariant) {
  //           // Checking if image exists
  //           if (images.length !== 0 && images !== null) {
  //             console.log('images', images)
  //             const imgValues = await multipleImageUpload(
  //               images,
  //               'productTemplate'
  //             )
  //             values.images = imgValues

  //             const edited =
  //               await productTemplateService.editProductTemplateVariant(
  //                 id,
  //                 selectedVariant.id,
  //                 values
  //               )
  //             if (edited) {
  //               message.success(`Edited Variant Success`)
  //               setOpenVariantsForm(false)
  //               setSelectedVariant(null)
  //               refreshData()
  //               onFormModalClose()
  //             }
  //           } else {
  //             message.error('Please upload image')
  //           }
  //         }
  //         setSubmitLoading(false)
  //       })
  //       .catch((info) => {
  //         setSubmitLoading(false)
  //         console.log('info', info)
  //         message.error('Please enter all required field ')
  //       })
  //   }

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
            // onClick={onFinish}
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
            <Card title="Engine and Transmission">
              <Form.Item name="Engine Type" label="Engine Type">
                <Input placeholder="Engine Type" />
              </Form.Item>
              <Form.Item name="Displacement(cc)" label="Displacement(cc)">
                <Input placeholder="Displacement(cc)" />
              </Form.Item>
              <Form.Item name="Max Power" label="Max Power">
                <Input placeholder="Max Power" />
              </Form.Item>
              <Form.Item name="Max Torque" label="Max Torque">
                <Input placeholder="Max Torque" />
              </Form.Item>
              <Form.Item
                name="No. of
        cylinder"
                label="No. of
        cylinder"
              >
                <Input
                  placeholder="No. of
        cylinder"
                />
              </Form.Item>
              <Form.Item name="Gear Box" label="Gear Box">
                <Input placeholder="Gear Box" />
              </Form.Item>
            </Card>

            <Card title="Fuel & Performance">
              <Form.Item name="Fuel Type" label="Fuel Type">
                <Select placeholder="Fuel Type">
                  <Option value="Petrol">Petrol</Option>
                  <Option value="Diesel">Diesel</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Petrol Mileage (ARAI)"
                label="Petrol Mileage (ARAI)"
              >
                <Input placeholder="Petrol Mileage (ARAI)" />
              </Form.Item>
              <Form.Item
                name="Petrol Fuel Tank Capacity (Litres)"
                label="Petrol Fuel Tank Capacity (Litres)"
              >
                <Input placeholder="Petrol Fuel Tank Capacity (Litres)" />
              </Form.Item>
              <Form.Item
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
              </Form.Item>
            </Card>

            <Card title="Suspension, Steering & Brakes">
              {/* <Form.Item name="Front Suspension" label="Front Suspension">
                <Select placeholder="Front Suspension">
                  <Option value="Petrol">Petrol</Option>
                  <Option value="Diesel">Diesel</Option>
                </Select>
              </Form.Item> */}
              <Form.Item name="Front Suspension" label="Front Suspension">
                <Input placeholder="Front Suspension" />
              </Form.Item>
              <Form.Item name="Rear Suspension" label="Rear Suspension">
                <Input placeholder="Rear Suspension" />
              </Form.Item>
              <Form.Item name="Steering Type" label="Steering Type">
                <Input placeholder="Steering Type" />
              </Form.Item>
              <Form.Item name="Front Brake Type" label="Front Brake Type">
                <Input placeholder="Front Brake Type" />
              </Form.Item>
              <Form.Item name="Rear Brake Type" label="Rear Brake Type">
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
              <Form.Item name="Length (mm)" label="Length (mm)">
                <Input placeholder="Length (mm)" />
              </Form.Item>
              <Form.Item name="Width (mm)" label="Width (mm)">
                <Input placeholder="Width (mm)" />
              </Form.Item>
              <Form.Item name="Height (mm)" label="Height (mm)">
                <Input placeholder="Height (mm)" />
              </Form.Item>
              <Form.Item name="Boot Space (Litres)" label="Boot Space (Litres)">
                <Input placeholder="Boot Space (Litres)" />
              </Form.Item>
              <Form.Item name="Seating Capacity" label="Seating Capacity">
                <Input placeholder="Seating Capacity" />
              </Form.Item>
              <Form.Item
                name="Ground Clearance Unladen (mm)"
                label="Ground Clearance Unladen (mm)"
              >
                <Input placeholder="Ground Clearance Unladen (mm)" />
              </Form.Item>
              <Form.Item name="No of Doors" label="No of Doors">
                <Input placeholder="No of Doors" />
              </Form.Item>
            </Card>

            <Card
              title="Comfort & Convenience
"
            >
              <Form.Item name="Power Steering" label="Power Steering">
                <Select placeholder="Power Steering">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Power Windows-Front" label="Power Windows-Front">
                <Select placeholder="Power Windows-Front">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Power Windows-Rear" label="Power Windows-Rear">
                <Select placeholder="Power Windows-Rear">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Air Conditioner" label="Air Conditioner">
                <Select placeholder="Air Conditioner">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Heater" label="Heater">
                <Select placeholder="Heater">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Low Fuel Warning Light"
                label="Low Fuel Warning Light"
              >
                <Select placeholder="Low Fuel Warning Light">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Accessory Power Outlet"
                label="Accessory Power Outlet"
              >
                <Select placeholder="Accessory Power Outlet">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Rear Seat Headrest" label="Rear Seat Headrest">
                <Select placeholder="Rear Seat Headrest">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Seat Lumbar Support" label="Seat Lumbar Support">
                <Select placeholder="Seat Lumbar Support">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Parking Sensors" label="Parking Sensors">
                <Input placeholder="Parking Sensors" />
              </Form.Item>
              <Form.Item name="Foldable Rear Seat" label="Foldable Rear Seat">
                <Input placeholder="Foldable Rear Seat" />
              </Form.Item>
              <Form.Item name="KeyLess Entry" label="KeyLess Entry">
                <Select placeholder="KeyLess Entry">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="Voice Control" label="Voice Control">
                <Select placeholder="Voice Control">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Lane Change Indicator"
                label="Lane Change Indicator"
              >
                <Select placeholder="Lane Change Indicator">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Voice Control" label="Voice Control">
                <Select placeholder="Voice Control">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="Additional Features" label="Additional Features">
                <Input placeholder="Additional Features" />
              </Form.Item>
            </Card>

            <Card
              title="Interior
"
            >
              <Form.Item name="Tachometer" label="Tachometer">
                <Select placeholder="Tachometer">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Power Adjustable Exterior Rear View Mirror"
                label="Power Adjustable Exterior Rear View Mirror"
              >
                <Select placeholder="Power Adjustable Exterior Rear View Mirror">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Manually Adjustable Ext. Rear View Mirror"
                label="Manually Adjustable Ext. Rear View Mirror"
              >
                <Select placeholder="Manually Adjustable Ext. Rear View Mirror">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Wheel Covers" label="Wheel Covers">
                <Select placeholder="Wheel Covers">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Power Antenna" label="Power Antenna">
                <Select placeholder="Power Antenna">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Rear Spoiler" label="Rear Spoiler">
                <Select placeholder="Rear Spoiler">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Chrome Grille" label="Chrome Grille">
                <Select placeholder="Chrome Grille">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Halogen Headlamps" label="Halogen Headlamps">
                <Select placeholder="Halogen Headlamps">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Roof Rail" label="Roof Rail">
                <Select placeholder="Roof Rail">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Tyre Size" label="Tyre Size">
                <Input placeholder="Tyre Size" />
              </Form.Item>
              <Form.Item name="Tyre Type" label="Tyre Type">
                <Input placeholder="Tyre Type" />
              </Form.Item>

              <Form.Item name="LED DRLs" label="LED DRLs">
                <Select placeholder="LED DRLs">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="LED Taillights" label="LED Taillights">
                <Select placeholder="LED Taillights">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="Additional Features" label="Additional Features">
                <Input placeholder="Additional Features" />
              </Form.Item>
            </Card>

            <Card title="Exterior">
              <Form.Item
                name="Adjustable Headlights"
                label="Adjustable Headlights"
              >
                <Select placeholder="Adjustable Headlights">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Electronic Multi-Tripmeter"
                label="Electronic Multi-Tripmeter"
              >
                <Select placeholder="Electronic Multi-Tripmeter">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Fabric Upholstery" label="Fabric Upholstery">
                <Select placeholder="Fabric Upholstery">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Leather Steering Wheel"
                label="Leather Steering Wheel"
              >
                <Select placeholder="Leather Steering Wheel">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Glove Compartment" label="Glove Compartment">
                <Select placeholder="Glove Compartment">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Digital Clock" label="Digital Clock">
                <Select placeholder="Digital Clock">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Digital Odometer" label="Digital Odometer">
                <Select placeholder="Digital Odometer">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="Additional Features" label="Additional Features">
                <Input placeholder="Additional Features" />
              </Form.Item>
            </Card>

            <Card title="Safety">
              <Form.Item
                name="Anti-Lock Braking System"
                label="Anti-Lock Braking System"
              >
                <Select placeholder="Anti-Lock Braking System">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Central Locking" label="Central Locking">
                <Select placeholder="Central Locking">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Power Door Locks" label="Power Door Locks">
                <Select placeholder="Power Door Locks">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Child Safety Locks" label="Child Safety Locks">
                <Select placeholder="Child Safety Locks">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="No of Airbags" label="No of Airbags">
                <Input placeholder="No of Airbags" />
              </Form.Item>

              <Form.Item name="Driver Airbag" label="Driver Airbag">
                <Select placeholder="Driver Airbag">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Passenger Airbag" label="Passenger Airbag">
                <Select placeholder="Passenger Airbag">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Day & Night Rear View Mirror"
                label="Day & Night Rear View Mirror"
              >
                <Select placeholder="Day & Night Rear View Mirror">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Passenger Side Rear View Mirror"
                label="Passenger Side Rear View Mirror"
              >
                <Select placeholder="Passenger Side Rear View Mirror">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Rear Seat Belts" label="Rear Seat Belts">
                <Select placeholder="Rear Seat Belts">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Seat Belt Warning" label="Seat Belt Warning">
                <Select placeholder="Seat Belt Warning">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Adjustable Seats" label="Adjustable Seats">
                <Select placeholder="Adjustable Seats">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Engine Immobilizer" label="Engine Immobilizer">
                <Select placeholder="Engine Immobilizer">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Crash Sensor" label="Crash Sensor">
                <Select placeholder="Crash Sensor">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Centrally Mounted Fuel Tank"
                label="Centrally Mounted Fuel Tank"
              >
                <Select placeholder="Centrally Mounted Fuel Tank">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Engine Check Warning"
                label="Engine Check Warning"
              >
                <Select placeholder="Engine Check Warning">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="EBD" label="EBD">
                <Select placeholder="EBD">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Advance Safety Features"
                label="Advance Safety Features"
              >
                <Input placeholder="Advance Safety Features" />
              </Form.Item>
              <Form.Item name="Rear Camera" label="Rear Camera">
                <Select placeholder="Rear Camera">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Speed Alert" label="Speed Alert">
                <Select placeholder="Speed Alert">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Speed Sensing Auto Door Lock"
                label="Speed Sensing Auto Door Lock"
              >
                <Select placeholder="Speed Sensing Auto Door Lock">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Pretensioners & Force Limiter Seatbelts"
                label="Pretensioners & Force Limiter Seatbelts"
              >
                <Select placeholder="Pretensioners & Force Limiter Seatbelts">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Card>

            <Card title="Entertainment & Communication">
              <Form.Item name="Speakers Front" label="Speakers Front">
                <Select placeholder="Speakers Front">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Speakers Rear" label="Speakers Rear">
                <Select placeholder="Speakers Rear">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Integrated 2DIN Audio"
                label="Integrated 2DIN Audio"
              >
                <Select placeholder="Integrated 2DIN Audio">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Touch Screen" label="Touch Screen">
                <Select placeholder="Touch Screen">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="Android Auto" label="Android Auto">
                <Select placeholder="Android Auto">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              <Form.Item name="Apple CarPlay" label="Apple CarPlay">
                <Select placeholder="Apple CarPlay">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
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
            {fileListImages?.map((cur) => (
              <>
                {cur?.url ? (
                  <>
                    <ImageDescription url={cur?.url} file={null} />
                  </>
                ) : (
                  <>
                    <ImageDescription url={null} file={cur?.originFileObj} />
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
