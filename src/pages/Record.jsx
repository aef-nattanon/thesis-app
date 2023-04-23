// import { ChangeEvent, SetStateAction, useState } from 'react';
import { Typography } from 'antd'
import HouseList from '../components/HouseList';

const { Title } = Typography;
function Record() {
  return (
    <section className="max-h-screen">
      <Title level={2}>เก็บข้อมูล</Title>
      <HouseList />
    </section>
  );
}

export default Record;
