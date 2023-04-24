import { collection, doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Breadcrumb} from 'antd'

import HouseCard from '../components/HouseCard'
import HistoryRecord from '../components/HistoryRecord';
import { db } from '../firebaseConfig';

function HouseById() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const navigate = useNavigate();

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
    <section className="max-h-screen p-3 m-2 overflow-auto">
      <section className="p-2">
        <Breadcrumb
          items={[
            {
              title: 'เก็บข้อมูล',
              onClick: () => {
                navigate(`/records`);
              }
            },
            {
              title: `${house?.data()?.unit_number || ''}`,
            },
          ]}
        />
      </section>
      
        <HouseCard house={ house?.data()} newUrl={`/record/${id}/new`} /> 
      <section 
        style={{ maxHeight: "40vh" }} className='mt-3 overflow-auto'>
        <HistoryRecord id={`${id}`} houseRef={houseRef} house={house}  />
      </section>
    </section>
  );
}

export default HouseById;
