import React from "react";
import { Button, Upload, Select, Form, Col, Row, Card } from "antd";
import Icon from "components/util-components/Icon";
const { Option } = Select;

const rules = {
  auctionId: [
    {
      required: true,
      message: "Required",
    },
  ],
  name: [
    {
      required: true,
      message: "Required",
    },
  ],
  image: [
    {
      required: true,
      message: "Required",
    },
  ],
  status: [
    {
      required: true,
      message: "Required",
    },
  ],
  url: [
    {
      required: true,
      message: "Required",
    },
  ],
};
const GeneralField = ({ setSheet, auctions, mode, setAuctionId }) => {
  const onImportExcel = ({ fileList }) => {
    if (fileList.length === 1) setSheet(fileList[0]);
  };
  return (
    mode === 'ADD' && (
      <div style={{ margin: 100, marginTop: '20px' }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={17}>
            <Card title="Upload Auction Inventory">
              <Form.Item
                name="auctionId"
                label="Auction"
                rules={rules.auctionId}
              >
                <Select
                  style={{ minWidth: '120px', marginBottom: '10px' }}
                  placeholder="Select Auction"
                >
                  {auctions?.map((auction) => (
                    <Option
                      key={auction._id}
                      value={auction._id}
                      disabled={auction.status === 'Hold'}
                    >
                      {auction.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
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
    )
  );
};

export default GeneralField;
