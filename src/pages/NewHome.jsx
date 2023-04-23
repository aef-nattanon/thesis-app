import React from 'react';
import { Typography, Breadcrumb, Spin, message } from 'antd'
import dayjs from 'dayjs';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import HouseForm from '../components/HouseForm';
import { db } from '../firebaseConfig';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const { Title } = Typography;

const NewHome = () => {

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [isToHome, setIsToHome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const housesCollection = useMemo(() => collection(db, "houses"), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const success = (content = 'success') => {
    messageApi.open({
      type: 'success',
      content: `${content}`,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const error = (content = 'error') => {
    messageApi.open({
      type: 'error',
      content: `${content}`,
    });
  };

  const handleAddHouse = useCallback(async (data) => {
    setIsLoading(true);
    try {
      await addDoc(housesCollection, {
        cerate_at: dayjs(new Date()).format(),
        ...data
      }).then(async () => {
        success('เพิ่มสำเร็จ')
        await sleep(2000)
        setIsToHome(true)

      }).catch((error) => {
        error(error);
      });
      setIsLoading(false);
    } catch (e) {
      error(error);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [housesCollection, success]);

  if (isToHome) {
    return <Navigate to="/houses?successText=ลบแล้ว" />;
  }
  return (
    <section className="max-h-screen content-center justify-items-center max-w-screen">
      {contextHolder}
      <section className="p-2">
        <Breadcrumb
          items={[
            {
              title: 'หน้าหลัก',
              onClick: () => {
                navigate(`/`);
              }
            },
            {
              title: `เพิ่มบ้าน`,
            },
          ]}
        />
      </section>
      <Title level={3}>เพิ่มบ้าน</Title>
      < HouseForm textSubmit="บันทึก" isLoading={isLoading} onFinish={handleAddHouse}
      />
    </section>
  )
};

export default NewHome;
