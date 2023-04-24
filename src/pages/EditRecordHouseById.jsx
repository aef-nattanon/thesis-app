import React, { useState } from "react";
import { Col, Row } from 'antd';
import MyModel from "../components/MyModel";
import WebcamCapture from "../components/WebcamCapturePro";

export default function About() {

  const [image, setImage] = useState(null);
  return (
    <section style={{ maxHeight: "100vh" }} className="content-center max-h-screen items-center text-center overflow-auto ">
      <Row style={{ padding: "0", margin: '0' }}>
        <Col span={3} />
        <Col span={18}><WebcamCapture setImage={setImage} image={image} /></Col>
        <Col span={3} />
      </Row>
      <MyModel setImage={setImage} image={image} />
    </section >
  );
}

