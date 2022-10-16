import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Upload } from 'antd';

import Icon from 'components/util-components/Icon';

const rules = {
  url: [
    {
      required: true,
      message: 'Required'
    }
  ]
};

const DocumentField = ({ onFinish, submitLoading, setSheet }) => {
  const onImportExcel = ({ fileList }) => {
    if (fileList.length === 1) setSheet(fileList[0]);
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Upload.Dragger
          multiple={false}
          type="file"
          accept=".xlsx, .xls"
          onChange={onImportExcel}
          showUploadList={{ showRemoveIcon: false }}
          beforeUpload={() => false}
        >
          <Button className="upload-wrap">
            <Icon type="upload" />
            <span className="upload-text">Drag/Upload Excel File</span>
          </Button>
        </Upload.Dragger>
      </Col>
    </Row>
  );
};

export default DocumentField;
