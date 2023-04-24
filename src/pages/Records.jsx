// import { ChangeEvent, SetStateAction, useState } from 'react';
import { Typography } from 'antd'
import HouseList from '../components/HouseList';

const { Title } = Typography;
function Records() {
  return (
    <section className="max-h-screen p-3 m-2">
      <Title level={2}>เก็บข้อมูล</Title>
      <HouseList />
    </section>
  );
}

export default Records;
