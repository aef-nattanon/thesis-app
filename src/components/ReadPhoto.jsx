/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Image, Card, message, Row, Spin, Tag } from "antd";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  limit,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import config from "../config";
import { db, storage } from "../firebaseConfig";
import { callDetection } from "../hooks/fetch";

function ReadPhoto({
  id,
  houseRef,
  house = {},
  image,
}) {
  // State to store uploaded file
  const { max_value=0, decimal_places=0} = house?.data()
  const [url, setUrl] = useState(""); // progress
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [result, setResult] = useState([]);
  const [saving, setSaving] = useState(false)
  const [resultImages, setResultImages] = useState(null);
  const [response, setResponse] =  useState({});
  const photosCollection = useMemo(() => collection(db, "photos"), []);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (text="บันทึกสำเร็จ") => {
    messageApi.open({
      type: 'success',
      content: text,
    });
  };



  const savePhoto = useCallback(async (url, dataResponse) => { 
    setSaving(true)
    await addDoc(photosCollection, {
      image: url,
      result_meter_image: dataResponse.data?.result_image?.meter,
      result_number_image: dataResponse.data?.result_image?.number,
      result: dataResponse.data?.number,
      cerate_at: dayjs(new Date()).format(),
      timestamp: serverTimestamp(),
      house: houseRef,
    }).then(() => {
      console.log('okey')
      success("บันทึกสำเร็จ")
    });
    setSaving(false)
  } ,[])

  const readPhoto = useCallback(
    async (url) => {
      setUploadPhoto(true);
      console.log("in", url);
      await callDetection(url)
        .then(async (dataResponse) => {
          if (dataResponse.data && dataResponse.data?.number?.length > 0) {
            setResultImages(dataResponse.data?.result_image);
            setResult(dataResponse.data?.number);
            setResponse(dataResponse)
            // savePhoto(url, dataResponse)
          }
          console.log(JSON.stringify(dataResponse.data));
        })
        .catch((error) => {
          console.log(error);
        });
      setUploadPhoto(false);
    },
    [url],
  );

  const handleUpload = () => {
    if (!image) {
      alert("Please upload an image first!");
    } else {
      setUploadStatus(true);
      setResultImages(null);
      setUrl("");
      setResult([]);
      const storageRef = ref(storage, `/meter/${id}/${Date.now()}.jpeg`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
      // const uploadTask =
      uploadString(storageRef, image, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrl(url);
          readPhoto(url);
        });

        setUploadStatus(false);
      });
    }
  };

  console.log('000000000----', result)
  const resultImage = () => {
    if (url) {
      if (uploadPhoto) {
        return (
          <div className="grid content-center justify-items-center ">
            <Spin tip="กำลังอ่านมิเตอร์" />
          </div>
        );
      } else {
        if (resultImages?.meter && resultImages?.number && result) {
          return (
            <Card size="small" title="ค่าที่อ่านได้" >
             <Row>
              <Col span={12}> 
                <Image width={100} src={resultImages.number} /> 
              </Col>
                <Col span={12} className="p-2"> 
                  
                <Row>
                  <Col span={12} className="grid justify-items-end">
                      เลขที่อ่าน: 
                    </Col>
                    <Col span={12} className="grid justify-items-end">
                    <Tag color="geekblue"> {result.join() }</Tag>
                   
                    </Col>
                </Row>
                <Row className="pt-1">
                  <Col span={12} className="grid justify-items-end">
                  จำนวนทศนิยม: 
                    </Col>
                    <Col span={12} className="grid justify-items-end">

                      <Tag color=""> {decimal_places }</Tag>
                   
                    </Col>
                </Row>
                <Row className="pt-1">
                  <Col span={12} className="grid justify-items-end">
                      ค่าที่อ่าน: 
                    </Col>
                    <Col span={12} className="grid justify-items-end">

                      <Tag color="blue"> {Number(Number(result.join('')) * (1/ Math.pow(10,parseInt(decimal_places)))).toFixed(2) }</Tag>
                   
                    </Col>
                </Row>
                <Row className="pt-2">
                    <Col span={24}>
                  <Button loading={saving} type="primary" block onClick={()=>savePhoto(url, response)}> บันทึก</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          );
        } else {
          return (
            <>
              <h1>ไม่เจอ</h1>
            </>
          );
        }
      }
    }
    return "";
  };
  if (image) {
    return (
      <>
        
        {contextHolder}
        <Row className="p-2">
          <Col span={12}>
            <Card size="small" >

              <Row>
                <Col span={24}>
                  <Button
                    block
                    className="btn bg-green-300"
                    type="dashed"
                    disabled={uploadStatus}
                    loading={uploadStatus}
                    onClick={handleUpload}>
                    อ่านมิเตอร์
                  </Button>
                </Col>
              </Row>
              
              <Row className="pt-1">
                <Col span={24}>
                <Image
                  alt="upload preview"
                  width={250}
                  className="Dropzone-img"
                  src={image}
                />
                </Col>
              </Row>
              </Card>
           
          </Col>
          <Col span={12}>{resultImage()}</Col>
        </Row>
      </>
    );
  } else { 
    return(<></>)
  }
}

export default ReadPhoto;
