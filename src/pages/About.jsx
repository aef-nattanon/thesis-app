import React, {useState} from "react";

import MyModel from "../components/MyModel";
import WebcamCapture from "../components/WebcamCapture";

function About() {

  const [image, setImage] = useState(null);
  return (
    <>
      <h1>My demo</h1>
      <WebcamCapture setImage={setImage} image={image} />
      <MyModel  setImage={setImage} image={image} />
    </>
  );
}
export default About;
