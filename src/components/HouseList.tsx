/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, List, Spin, Typography } from 'antd';
import { collection, DocumentData, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebaseConfig';

const { Title } = Typography;
const { Header, Sider, Content } = Layout;
const HouseList = () => {
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState<DocumentData[]>([]);
  const housesCollection = useMemo(() => collection(db, "houses"), []);

  const navigate = useNavigate();

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
      <Title level={2}>บ้าน</Title>
      <div className="bg-white p-2 mt-2 bg mix-h-[35rem] max-h-[35rem] overflow-auto rounded-md">
        <List
          dataSource={houses}
          renderItem={(house) => (
            <List.Item
              key={house.id}
              // actions={[
              //   <Button
              //     disabled={false}
              //     className="btn">
              //     เก็บภาพ
              //   </Button>,
              // ]}

              onClick={() => {
                navigate(`/house/${house.id}`);
              }}>
              <List.Item.Meta title={house?.data()?.house_number} />
              <List.Item.Meta title={house?.data()?.cerate_at} />
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

export default HouseList;
