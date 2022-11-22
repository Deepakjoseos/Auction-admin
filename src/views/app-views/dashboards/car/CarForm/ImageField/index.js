import { Card, Col, Row, Upload, Form } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon';
import React from 'react';

const ImageField = ({ propsImages, images, setImages }) => {
  return (
    <Card title="Media">
      {/* <Row gutter={16}>
        <Col xs={24} sm={24} md={17}> */}
      <Form.Item
        name="image"
        rules={[
          {
            required: true,
            message: 'Required'
          }
        ]}
      >
        <Upload listType="picture-card" name="image" {...propsImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Form.Item>
      {/* <h4>Add Description Note </h4>
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
      ))} */}
      {/* </Col>
      </Row> */}
    </Card>
  );
};

export default ImageField;
