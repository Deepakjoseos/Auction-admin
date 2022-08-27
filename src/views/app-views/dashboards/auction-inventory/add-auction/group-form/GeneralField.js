import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import vehicletypeService from "services/vehicleType";
import participantService from "services/Participant";
import regionService from "services/region";
import cityService from "services/city";
import clientService from "services/client";
// const { Dragger } = Upload
const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Required",
    },
  ],
  order: [
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
};

const GeneralField = (props) => {
  const [citys, setCitys] = useState([]);
  const [regions, setRegions] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await cityService.getcity();
        console.log(data, "city");
        setCitys(data);
        const data1 = await vehicletypeService.getVehicleTypes();
        console.log(data1, "city");
        setVehicleType(data1);
        console.log(regions, "asas");
        const data2 = await participantService.getAllParticipants();
        console.log(data2, "city");
        const data3 = await regionService.getRegions();
        console.log(data3, "city");
        setRegions(data3);
        const data4 = await clientService.getClients();
        setClients(data4);
        console.log(data4, "asssdsdsdsdsdsdsd");

        // console.log(vehicleType);
      } catch (error) {
        console.log(error, "err");
      }
    };

    getData();
  }, []);

  return (
    <Row gutter={16}>
         
<input type="file" onChange={(e)=>{
console.log(e.target.files[0]);
}} />

    </Row>
  );
};

export default GeneralField;
