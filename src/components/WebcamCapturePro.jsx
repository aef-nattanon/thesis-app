import React, { useRef } from "react";
import { Camera } from "react-camera-pro";
import { CameraOutlined } from '@ant-design/icons';
import { Button, Row,Col } from 'antd';


const Component = ({image, setImage}) => {
  const camera = useRef(null);
  return (
    <>
      <Row justify="center">
        <Col span={8}/>
        <Col span={8}>
          <Camera ref={camera} facingMode='environment' aspectRatio={1 / 1} />
        </Col>
        <Col span={8}/>
      </Row>
      <Row justify="center">

      <Button className="mt-2" onClick={() => setImage(camera.current.takePhoto())}  shape="round" icon={<CameraOutlined />}>
          ถ่าย
        </Button>
      </Row>
    </>
  );
}

export default Component;