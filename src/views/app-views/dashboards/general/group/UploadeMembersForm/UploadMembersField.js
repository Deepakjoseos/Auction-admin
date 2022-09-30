import React from "react";
import { Button, Upload, Col, Row, Card } from "antd";
import Icon from "components/util-components/Icon";

const UploadMembersField = ({ setSheet }) => {
  const onImportExcel = ({ fileList }) => {
    if (fileList.length === 1) setSheet(fileList[0]);
  };
  return (
    <div style={{ margin: 100, marginTop: "20px" }}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={17}>
          <Card>
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UploadMembersField;
