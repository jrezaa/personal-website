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
      // iOS 13+ requires explicit permission request
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
      // Non-iOS or older versions
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
    <div style={{ padding: "20px" }}>
      {!isStarted ? (
        <button
          onClick={handleStart}
          style={{ fontSize: "20px", padding: "10px" }}
        >
          Start
        </button>
      ) : (
        <div>
          <h2>Device Orientation</h2>
          <p>Alpha (Z axis): {orientationData.alpha.toFixed(2)}</p>
          <p>Beta (X axis): {orientationData.beta.toFixed(2)}</p>
          <p>Gamma (Y axis): {orientationData.gamma.toFixed(2)}</p>

          <h2>Device Motion</h2>
          <p>
            Acceleration (X): {motionData.acceleration.x.toFixed(2)} <br />
            Acceleration (Y): {motionData.acceleration.y.toFixed(2)} <br />
            Acceleration (Z): {motionData.acceleration.z.toFixed(2)}
          </p>
          <p>
            Acceleration with Gravity (X):{" "}
            {motionData.accelerationIncludingGravity.x.toFixed(2)} <br />
            Acceleration with Gravity (Y):{" "}
            {motionData.accelerationIncludingGravity.y.toFixed(2)} <br />
            Acceleration with Gravity (Z):{" "}
            {motionData.accelerationIncludingGravity.z.toFixed(2)}
          </p>
          <p>
            Rotation Rate Alpha: {motionData.rotationRate.alpha.toFixed(2)}{" "}
            <br />
            Rotation Rate Beta: {motionData.rotationRate.beta.toFixed(2)} <br />
            Rotation Rate Gamma: {motionData.rotationRate.gamma.toFixed(2)}
          </p>
          <p>Interval: {motionData.interval.toFixed(2)} ms</p>
        </div>
      )}
    </div>
  );
}
