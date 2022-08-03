import { Card, Col, Row, Upload } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import React from 'react'
import ImageDescription from './ImageDescription'

const ImageField = ({ propsImages, fileListImages }) => {
  return (
    <Card title="Media">
      {/* <Row gutter={16}>
        <Col xs={24} sm={24} md={17}> */}
      <Upload listType="picture-card" name="image" {...propsImages}>
        <CustomIcon className="display-3" svg={ImageSvg} />
      </Upload>
      <h4>Add Description Note </h4>
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
      {/* </Col>
      </Row> */}
    </Card>
  )
}

export default ImageField
