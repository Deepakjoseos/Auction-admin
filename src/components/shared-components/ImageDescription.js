import { Card, Col, Image, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';

const ImageDescription = ({
  url,
  file,
  description,
  images,
  id,
  setImages,
  title,
  hasTitle = false
}) => {
  const [image, setImage] = useState(null);

  const onDescriptionValueChange = (e) => {
    const changedImagesDesc = images?.map((cur) => {
      if (cur.uid === id) {
        return {
          ...cur,
          description: e.target.value
        };
      }
      return cur;
    });

    setImages(changedImagesDesc);

    // setImage({ ...image, description: e.target.value })
  };

  const onTitleValueChange = (e) => {
    const changedImagesDesc = images?.map((cur) => {
      if (cur.uid === id) {
        return {
          ...cur,
          title: e.target.value
        };
      }
      return cur;
    });

    setImages(changedImagesDesc);

    // setImage({ ...image, description: e.target.value })
  };

  const base64Converter = (file) => {
    if (file) {
      var filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = function (evt) {
        var base64 = evt.target.result;
        console.log(base64, 'jlkh');
        setImage(base64);
      };
    }
  };

  useEffect(() => {
    if (file !== null && !url) {
      base64Converter(file);
    }
  }, [file]);

  return (
    <Card>
      <Row>
        {url ? (
          <Col>
            <div className="d-flex align-items-center">
              <Image width={150} height={150} src={url} />
              {hasTitle && (
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={onTitleValueChange}
                  className="ml-2"
                />
              )}
              <Input
                placeholder="Description"
                value={description}
                onChange={onDescriptionValueChange}
                className="ml-2"
              />
            </div>
          </Col>
        ) : (
          <Col>
            <div className="d-flex align-items-center">
              <Image width={150} height={150} src={image} />
              {hasTitle && (
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={onTitleValueChange}
                  className="ml-2"
                />
              )}
              <Input
                placeholder="Description"
                value={description}
                onChange={onDescriptionValueChange}
                className="ml-2"
              />
            </div>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default ImageDescription;
