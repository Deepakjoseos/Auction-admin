import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
import carService from 'services/car'
import { useHistory } from 'react-router-dom'
import Variant from './variant'
import ImageField from './ImageField'
import vehicletypeService from 'services/vehicleType'
import brandService from 'services/brand'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const InformationForm = (props) => {
  const { mode = ADD, param } = props
  const id = param?.id
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [editorRender, setEditorRender] = useState(false)
  const [variantList, setVariantsList] = useState([])
  const[vehicleTypes,setVehicleTypes] =useState([])
  const [brands,setBrands] =useState([])

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

  console.log(uploadedImg, 'uploadedImg')

  const fetchCarById = async () => {
    const data = await carService.getCarById(id)
    if (data) {
      const images = data.images.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur?.image,
          description: cur?.description,
        }
      })

      setImage(images)

      setFileListImages(images)

      form.setFieldsValue({
        name: data.name,
        status: data.status,
        description: data.description,
        videos: data.videos,
        brandId: data.brandId,
        vehicleTypeId: data.vehicleTypeId,
        priceRange: data.priceRange,
      })

      setEditorRender(true)
      setVariantsList(data.variants)
    } else {
      history.replace('/app/dashboards/car/car-list')
    }
  }
  const getVehicleTypes = async ()=>{
    const data = await vehicletypeService.getVehicleTypes()
    if(data){
      setVehicleTypes(data)
    }
  }
  const getBrands = async () =>{
    const data = await brandService.getBrands()
    if(data){
      setBrands(data)
    }
  }

  useEffect(() => {
    if (mode === EDIT) {
      fetchCarById()
    }
    getVehicleTypes()
    getBrands()
  }, [form, mode, param, props])

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    console.log(fileListImages, 'hey-me')
    setImage(fileListImages)
  }, [fileListImages])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        // values.vehicleTypeId = '922af3ff-434d-4ef8-99a2-93f5d66fe7d9'
        // values.brandId = '62ea0981d5859d8db41a4165'
        const sendingValues={
          name: values?.name,
          status: values?.status,
          description: values?.description,
          videos: values?.videos,
          brandId: values?.brandId,
          vehicleTypeId: values?.vehicleTypeId,
          priceRange: values?.priceRange,
        }
        if (mode === ADD) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg)
            const imgValues = await multipleImageUpload(
              uploadedImg,
              'productTemplate',
              'descriptionRequired'
            )

            values.images = imgValues
          } else {
            values.images = []
          }

          const created = await carService.createCar(sendingValues)
          if (created) {
            message.success(`Created ${values.name} to Car list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg)
            const imgValues = await multipleImageUpload(
              uploadedImg,
              'productTemplate',
              'descriptionRequired'
            )
            values.images = imgValues
          } else {
            values.images = []
          }

          const edited = await carService.editCar(param.id, values)
          if (edited) {
            message.success(`Edited ${values.name} to Information list`)
            history.goBack()
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
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
                {mode === 'ADD' ? 'Add New Car' : `Edit Car`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => history.push('/app/dashboards/car/car-list')}
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
              <GeneralField uploadedImg={uploadedImg} form={form} vehicleTypes={vehicleTypes} brands={brands}/>
            </TabPane>
            {id && (
              <TabPane tab="Variant" key="2">
                <Variant
                  variantsList={variantList}
                  refreshData={fetchCarById}
                />
              </TabPane>
            )}

            <TabPane tab="Images" key="3">
              <ImageField
                propsImages={propsImages}
                images={uploadedImg}
                setImages={setImage}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default InformationForm
