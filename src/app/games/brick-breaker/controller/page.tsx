"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const SensorPage = () => {
  const [orientation, setOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationIncludingGravity, setAccelerationIncludingGravity] =
    useState({ x: 0, y: 0, z: 0 });
  const [rotationRate, setRotationRate] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [started, setStarted] = useState(false);

  const handleOrientation = (event: any) => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  };

  const handleMotion = (event: any) => {
    setAcceleration({
      x: event.acceleration.x,
      y: event.acceleration.y,
      z: event.acceleration.z,
    });
    setAccelerationIncludingGravity({
      x: event.accelerationIncludingGravity.x,
      y: event.accelerationIncludingGravity.y,
      z: event.accelerationIncludingGravity.z,
    });
    setRotationRate({
      alpha: event.rotationRate.alpha,
      beta: event.rotationRate.beta,
      gamma: event.rotationRate.gamma,
    });
  };

  const startListening = () => {
    if (!started) {
      window.addEventListener("deviceorientation", handleOrientation);
      window.addEventListener("devicemotion", handleMotion);
      setStarted(true);
    }
  };

  const stopListening = () => {
    if (started) {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);
      setStarted(false);
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [started]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sensor Data</h1>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={startListening}
          disabled={started}
        >
          Start
        </button>
        <button
          className={styles.button}
          onClick={stopListening}
          disabled={!started}
        >
          Stop
        </button>
      </div>
      <div className={styles.section}>
        <h2>Orientation</h2>
        <div className={styles.data}>
          Alpha: {orientation.alpha?.toFixed(2)}
        </div>
        <div className={styles.data}>Beta: {orientation.beta?.toFixed(2)}</div>
        <div className={styles.data}>
          Gamma: {orientation.gamma?.toFixed(2)}
        </div>
      </div>
      <div className={styles.section}>
        <h2>Acceleration</h2>
        <div className={styles.data}>X: {acceleration.x?.toFixed(2)}</div>
        <div className={styles.data}>Y: {acceleration.y?.toFixed(2)}</div>
        <div className={styles.data}>Z: {acceleration.z?.toFixed(2)}</div>
      </div>
      <div className={styles.section}>
        <h2>Acceleration Including Gravity</h2>
        <div className={styles.data}>
          X: {accelerationIncludingGravity.x?.toFixed(2)}
        </div>
        <div className={styles.data}>
          Y: {accelerationIncludingGravity.y?.toFixed(2)}
        </div>
        <div className={styles.data}>
          Z: {accelerationIncludingGravity.z?.toFixed(2)}
        </div>
      </div>
      <div className={styles.section}>
        <h2>Rotation Rate</h2>
        <div className={styles.data}>
          Alpha: {rotationRate.alpha?.toFixed(2)}
        </div>
        <div className={styles.data}>Beta: {rotationRate.beta?.toFixed(2)}</div>
        <div className={styles.data}>
          Gamma: {rotationRate.gamma?.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default SensorPage;
