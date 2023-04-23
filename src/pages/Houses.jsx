/* eslint-disable react-hooks/exhaustive-deps */
import { Button, List, Spin, Typography, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { db } from '../firebaseConfig';

const { Title } = Typography;
const House = () => {
  const [loading, setLoading] = useState(false);
  const [houses, setHouses] = useState([]);
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
    <section className="max-h-screen">
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb> */}

      <Row>
        <Col span={8}><Title level={2}>บ้าน</Title></Col>
        <Col span={4} offset={12}>
          <Button

            style={{ backgroundColor: "#1890ff", color: 'white' }}
            className="btn"
            onClick={() => {
              navigate(`/home/new`);
            }}>
            +เพิ่มบ้าน
          </Button>
        </Col>
      </Row>

      <section
        style={{ maxHeight: "80vh" }}
        className="bg-white p-2 mt-2 bg overflow-auto  ">
        <List
          dataSource={houses}
          renderItem={(house) => (
            <List.Item
              key={house.id}
              actions={[
                <Button
                  disabled={false}
                  className="btn"
                  onClick={() => {
                    navigate(`/home/edit/${house.id}`);
                  }}>
                  จัดการ
                </Button>
              ]}>
              <List.Item.Meta
                title={house?.data()?.house_number}
              />

              <List.Item.Meta
                title='เลขผู้ใช้น้ำ'
                description={house?.data()?.unit_number || '-'}
              />
              <List.Item.Meta
                title='จำนวนทศนิยม'
                description={house?.data()?.decimal_places || '-'}
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
      </section>
    </section>
  );
};

export default House;
