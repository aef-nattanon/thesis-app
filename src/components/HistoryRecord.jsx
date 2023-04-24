/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Image, List, Descriptions, Row, Spin } from "antd";
import dayjs from "dayjs";
import {
  addDoc,
  orderBy,
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
import { useNavigate } from 'react-router-dom';

import { db, storage } from "../firebaseConfig";
function HistoryRecord({
  id,
  houseRef,
  house = {},
}) {
  const [photoLoading, setPhotoLoading] = useState(false);
  // const {decimal_places='0', max_value={} } = house?.data();

  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const photosCollection = useMemo(() => collection(db, "photos"), []);

  const fetchPhoto = useCallback(async () => {
    setPhotoLoading(true);
    const q = query(
      photosCollection,
      // orderBy("cerate_at", "desc"),
      orderBy("timestamp", 'desc'),
      where("house",  '==', houseRef),
      limit(25),
    );
    await getDocs(q).then((querySnapshot) => {
      const docs = querySnapshot.docs;
      setPhotos(docs);
    });
    setPhotoLoading(false);
  }, []);

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

  useEffect(() => {
    fetchPhoto();
  }, [fetchPhoto]);


  return (
    <>
      <Row>
        <Col span={24}>
          <div
            // style={{ maxHeight: "10%" }}
            className="bg-white p-2 mt-2 bg rounded-md">
            <List
              dataSource={photos}
              renderItem={(photo) => (
                <>
                  <List.Item
                    key={photo.id}
                    actions={[
                      <Button
                        disabled={false}
                        block

                        onClick={() => deletePhoto(photo)}>
                        ลบ
                      </Button>,
                    ]}>
                    {/* <List.Item.Meta
                      avatar={<Image width={50} src={photo?.data()?.image} />}
                    /> */}

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

export default HistoryRecord;
