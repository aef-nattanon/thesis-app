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
    <section className="max-h-screen p-3 m-2">
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb> */}

      <Row>
        <Col span={8}><Title level={2}>หน้าหลัก</Title></Col>
        <Col span={4} offset={12}>
         
        </Col>
      </Row>

      <section
        style={{ maxHeight: "80vh" }}
        className="bg-white p-2 mt-2 bg overflow-auto  ">
        <Title level={3}>รายงาน...</Title>
      </section>
    </section>
  );
};

export default House;
