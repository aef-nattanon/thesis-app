import { ChangeEvent, SetStateAction, useState } from 'react';

import UploadPhoto from '../components/UploadPhoto';

function ImageById() {
  return (
    <div>
      <UploadPhoto id="test" />
    </div>
  );
}

export default ImageById;
