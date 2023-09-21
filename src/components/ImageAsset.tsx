import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";

function ImageAsset({
  width,
  src,
  defaultPosition,
  zIndex,
}: {
  width: number;
  src: string;
  defaultPosition: { x: number; y: number };
  zIndex: number;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [position, setPosition] = React.useState({
    x: defaultPosition.x,
    y: defaultPosition.y,
  });
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);

  const onMouseDown = useCallback(
    (event: TouchEvent) => {
      setDragging(true);
      console.log(event.touches);
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
    if (imageRef.current === null) return;
    imageRef.current.addEventListener("touchstart", onMouseDown, {
      passive: true,
    });
    imageRef.current.addEventListener("touchmove", onMouseMove, {
      passive: true,
    });
    imageRef.current.addEventListener("touchend", onMouseUp, {
      passive: true,
    });

    return () => {
      if (imageRef.current === null) return;
      imageRef.current.removeEventListener("touchstart", onMouseDown);
      imageRef.current.removeEventListener("touchmove", onMouseMove);
      imageRef.current.removeEventListener("touchend", onMouseUp);
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: zIndex,
      }}
    >
      <Image
        ref={imageRef}
        src={src}
        width={width}
        height={width}
        draggable={false}
        alt=""
      />
    </div>
  );
}

export default ImageAsset;
