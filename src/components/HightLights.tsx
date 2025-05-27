import React from "react";
import { Detection } from "@mediapipe/tasks-vision";

type Props = {
  detections: Detection[];
  imgRef: HTMLImageElement | null;
};

const HightLights = ({ detections, imgRef }: Props) => {
  if (!detections.length || !imgRef) return null;

  return (
    <>
      {detections.map((detection, index) => {
        const box = detection.boundingBox;
        const score = detection.categories?.[0]?.score ?? 0;
        const label = detection.categories?.[0]?.categoryName ?? "Object";

        if (!box) return null;

        const ratioX = imgRef.width / imgRef.naturalWidth;
        const ratioY = imgRef.height / imgRef.naturalHeight;

        const left = box.originX * ratioX;
        const top = box.originY * ratioY;
        const width = box.width * ratioX;
        const height = box.height * ratioY;

        return (
          <React.Fragment key={index}>
            <div
              style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: "2px solid #003cff",
                backgroundColor: "rgba(0, 51, 255, 0.2)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top - 20}px`,
                width: `${width - 4}px`,
                color: "#fff",
                fontSize: "14px",
                backgroundColor: "#003cff",
                padding: "2px 4px",
                pointerEvents: "none",
              }}
            >
              {label} — {Math.round(score * 100)}% confidence
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default HightLights;
