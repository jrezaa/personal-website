"use client";
import useWebSocket from "@/app/hooks/useWebSocket";
import { useEffect, useState } from "react";

export default function ControlPage() {
  const { sendMessage } = useWebSocket(
    "https://jeeflikebeef.duckdns.org/api/websocket/controller?isController=1"
  );
  const [orientation, setOrientation] = useState<number>(0);
  const [calibrateOrientation, setCalibrateOrientation] = useState<number>(0);
  const [acceleration, setAcceleration] = useState<number>(0);

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
            setPermissionGranted(true);
            setIsStarted(true);
          } else {
            alert("Permission denied. Unable to access motion data.");
          }
        })
        .catch(console.error);
    } else {
      setIsStarted(true);
    }
  };

  useEffect(() => {
    if (!isStarted || !permissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const zOrientation = event.beta || 0;
      setOrientation(zOrientation);
    };

    const handleMotion = (event: DeviceMotionEvent) => {
      const yAcceleration = event.acceleration?.y ?? 0;
      setAcceleration(yAcceleration);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [isStarted, permissionGranted]);

  useEffect(() => {
    const interval = setInterval(() => {
      sendMessage(orientation - calibrateOrientation, acceleration);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [orientation, acceleration, sendMessage]);
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
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Device Orientation
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium">Alpha (Z axis):</p>
              <p className="text-lg">{orientation.toFixed(2)}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">
            Device Motion
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium">Acceleration (X):</p>
              <p className="text-lg">{acceleration.toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setCalibrateOrientation(orientation);
            }}
            className="bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Calibrate
          </button>
        </div>
      )}
    </div>
  );
}
