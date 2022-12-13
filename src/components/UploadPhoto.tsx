/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Image, List, Progress, Row, Spin } from 'antd';
import dayjs from 'dayjs';
import { collection, deleteDoc, DocumentData, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import config from '../config';
import { db, storage } from '../firebaseConfig';
import { callDetection } from '../hooks/fetch';

function UploadPhoto({ id }: { id: string }) {
  // State to store uploaded file
  const [file, setFile] = useState<File | null>(null); // progress
  const [url, setUrl] = useState(""); // progress

  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [resultImages, setResultImages] = useState<{
    meter: string;
    number: string;
  } | null>(null);

  const [photos, setPhotos] = useState<DocumentData[]>([]);
  const photosCollection = useMemo(() => collection(db, "photos"), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target) {
      const target = event?.target;
      target?.files && setFile(target?.files[0]);
    }
  };

  const fetchPhoto = useCallback(async () => {
    setPhotoLoading(true);
    await getDocs(query(photosCollection, orderBy("cerate_at"))).then(
      (querySnapshot) => {
        const docs = querySnapshot.docs;
        setPhotos(docs);
      },
    );
    setPhotoLoading(false);
  }, []);

  const addPhoto = useCallback(
    async (url: string) => {
      setUploadPhoto(true);
      console.log("in", url);
      await callDetection(url)
        .then((response) => {
          console.log("response0000000", response);
          if (response.data) {
            setResultImages(response.data?.result_image);
            setResult(response.data?.number);
          }
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      // .then((response) => {
      //   console.log("0000000-res", response);
      //   return response.json();
      // })
      // .then((json) => {
      //   console.log("0000000", json);
      //   // try {
      //   //   const docRef = await addDoc(photosCollection, {
      //   //     cerate_at: dayjs(new Date()).format(),
      //   //     url: url,
      //   //   });
      //   //   fetchPhoto();
      //   // } catch (e) {
      //   //   console.error("Error adding document: ", e);
      //   // }
      // })
      // .catch((error) => {
      //   console.log("error: ", error);
      // });

      console.log("out", url);
      setUploadPhoto(false);
    },
    [url],
  );

  const deletePhoto = useCallback(
    async (photo: DocumentData) => {
      setPhotoLoading(true);
      await deleteDoc(photo.ref)
        .then(() => {
          console.log("Entire Document has been deleted successfully.");
          fetchPhoto();
        })
        .catch((error) => {
          console.log(error);
        });
      setPhotoLoading(false);
    },
    [fetchPhoto],
  );

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    } else {
      setUploadStatus(true);
      setResultImages(null);
      setUrl("");
      setResult([]);
      const storageRef = ref(storage, `/meter/${id}/${file?.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          ); // update progress

          setPercent(percent);
        },
        (err) => {
          setUploadStatus(false);
          console.log(err);
        },
        () => {
          setUploadStatus(false);
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrl(url);
            addPhoto(url);
          });
        },
      );
    }
  };
  console.log(config.THESIS_API_URL);

  useEffect(() => {
    fetchPhoto();
  }, [fetchPhoto]);

  const resultImage = () => {
    if (url) {
      if (uploadPhoto) {
        return (
          <div className="grid content-center justify-items-center w-full">
            <Spin />
          </div>
        );
      }
      if (resultImages?.meter && resultImages?.number) {
        return (
          <>
            <Image width={200} src={resultImages.meter} />
            <Image width={200} src={resultImages.number} />
            <h1>{result.join()}</h1>
          </>
        );
      } else {
        return (
          <>
            <h1>ไม่เจอ</h1>
          </>
        );
      }
    }
    return "";
  };
  return (
    <>
      <Row>
        <Col span={14}>
          <input
            type="file"
            onChange={(e) => handleChange(e)}
            accept="/image/*"
          />
                
        </Col>
        <Col span={10}>
          <Button
            className="btn bg-green-300"
            type="dashed"
            disabled={uploadStatus}
            loading={uploadStatus}
            onClick={handleUpload}>
            อ่านมิเตอร์
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Progress
            percent={percent}
            status={uploadStatus ? "active" : "normal"}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>{url ? <Image width={200} src={url} /> : ""}</Col>
        <Col span={14}>{resultImage()}</Col>
      </Row>
      <Row>
        <Col span={24}>
          <div
            // style={{ maxHeight: "10%" }}
            className="bg-white p-2 mt-2 bg mix-h-[35rem] max-h-[35rem] overflow-auto rounded-md">
            <List
              dataSource={photos}
              renderItem={(photo) => (
                <List.Item
                  key={photo.id}
                  actions={[
                    <Button
                      disabled={false}
                      className="btn"
                      onClick={() => deletePhoto(photo)}>
                      ลบ
                    </Button>,
                  ]}>
                  <List.Item.Meta title={photo?.data()?.house_number} />
                  <List.Item.Meta
                    title={dayjs(photo?.data()?.cerate_at).format(
                      "DD-MMM-YYYY HH:mm:ss",
                    )}
                  />
                </List.Item>
              )}>
              {photoLoading && (
                <div className="grid content-center justify-items-center w-full">
                  <Spin />
                </div>
              )}
            </List>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default UploadPhoto;
