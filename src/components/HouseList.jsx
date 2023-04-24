/* eslint-disable react-hooks/exhaustive-deps */
import { List, Spin, Table, Button, Tag} from 'antd';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'

import { db } from '../firebaseConfig';
// const { Header, Sider, Content } = Layout;
const HouseList = () => {
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState([]);
  const housesCollection = useMemo(() => collection(db, "houses"), []);

  const navigate = useNavigate();

  const columns = [
    {
      title: 'บ้านเลขที่',
      render: (_, house = {}) => (<>{house?.data()?.house_number}</>),

      // sorter: true,
      // onFilter: (value, house) => house?.data()?.house_number.indexOf(value) === 0,
    },
    {
      title: 'เลขผู้ใช้น้ำ',
      render: (_, house = {}) => (<>{house?.data()?.unit_number || '-'}</>)
    },
    {
      title: 'วันที่สร้าง',
      render: (_, house = {}) => (<>{dayjs(house?.data()?.cerate_at).format("DD/MMM/YYYY")}</>)
    },
  ];

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
    <>
      <section
        style={{ maxHeight: "85vh" }}
        className="bg-white bg overflow-auto  ">
         {loading? 
            <div className="grid content-center justify-items-center w-full mt-8 pt-8 mb-8 pb-8">
              <Spin />
            </div>:
          <Table columns={columns}
          onRow={(record, _) => {
            return {
              onClick: () => 
                navigate(`/record/${record.id}`)
            };
          }}
            scroll={{
            y: '75vh',
          }} dataSource={houses} pagination={ false} />
        }

        {/* <List
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
                navigate(`/record/${house.id}`);
              }}>
              <List.Item.Meta
                title={house?.data()?.house_number}
              />

              <List.Item.Meta
                title='เลขผู้ใช้น้ำ'
                description={house?.data()?.unit_number || '-'}
              />
              <List.Item.Meta
                title='วันที่สร้าง'
                description={dayjs(house?.data()?.cerate_at).format(
                  "DD/MMM/YYYY",
                )}
              />
            </List.Item>
          )}>
          {loading && (
            <div className="grid content-center justify-items-center w-full">
              <Spin />
            </div>
          )}
        </List> */}

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
      </section>
    </>
  );
};

export default HouseList;
