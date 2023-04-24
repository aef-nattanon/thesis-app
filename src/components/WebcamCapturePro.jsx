import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App({ setImage }) {
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto2');
    setImage(dataUri)
  }

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto1');
  }

  function handleCameraError(error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart(stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop() {
    console.log('handleCameraStop');
  }

  return (
    <Camera
      onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
      onTakePhotoAnimationDone={(dataUri) => { handleTakePhotoAnimationDone(dataUri); }}
      onCameraError={(error) => { handleCameraError(error); }}
      idealFacingMode={FACING_MODES.ENVIRONMENT}
      // idealResolution={{ width: 640, height: 640 }}
      imageType={IMAGE_TYPES.JPG}
      imageCompression={0.97}
      isMaxResolution={true}
      isImageMirror={false}
      isSilentMode={false}
      isDisplayStartCameraError={true}
      isFullscreen={false}
      sizeFactor={1}
      onCameraStart={(stream) => { handleCameraStart(stream); }}
      onCameraStop={() => { handleCameraStop(); }}
    />
  );
}

export default App;