import { collection, doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { ChangeEvent, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import UploadPhoto from '../components/UploadPhoto';
import { db } from '../firebaseConfig';

function HouseById() {
  const { id } = useParams();
  const [house, setHouse] = useState<DocumentSnapshot | null>(null);

  const housesCollection = useMemo(() => collection(db, "houses"), []);
  const houseRef = useMemo(
    () => doc(housesCollection, id),
    [housesCollection, id],
  );

  const fetchHouse = useCallback(async () => {
    setHouse(await getDoc(houseRef));
  }, []);

  useEffect(() => {
    fetchHouse();
  }, [fetchHouse]);

  return (
    <div>
      house_number: {house?.data()?.house_number}
      <UploadPhoto id={`${id}`} houseRef={houseRef} house={house} />
    </div>
  );
}

export default HouseById;
