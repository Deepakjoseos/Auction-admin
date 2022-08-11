import { Input, Row, Col, Card, Form, Select } from "antd";

const { Option } = Select;

const rules = {
  banner: [
    {
      required: true,
      message: "Required",
    },
  ],
 
};

const GeneralField = ({ setmode }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="General Info">
          <>
         <div>
            
            <Form.Item name="module" label="Module" rules={rules.module}>
            <Select placeholder="Module">
              <Option value="BANNER">BANNER</Option>
              <Option value="BRAND">BRAND</Option>
              
              <Option value="CAR">CAR</Option>
              <Option value="USER">USER</Option>
              <Option value="FUEL TYPE">FUEL TYPE</Option>
              <Option value="INFORMATION">INFORMATION</Option>
              <Option value="SETINGS">SETINGS</Option>
              <Option value="VEHICLE TYPE">VEHICLE TYPE</Option>





            </Select>
          </Form.Item>
          </div>
          </>
        
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
