import { Card, Col, Image, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'

const ImageDescription = ({ url, file }) => {
  const [image, setImage] = useState(null)

  const base64Converter = (file) => {
    if (file) {
      var filereader = new FileReader()
      filereader.readAsDataURL(file)
      filereader.onload = function (evt) {
        var base64 = evt.target.result
        console.log(base64, 'jlkh')
        setImage(base64)
      }
    }
  }

  useEffect(() => {
    if (file !== null && !url) {
      base64Converter(file)
    }
  }, [file])

  return (
    <Card>
      <Row>
        {url ? (
          <Col md={16} sm={24} xs={24}>
            <div className="d-flex align-items-center">
              <Image width={120} height={120} src={url} />
              <Input placeholder="Description" className="ml-2" />
            </div>
          </Col>
        ) : (
          <Col md={16} sm={24} xs={24}>
            <div className="d-flex align-items-center">
              <Image width={120} height={120} src={image} />
              <Input placeholder="Description" className="ml-2" />
            </div>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default ImageDescription
