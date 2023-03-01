import React from 'react';
import { Button, Row,Col } from 'antd';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App({ setImage}) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    // console.log('takePhoto2');
    setImage(dataUri)
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    // console.log('takePhoto1');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }

  return (
    <Row justify="center">
      <Col span={2}/>
      <Col span={20}> 
        <Camera
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
          onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
          onCameraError = { (error) => { handleCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 480, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {1}
          isMaxResolution = {true}
          isImageMirror = {false}
          isSilentMode = {false}
          isDisplayStartCameraError = {true}
          isFullscreen = {false}
          sizeFactor = {1}
          onCameraStart = { (stream) => { handleCameraStart(stream); } }
          onCameraStop = { () => { handleCameraStop(); } }
        />
      </Col>
      <Col span={2}/>
    </Row>
  );
}

export default App;