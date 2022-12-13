/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, List, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { addDoc, collection, deleteDoc, DocumentData, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { db } from '../firebaseConfig';

const { Title } = Typography;
const House = () => {
  const [loading, setLoading] = useState(false);
  const [houseNumber, setHouseNumber] = useState("");
  const [houses, setHouses] = useState<DocumentData[]>([]);
  const housesCollection = useMemo(() => collection(db, "houses"), []);

  const addHouse = useCallback(async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(housesCollection, {
        cerate_at: dayjs(new Date()).format(),
        house_number: houseNumber,
      });
      console.log("Document written with ID: ", docRef, houses);
      fetchPost();
      setHouseNumber("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setLoading(false);
  }, [houseNumber]);

  const deleteHouse = useCallback(async (house: DocumentData) => {
    setLoading(true);
    await deleteDoc(house.ref)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
        fetchPost();
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    await getDocs(query(housesCollection, orderBy("house_number"))).then(
      (querySnapshot) => {
        const docs = querySnapshot.docs;
        setHouses(docs);
      },
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <section className="house-container  max-h-full ">
      <Title level={2}>เพิ่มบ้าน</Title>

      <div>
        <Input
          placeholder="เพิ่มบ้านใหม่"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          addonAfter={
            <button
              disabled={loading || houseNumber === ""}
              className="btn"
              type="submit"
              onClick={addHouse}>
              +เพิ่มบ้าน
            </button>
          }
        />
      </div>
      <div
        // style={{ maxHeight: "10%" }}
        className="bg-white p-2 mt-2 bg mix-h-[35rem] max-h-[35rem] overflow-auto rounded-md">
        <List
          dataSource={houses}
          renderItem={(house) => (
            <List.Item
              key={house.id}
              actions={[
                <Button
                  disabled={false}
                  className="btn"
                  onClick={() => deleteHouse(house)}>
                  ลบ
                </Button>,
              ]}>
              <List.Item.Meta title={house?.data()?.house_number} />
              <List.Item.Meta
                title={dayjs(house?.data()?.cerate_at).format(
                  "DD-MMM-YYYY HH:mm:ss",
                )}
              />
            </List.Item>
          )}>
          {loading && (
            <div className="grid content-center justify-items-center w-full">
              <Spin />
            </div>
          )}
        </List>

        {/* {houses?.map((house) => (
            <div key={house.id}>
              <p>{house?.data()?.house_number}</p>
              <button
                disabled={false}
                type="submit"
                className="btn"
                onClick={() => deleteHouse(house)}>
                ลบ
              </button>
            </div>
          ))} */}
      </div>
    </section>
  );
};

export default House;
