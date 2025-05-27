import { useRef, useState } from "react";
import {
  FilesetResolver,
  ObjectDetector,
  Detection,
} from "@mediapipe/tasks-vision";
import test from "./assets/test.jpg";
import HightLights from "./components/HightLights";

export default function App() {
  const imgRef = useRef<HTMLImageElement>(null);
  const detectorRef = useRef<ObjectDetector | null>(null);
  const [detections, setDetections] = useState<Detection[] | null>(null);

  const loadModel = async () => {
    if (detectorRef.current) return;

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const detector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite",
        delegate: "GPU",
      },
      scoreThreshold: 0.5,
    });

    detectorRef.current = detector;
  };

  const handleDetect = async () => {
    await loadModel();

    const detector = detectorRef.current;
    const img = imgRef.current;

    if (detector && img) {
      const result = await detector.detect(img);
      setDetections(result.detections);
      console.log("one");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <img
          ref={imgRef}
          src={test}
          alt="dog"
          onClick={handleDetect}
          style={{ maxWidth: "50%", display: "block" }}
        />
        {detections ? (
          <HightLights detections={detections} imgRef={imgRef.current} />
        ) : null}
      </div>
    </div>
  );
}
