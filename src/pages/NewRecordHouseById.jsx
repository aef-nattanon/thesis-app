import MyModel from "../components/MyModel";
import WebcamCapture from "../components/WebcamCapturePro";
import ReadPhoto from "../components/ReadPhoto";


/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Col, Image, List, Progress, Row, Spin } from "antd";
import dayjs from "dayjs";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useParams, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import config from "../config";
import { db, storage } from "../firebaseConfig";
import { callDetection } from "../hooks/fetch";

export default function About() {

  const [image, setImage] = useState(null);
  const [house, setHouse] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const housesCollection = useMemo(() => collection(db, "houses"), []);

  const houseRef = useMemo(
    () => doc(housesCollection, id),
    [housesCollection, id],
  );

  const fetchHouse = useCallback(async () => {
    setHouse(await getDoc(houseRef));
  }, [houseRef]);

  useEffect(() => {
    fetchHouse();
  }, [fetchHouse]);

  return (
    <section style={{ maxHeight: "100vh" }} className="content-center max-h-screen items-center text-center overflow-auto "> 
       <section className="p-2">
        <Breadcrumb
          items={[
            {
              title: 'เก็บข้อมูล',
              onClick: () => {
                navigate(`/records`);
              }
            },
            {
              title: `${house?.data()?.unit_number || ''}`,
              onClick: () => {
                navigate(`/record/${id}`);
              }
            },
            {
              title: 'เพิ่ม',
            },
          ]}
        />
      </section>
      <WebcamCapture setImage={setImage} image={image} />
      {/* <MyModel setImage={setImage} image={image} /> */}
      {house && <ReadPhoto image={image} id={id} houseRef={houseRef} house={house} />}
    </section >
  );
}

