import { collection, doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import UploadPhoto from '../components/UploadPhoto';
import { db } from '../firebaseConfig';

function HouseById() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);

  const housesCollection = useMemo(() => collection(db, "houses"), []);
  const houseRef = useMemo(
    () => doc(housesCollection, id),
    [housesCollection, id],
  );

  const fetchHouse = useCallback(async () => {
    setHouse(await getDoc(houseRef));
  }, [houseRef]);

  useEffect(() => {
    fetchHouse();
  }, [fetchHouse]);

  return (
    <section className="max-h-screen">
      house_number: {house?.data()?.house_number}
      <UploadPhoto id={`${id}`} houseRef={houseRef} house={house} />
    </section>
  );
}

export default HouseById;
