"use client";
import useWebSocket from "@/app/hooks/useWebSocket";
import { Direction } from "@/app/utils/util-classes";
import { useEffect, useState } from "react";

export default function ControlPage() {
  const { sendMessage } = useWebSocket(
    "https://jeeflikebeef.duckdns.org/api/websocket/controller?isController=1"
  );
  const [orientation, setOrientation] = useState<number>(0);
  const [calibratedOrientation, setCalibratedOrientation] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>(Direction.None);

  const [isStarted, setIsStarted] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const handleStart = () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === "granted") {
            console.log("Permission granted");
            setPermissionGranted(true);
            setIsStarted(true);
          } else {
            alert("Permission denied. Unable to access motion data.");
          }
        })
        .catch(console.error);
    } else {
      console.log("Permission not required or not supported");
      setIsStarted(true);
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!isStarted || !permissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const zOrientation = event.beta || 0;
      setOrientation(zOrientation);
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isStarted, permissionGranted]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        "Sending message: ",
        orientation - calibratedOrientation,
        direction
      );
      sendMessage(orientation - calibratedOrientation, direction);
    }, 100); // Adjust the interval if needed

    return () => {
      clearInterval(interval);
    };
  }, [orientation, direction, sendMessage]);

  const handleTouchStartLeft = () => {
    setDirection(Direction.Left);
  };

  const handleTouchStartRight = () => {
    setDirection(Direction.Right);
  };

  const handleTouchEnd = () => {
    setDirection(Direction.None);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {!isStarted ? (
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Start
        </button>
      ) : (
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex-1 w-full flex">
            <div
              className="flex-1 bg-blue-500 flex items-center justify-center"
              onTouchStart={handleTouchStartLeft}
              onTouchEnd={handleTouchEnd}
            >
              <p className="text-white text-2xl">Left</p>
            </div>
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Device Orientation
                </h2>
                <p className="text-lg text-gray-800">
                  {(orientation - calibratedOrientation).toFixed(2)}°
                </p>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Direction
                </h2>
                <p className="text-lg  text-gray-800">
                  {direction === Direction.Left
                    ? "Left"
                    : direction === Direction.Right
                    ? "Right"
                    : "None"}
                </p>
                <button
                  onClick={() => {
                    setCalibratedOrientation(orientation);
                  }}
                  className="bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Calibrate
                </button>
              </div>
            </div>
            <div
              className="flex-1 bg-red-500 flex items-center justify-center"
              onTouchStart={handleTouchStartRight}
              onTouchEnd={handleTouchEnd}
            >
              <p className="text-white text-2xl">Right</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
