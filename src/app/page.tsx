"use client";

import React, { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import ImageAsset from "@/components/ImageAsset";

const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [imageArray, setImageArray] = useState<
    {
      id: number;
      width: number;
      src: string;
      position: { x: number; y: number };
      zIndex: number;
    }[]
  >([
    {
      id: 5,
      width: 50,
      src: "/images/10000.png",
      position: { x: 0, y: 0 },
      zIndex: 5,
    },
    {
      id: 6,
      width: 100,
      src: "/images/10000.png",
      position: { x: 100, y: 200 },
      zIndex: 2,
    },
    {
      id: 7,
      width: 200,
      src: "/images/10000.png",
      position: { x: 50, y: 100 },
      zIndex: 3,
    },
    {
      id: 8,
      width: 300,
      src: "/images/10000.png",
      position: { x: 200, y: 50 },
      zIndex: 1,
    },
  ]);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "sdfsf.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <>
      <div
        ref={ref}
        style={{
          width: 700,
          height: 700,
          backgroundColor: "green",
          position: "relative",
        }}
      >
        {imageArray.map((image, index) => (
          <ImageAsset
            key={index}
            width={image.width}
            src={image.src}
            defaultPosition={image.position}
            zIndex={image.zIndex}
          />
        ))}
      </div>
      <br />
      <br />
      <div>zoom in out</div>
      <div
        onClick={() => {
          setImageArray((prev) => {
            return prev.map((image) => {
              return {
                ...image,
                width: image.width + 10,
              };
            });
          });
        }}
      >
        +
      </div>
      <div
        onClick={() => {
          setImageArray((prev) => {
            return prev.map((image) => {
              return {
                ...image,
                width: image.width - 10,
              };
            });
          });
        }}
      >
        -
      </div>
      <br />
      <br />
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
};

export default App;
