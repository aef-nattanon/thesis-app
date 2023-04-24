import React from 'react';
import { Typography, Breadcrumb, Spin, message } from 'antd'
import { collection, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import HouseForm from '../components/HouseForm';
import { db } from '../firebaseConfig';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const { Title } = Typography;

const EditHome = () => {

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();

  const [isToHome, setIsToHome] = useState(false);
  const [house, setHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const housesCollection = useMemo(() => collection(db, "houses"), []);
  const houseRef = useMemo(
    () => doc(housesCollection, id),
    [housesCollection, id],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const success = (content = 'ลบแล้ว') => {
    messageApi.open({
      type: 'success',
      content: `${content}`,
    });
  };
  const error = (content = 'error') => {
    messageApi.open({
      type: 'error',
      content: `${content}`,
    });
  };

  const fetchHouse = useCallback(async () => {
    setHouse(await getDoc(houseRef));
  }, [houseRef]);

  useEffect(() => {
    fetchHouse();
  }, [fetchHouse]);

  const handleDeleteHouse = useCallback(async () => {
    setIsLoading(true);
    await deleteDoc(houseRef)
      .then(async () => {
        success('ลบแล้ว')
        await sleep(2000)
        setIsToHome(true)
      })
      .catch((error) => {
        error(error);
      });
    setIsLoading(false);
  }, [houseRef, success]);

  const handleUpdate = async (data) => {
    console.log('on update', data);
    setIsLoading(true);
    try {
      updateDoc(houseRef, data);
      success('บันทึกแล้ว')
      await sleep(2000)
    } catch (e) {
      error(e);
    }
    setIsLoading(false);
  }

  if (isToHome) {
    return <Navigate to="/houses?successText=ลบแล้ว" />;
  }
  return (
    <section className="max-h-screen content-center justify-items-center max-w-screen p-3 m-2">
      {contextHolder}
      <section className="p-2">
        <Breadcrumb
          items={[
            {
              title: 'บ้าน',
              onClick: () => {
                navigate(`/houses`);
              }
            },
            {
              title: `แก้ใขบ้าน: ${house?.data()?.house_number}`,
            },
          ]}
        />
      </section>
      <Title level={3}>แก้ใขบ้าน</Title>
      {house?.data() ?
        < HouseForm textSubmit="บันทึก" isLoading={isLoading} onFinish={handleUpdate}
          initialValues={house?.data()}
          handleDeleteHouse={handleDeleteHouse}
        /> : <div className="grid content-center justify-items-center w-full">
          <Spin />
        </div>}
    </section>
  )
};

export default EditHome;
