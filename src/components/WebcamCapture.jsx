// import React from "react";
// import Webcam from "react-webcam";
// import { CameraOutlined } from '@ant-design/icons';
// import { Button, Row } from 'antd';

// const videoConstraints = {
//   width: '30vw',
//   height: '10vw',
//   facingMode: "user"
// };

// const WebcamCapture = ({setImage}) => {
//   const webcamRef = React.useRef(null);
//   const capture = React.useCallback(
//     () => {
//       setImage(webcamRef.current.getScreenshot())
//     },
//     [setImage]
//   );
//   return (
//     <>
//     <Row justify="center">
//       <Webcam
//         audio={false} 
//         ref={webcamRef}
//         screenshotFormat="image/jpeg" 
//         videoConstraints={videoConstraints}
//         />
//       </Row>
//       <Row justify="center">
//         <Button className="mt-2" onClick={capture}  shape="round" icon={<CameraOutlined />}>
//           ถ่าย
//         </Button>
//       </Row>
//     </>
//   );
//  };
//  export default WebcamCapture