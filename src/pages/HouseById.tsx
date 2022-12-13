import { ChangeEvent, SetStateAction, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import UploadPhoto from '../components/UploadPhoto';

function HouseById() {
  const { id } = useParams();
  return (
    <div>
      id: {id}
      <UploadPhoto id={`${id}`} />
    </div>
  );
}

export default HouseById;
