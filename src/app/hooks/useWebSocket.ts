import { useState, useRef, useEffect } from "react";

// Constants for encoding
const ORIENTATION_BITS = 10;
const ACCELERATION_BITS = 8;
const MAX_ORIENTATION = 360;
const MAX_ACCELERATION = 10.0;

// Function to encode orientation and acceleration into a single binary number
function encodePose(orientation: number, acceleration: number): number {
  const normalizedOrientation = Math.round(orientation + MAX_ORIENTATION); // Normalize to 0-720
  const normalizedAcceleration = Math.round(
    (acceleration + MAX_ACCELERATION) * 10
  ); // Normalize to 0-200

  // Combine them into a single number
  return (normalizedOrientation << ACCELERATION_BITS) | normalizedAcceleration;
}

// Function to decode the binary number back into orientation and acceleration
function decodePose(encodedPose: number): {
  orientation: number;
  acceleration: number;
} {
  const acceleration = (encodedPose & 0b11111111) / 10 - MAX_ACCELERATION; // Extract last 8 bits for acceleration
  const orientation = (encodedPose >> ACCELERATION_BITS) - MAX_ORIENTATION; // Extract remaining bits for orientation
  return { orientation, acceleration };
}

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const lastSentOrientation = useRef<number>(0);
  const lastSentAcceleration = useRef<number>(0);

  const [receivedOrientation, setReceivedOrientation] = useState<number>(0);
  const [receivedAcceleration, setReceivedAcceleration] = useState<number>(0);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(url);
    setWs(socket);

    socket.onmessage = (event) => {
      const encodedPose = parseInt(event.data);
      const { orientation, acceleration } = decodePose(encodedPose);
      setReceivedOrientation(orientation);
      setReceivedAcceleration(acceleration);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  // Function to send the pose data if it has changed
  const sendMessage = (orientation: number, acceleration: number) => {
    const roundedOrientation = Math.round(orientation);
    const roundedAcceleration = Math.round(acceleration * 10) / 10;

    // Only send if values have changed
    if (
      roundedOrientation !== lastSentOrientation.current ||
      roundedAcceleration !== lastSentAcceleration.current
    ) {
      lastSentOrientation.current = roundedOrientation;
      lastSentAcceleration.current = roundedAcceleration;

      const encodedPose = encodePose(roundedOrientation, roundedAcceleration);
      ws?.send(encodedPose.toString());
    }
  };

  return { sendMessage, receivedOrientation, receivedAcceleration };
};

export default useWebSocket;
