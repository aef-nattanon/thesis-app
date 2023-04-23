import React, { useState, useEffect } from "react";
import { Col, Row } from 'antd';
import * as tf from "@tensorflow/tfjs";

// const weights = 'http://aef-nattanon.github.io/web_model/model.json';
const weights = '/web_model/model.json';
const names = ['meter', 'modle 1', 'model 2']


function MeterModel({ image }) {

  const [model, setModel] = useState(null);
  const [meterText, setMeterText] = useState('');

  useEffect(() => {
    tf.loadGraphModel(weights).then(model => {
      setModel(model)
    });
  }, []);


  const cropToCanvas = (image, canvas, ctx) => {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const ratio = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    console.log('-----ratio', ratio)
    const newWidth = Math.round(naturalWidth * ratio);
    const newHeight = Math.round(naturalHeight * ratio);
    ctx.drawImage(
      image,
      0,
      0,
      naturalWidth,
      naturalHeight,
      (canvas.width - newWidth) / 2,
      (canvas.height - newHeight) / 2,
      newWidth,
      newHeight,
    );

  };

  const cropImage = (image, canvas, ctx, [x1, y1, x2, y2]) => {

    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    x1 *= naturalWidth;
    x2 *= naturalWidth;
    y1 *= naturalHeight;
    y2 *= naturalHeight;
    const width = x2 - x1;
    const height = y2 - y1;

    ctx.drawImage(
      image,
      x1, y1,
      width,
      height,
      0,
      0,
      width,
      height,
    );
  }

  const onImageChange = e => {
    const c = document.getElementById("canvas");
    const c2 = document.getElementById("canvas2");
    const ctx = c.getContext("2d");
    const ctx2 = c2.getContext("2d");
    cropToCanvas(e.target, c, ctx);
    console.log('1 crop', e.target)
    let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
    const input = tf.tidy(() => {
      return tf.image.resizeBilinear(tf.browser.fromPixels(c), [modelWidth, modelHeight])
        .div(255.0).expandDims(0);
    });
    model.executeAsync(input).then(res => {
      // Font options.
      console.log('2 model.executeAsync', res)
      const font = "16px sans-serif";
      ctx.font = font;
      ctx.textBaseline = "top";

      const [boxes, scores, classes, valid_detections] = res;
      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();
      const valid_detections_data = valid_detections.dataSync()[0];

      console.log('3 datas')
      console.log('boxes_data: ', boxes_data)
      console.log('scores_data: ', scores_data)
      console.log('classes_data: ', classes_data)
      console.log('valid_detections_data: ', valid_detections_data)
      console.log('---------------')
      tf.dispose(res)
      var i;
      for (i = 0; i < valid_detections_data; ++i) {

        console.log('3 for',)
        let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);



        // cropImage(c, c2, ctx2, [x1, y1, x2, y2]);




        x1 *= c.width;
        x2 *= c.width;
        y1 *= c.height;
        y2 *= c.height;
        const width = x2 - x1;
        const height = y2 - y1;
        const klass = names[classes_data[i]];
        const score = scores_data[i].toFixed(2);

        // Draw the bounding box.
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 1;
        ctx.strokeRect(x1, y1, width, height);
        setMeterText(klass + " : " + score)



        ctx2.drawImage(
          c,
          x1, y1,
          width,
          height,
          0,
          0,
          width,
          height,
        );


        // // Draw the label background.
        // ctx.fillStyle = "#00FFFF";
        // const textWidth = ctx.measureText(klass + " : " + score).width;
        // const textHeight = parseInt(font, 10); // base 10
        // ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);

      }
      // for (i = 0; i < valid_detections_data; ++i){
      //   let [x1, y1, , ] = boxes_data.slice(i * 4, (i + 1) * 4);
      //   x1 *= c.width;
      //   y1 *= c.height;
      //   const klass = names[classes_data[i]];
      //   const score = scores_data[i].toFixed(2);

      //   // Draw the text last to ensure it's on top.
      //   ctx.fillStyle = "#000000";
      //   ctx.fillText(klass + " : " + score, x1, y1);

      // }
    });
  };

  return (
    <Row justify="center">
      {model ? (
        <>
          {image ? (
            <>
              <Col>
                <img
                  alt="upload preview"
                  onLoad={onImageChange}
                  className="Dropzone-img"
                  src={image}
                />
              </Col>
              <Col>
                <canvas id="canvas" className="Dropzone-img" />
                <p>{meterText}</p>
              </Col>
              <Col>
                <canvas id="canvas2" />
              </Col>
            </>) : ''}
        </>
      ) : (
        <div>Loading model...</div>
      )}
    </Row>
  );
}

export default MeterModel;
