import { Card, Badge, Descriptions,Button, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const HouseCard = ({ house = {}, newUrl='' }) => {
  
  const navigate = useNavigate();
  const { house_number='-', unit_number='-', decimal_places='-', address='-', max_value="-"} = house;
  return (
    <Card
      size="small"
      title={`บ้านเลขที่ ${house_number}`}
      bordered={false}
      style={{
      }}
      extra={
        <Button
        style={{ backgroundColor: "#1890ff", color: 'white' }}
        className="btn"
        onClick={() => {navigate(newUrl);}}>
          + เก็บเพิ่ม
        </Button>
      }
    >
        <section style={{ maxHeight: "40vh" }} className='m-3 overflow-auto'>
          <Descriptions  layout="vertical" bordered size="small">
            <Descriptions.Item label="เลขผู้ใช้น้ำ">{ unit_number} </Descriptions.Item>
            <Descriptions.Item label="จำนวนทศนิยม"> <Tag color='gold'>{decimal_places}</Tag></Descriptions.Item>
            <Descriptions.Item label="จำนวนหน่วยสูงสุด"> <Tag color='green'>{max_value}</Tag></Descriptions.Item>
            <Descriptions.Item label="ที่อยู่" span={3}>{address}</Descriptions.Item>
          </Descriptions>
          <Descriptions className="mt-1" layout="vertical" bordered size="small">
            <Descriptions.Item label="วันที่ล่าสุด">{'12/12/2023'} </Descriptions.Item>
            <Descriptions.Item label="หน่วยล่าสุด"><Badge overflowCount={999999} style={{backgroundColor: '#B6C200'}}count={222.2 } /></Descriptions.Item>
            <Descriptions.Item label="ล่าสุดใช้ไป"><Badge overflowCount={999999} style={{ backgroundColor: '#52c41a'}} count={50} /></Descriptions.Item>
          </Descriptions>
        </section>
    </Card>
  );
}

export default HouseCard;
