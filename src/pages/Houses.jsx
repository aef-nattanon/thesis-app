/* eslint-disable react-hooks/exhaustive-deps */
import { Button, List, Spin, Typography, Col, Row, Badge, Table, Tag } from 'antd';
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
      title: 'จำนวนทศนิยม',
      align: 'center',
      render: (_, house = {}) => ( 
              <Tag color='gold'>
                {house?.data()?.decimal_places || '-'}
              </Tag>
      ),
    },
    {
      title: 'จำนวนหน่วยสูงสุด',
      align: 'center',
      render: (_, house = {}) => ( 
              <Tag color='green'>
                {house?.data()?.max_value || '-'}
              </Tag>
      ),
    },
    {
      title: 'วันที่สร้าง',
      render: (_, house = {}) => (<>{dayjs(house?.data()?.cerate_at).format("DD/MMM/YYYY")}</>)
    },
    {
      title: '',
      key: 'action',
      render: (_, house) => (
        <Button
        disabled={false}
        block
        onClick={() => {
          navigate(`/home/edit/${house.id}`);
        }}>
        จัดการ
      </Button>
      ),
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

  console.log('---',houses)

  return (
    <section className="max-h-screen p-3 m-2">
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
            + เพิ่มบ้าน
          </Button>
        </Col>
      </Row>

      <section
        style={{ maxHeight: "85vh" }}
        className="bg-white bg overflow-auto  ">
        {loading? 
            <div className="grid content-center justify-items-center w-full mt-8 pt-8 mb-8 pb-8">
              <Spin />
            </div>:
          <Table columns={columns} scroll={{
            y: '75vh',
          }} dataSource={houses} pagination={ false} />
        }
      </section>
    </section>
  );
};

export default House;
