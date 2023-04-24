/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Image, List, Progress, Row, Spin } from "antd";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import config from "../config";
import { db, storage } from "../firebaseConfig";
import { callDetection } from "../hooks/fetch";

function UploadPhoto({
  id,
  houseRef,
  house,
}) {
  // State to store uploaded file
  const [file, setFile] = useState(null); // progress
  const [url, setUrl] = useState(""); // progress

  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [resultImages, setResultImages] = useState(null);

  const [photos, setPhotos] = useState([]);
  const photosCollection = useMemo(() => collection(db, "photos"), []);

  const handleChange = (event) => {
    if (event?.target) {
      const target = event?.target;
      target?.files && setFile(target?.files[0]);
    }
  };

  const fetchPhoto = useCallback(async () => {
    setPhotoLoading(true);
    const q = query(
      photosCollection,
      where("house", "==", houseRef),
      // orderBy("cerate_at", "desc"),
      limit(25),
    );
    await getDocs(q).then((querySnapshot) => {
      const docs = querySnapshot.docs;
      setPhotos(docs);
    });
    setPhotoLoading(false);
  }, []);

  const addPhoto = useCallback(
    async (url) => {
      setUploadPhoto(true);
      console.log("in", url);
      await callDetection(url)
        .then(async (response) => {
          if (response.data && response.data?.number?.length > 0) {
            setResultImages(response.data?.result_image);
            setResult(response.data?.number);
            await addDoc(photosCollection, {
              image: url,
              result_meter_image: response.data?.result_image?.meter,
              result_number_image: response.data?.result_image?.number,
              result: response.data?.number,
              cerate_at: dayjs(new Date()).format(),
              house: houseRef,
            }).then(() => {
              fetchPhoto();
            });
          }
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      setUploadPhoto(false);
    },
    [url],
  );

  const deletePhoto = useCallback(
    async (photo) => {
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
            <Spin tip="กำลังอ่านมิเตอร์" />
          </div>
        );
      } else {
        if (resultImages?.meter && resultImages?.number && result) {
          return (
            <Row>
              <Col span={12}>
                <Image width={150} src={resultImages.meter} />
              </Col>
              <Col span={12}>
                <Row>
                  <Col>
                    <Image width={150} src={resultImages.number} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h1>{result.join()}</h1>
                  </Col>
                </Row>
              </Col>
            </Row>
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
        <Col span={10}>{url ? <Image width={150} src={url} /> : ""}</Col>
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
                <>
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
                    <List.Item.Meta
                      avatar={<Image width={50} src={photo?.data()?.image} />}
                    />

                    <List.Item.Meta
                      avatar={
                        <Image
                          width={50}
                          src={photo?.data()?.result_meter_image}
                        />
                      }
                    />

                    <List.Item.Meta
                      avatar={
                        <Image
                          width={50}
                          src={photo?.data()?.result_number_image}
                        />
                      }
                    />

                    <List.Item.Meta title={photo?.data()?.result.join()} />
                    <List.Item.Meta
                    
                      title={dayjs(photo?.data()?.cerate_at).format(
                        "DD/MMM/YYYY",
                      )}
                    />
                  </List.Item>
                </>
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
