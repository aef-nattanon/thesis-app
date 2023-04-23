import React, { useState } from "react";
import { Col, Row } from 'antd';
import MyModel from "../components/MyModel";
import WebcamCapture from "../components/WebcamCapturePro";

export default function About() {

  const [image, setImage] = useState(null);
  return (
    <section className="content-center max-h-screen items-center text-center">
      <h1>My demo</h1>
      <Row>
        <Col span={4} />
        <Col span={16}><WebcamCapture setImage={setImage} image={image} /></Col>
        <Col span={4} />
      </Row>
      <MyModel setImage={setImage} image={image} />
    </section >
  );
}

