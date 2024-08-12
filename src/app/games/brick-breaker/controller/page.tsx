"use client";
import { useEffect, useState } from "react";

export default function ControlPage() {
  const [orientationData, setOrientationData] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const [motionData, setMotionData] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
    accelerationIncludingGravity: { x: 0, y: 0, z: 0 },
    rotationRate: { alpha: 0, beta: 0, gamma: 0 },
    interval: 0,
  });

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
      setOrientationData({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
    };

    const handleMotion = (event: DeviceMotionEvent) => {
      setMotionData({
        acceleration: {
          x: event.acceleration?.x ?? 0,
          y: event.acceleration?.y ?? 0,
          z: event.acceleration?.z ?? 0,
        },
        accelerationIncludingGravity: {
          x: event.accelerationIncludingGravity?.x ?? 0,
          y: event.accelerationIncludingGravity?.y ?? 0,
          z: event.accelerationIncludingGravity?.z ?? 0,
        },
        rotationRate: {
          alpha: event.rotationRate?.alpha ?? 0,
          beta: event.rotationRate?.beta ?? 0,
          gamma: event.rotationRate?.gamma ?? 0,
        },
        interval: event.interval,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [isStarted, permissionGranted]);

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
              <p className="text-lg">{orientationData.alpha.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Beta (X axis):</p>
              <p className="text-lg">{orientationData.beta.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Gamma (Y axis):</p>
              <p className="text-lg">{orientationData.gamma.toFixed(2)}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">
            Device Motion
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium">Acceleration (X):</p>
              <p className="text-lg">{motionData.acceleration.x.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Acceleration (Y):</p>
              <p className="text-lg">{motionData.acceleration.y.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Acceleration (Z):</p>
              <p className="text-lg">{motionData.acceleration.z.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Acceleration with Gravity (X):</p>
              <p className="text-lg">
                {motionData.accelerationIncludingGravity.x.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-medium">Acceleration with Gravity (Y):</p>
              <p className="text-lg">
                {motionData.accelerationIncludingGravity.y.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-medium">Acceleration with Gravity (Z):</p>
              <p className="text-lg">
                {motionData.accelerationIncludingGravity.z.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-medium">Rotation Rate Alpha:</p>
              <p className="text-lg">
                {motionData.rotationRate.alpha.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-medium">Rotation Rate Beta:</p>
              <p className="text-lg">
                {motionData.rotationRate.beta.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-medium">Rotation Rate Gamma:</p>
              <p className="text-lg">
                {motionData.rotationRate.gamma.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Interval: {motionData.interval.toFixed(2)} ms
          </p>
        </div>
      )}
    </div>
  );
}
