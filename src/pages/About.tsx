import React from "react";

import UploadImage from "../components/UploadImage";

const About: React.FC = () => (
  <>
    <h1>This is a PWA!!</h1>
    <form>
      <label>
        image:
        <input
          name="image"
          accept="image/*"
          type="file"
          capture="environment"
        />
      </label>
      <input type="submit" value="Submit" />
      <UploadImage />
    </form>
  </>
);
export default About;
