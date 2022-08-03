import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  Image,
  Button,
  Drawer,
  notification,
} from 'antd'

import Flex from 'components/shared-components/Flex'

import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
// import VariantsForm from './VariantsForm'
// import productTemplateService from 'services/productTemplate'
import { useParams } from 'react-router-dom'
import VariantForm from './VariantForm'
import carService from 'services/car'

const VariantsField = ({ variantsList, refreshData }) => {
  const propsVariantImages = []
  const [openVariantsForm, setOpenVariantsForm] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null)

  const { id } = useParams()

  const [form] = Form.useForm()

  console.log(variantsList, 'variatnsList')

  const onEditClick = (variant) => {
    setSelectedVariant(variant)
    setOpenVariantsForm(true)
  }
  const onDeleteVariant = async (carVariantId) => {
    const deleted = await carService.deleteCarVariant(id, carVariantId)

    if (deleted) {
      notification.success({
        message: 'Success',
        description: 'Variant deleted successfully',
      })
      refreshData()
    }
  }

  return (
    <>
      <Flex justifyContent="end">
        <Button
          type="primary"
          className="mr-1"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenVariantsForm(true)}
        />
      </Flex>
      <Row gutter={16}>
        {variantsList.map((variant, index) => (
          <Col xs={24} sm={24} md={12} key={index}>
            <Card
              title={'Variant' + index}
              extra={
                <Flex alignItems="center">
                  <Button
                    type="primary"
                    className="mr-1"
                    icon={<EditOutlined />}
                    onClick={() => onEditClick(variant)}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => onDeleteVariant(variant.id)}
                  />
                </Flex>
              }
              style={{ marginBottom: 30 }}
            >
              <Image.PreviewGroup>
                {variant?.images?.map((image, index) => (
                  <Image
                    key={index}
                    height={120}
                    width={120}
                    style={{ objectFit: 'cover' }}
                    src={image?.image}
                  />
                ))}
              </Image.PreviewGroup>
            </Card>
          </Col>
        ))}

        <VariantForm
          openVariantsForm={openVariantsForm}
          setOpenVariantsForm={setOpenVariantsForm}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          refreshData={refreshData}
          form={form}
        />
      </Row>
    </>
  )
}

export default VariantsField
