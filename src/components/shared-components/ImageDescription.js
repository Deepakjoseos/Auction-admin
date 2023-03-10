import { Card, Col, Image, Input, Row, Select, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Flex from './Flex';
const { Option } = Select;

const ImageDescription = ({
  url,
  file,
  description,
  images,
  id,
  setImages,
  setFileList,
  title,
  status,
  hasTitle = false,
  hasStatus = false,
  onRemove
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
  };

  const onStatusValueChange = (value) => {
    const changedImagesDesc = images?.map((cur) => {
      if (cur.uid === id) {
        return {
          ...cur,
          status: value
        };
      }
      return cur;
    });

    setImages(changedImagesDesc);
  };

  const onRemoveHandler = () => {
    const changedImagesDesc = images?.reduce((arr, currentValue) => {
      if (currentValue.uid !== id) {
        arr.push(currentValue);
      }

      return arr;
    }, []);

    setFileList(changedImagesDesc);
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
      {url ? (
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
          <Image
            style={{
              objectFit: 'scale-down',
              width: '150px',
              height: '150px'
            }}
            src={url}
          />
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
          {hasStatus && (
            <Select
              placeholder="Status"
              className="ml-2 w-100"
              value={status}
              onChange={onStatusValueChange}
            >
              <Option value="VERIFIED">Verified</Option>
              <Option value="UNVERIFIED">Non Verified</Option>
            </Select>
          )}
          {onRemove && (
            <Button
              danger
              className="align-self-end ml-4"
              onClick={onRemoveHandler}
            >
              Remove
            </Button>
          )}
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            style={{
              objectFit: 'scale-down',
              width: '150px',
              height: '150px'
            }}
            src={image}
          />
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
          {hasStatus && (
            <Select
              placeholder="Status"
              className="ml-2 w-100"
              value={status}
              onChange={onStatusValueChange}
            >
              <Option value="VERIFIED">Verified</Option>
              <Option value="UNVERIFIED">Non Verified</Option>
            </Select>
          )}
          {onRemove && (
            <Button
              danger
              className="align-self-end ml-4"
              onClick={onRemoveHandler}
            >
              Remove
            </Button>
          )}
        </Flex>
      )}
    </Card>
  );
};

export default ImageDescription;
