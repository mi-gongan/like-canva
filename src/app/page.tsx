"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";

const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);

  const arra = [1, 2, 4, 5, 6, 7, 7, 8];

  const onButtonClick = useCallback(() => {
    console.log("ref", ref);
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        console.log("dataUrl", dataUrl);
        const link = document.createElement("a");
        link.download = "sdfsf.png";
        console.log("link", link);
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const onMouseDown = useCallback(
    (event: TouchEvent) => {
      if (event.target !== imageRef.current) {
        return;
      }
      setDragging(true);
      console.log("down");
      const touch = event.touches[0];
      setOffset({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    },
    [position.x, position.y]
  );

  const onMouseMove = useCallback(
    (event: TouchEvent) => {
      if (dragging) {
        console.log("drag");
        const touch = event.touches[0];
        setPosition({
          x: touch.clientX - offset.x,
          y: touch.clientY - offset.y,
        });
      }
    },
    [offset.x, offset.y, dragging]
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);

    return () => {
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return (
    <>
      <div
        ref={ref}
        style={{
          width: 700,
          height: 700,
          backgroundColor: "red",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
          }}
        >
          <Image
            src={"/images/10000.png"}
            alt=""
            width={500}
            height={500}
            ref={imageRef}
          />
        </div>
        sdfasfas
      </div>
      <br />
      <br />
      <br />
      <br />
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
};

export default App;
