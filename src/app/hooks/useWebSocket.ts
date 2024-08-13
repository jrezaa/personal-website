import { useState, useRef, useEffect } from "react";
import { Direction } from "../utils/util-classes";

// Constants for encoding
const ORIENTATION_BITS = 10;
const DIRECTION_BITS = 2; // 2 bits to represent 3 directions (left, right, none)
const MAX_ORIENTATION = 360;

// Enum for direction

// Function to encode orientation and direction into a single binary number
function encodePose(orientation: number, direction: Direction): number {
  const normalizedOrientation = Math.round(orientation + MAX_ORIENTATION); // Normalize to 0-720

  // Combine them into a single number
  return (normalizedOrientation << DIRECTION_BITS) | direction;
}

// Function to decode the binary number back into orientation and direction
function decodePose(encodedPose: number): {
  orientation: number;
  direction: Direction;
} {
  const direction = encodedPose & 0b11; // Extract last 2 bits for direction
  const orientation = (encodedPose >> DIRECTION_BITS) - MAX_ORIENTATION; // Extract remaining bits for orientation
  return { orientation, direction: direction as Direction };
}

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const lastSentOrientation = useRef<number>(0);
  const lastSentDirection = useRef<Direction>(Direction.None);

  const [receivedOrientation, setReceivedOrientation] = useState<number>(0);
  const [receivedDirection, setReceivedDirection] = useState<Direction>(
    Direction.None
  );

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(url);
    setWs(socket);

    socket.onmessage = (event) => {
      const encodedPose = parseInt(event.data);
      const { orientation, direction } = decodePose(encodedPose);
      setReceivedOrientation(orientation);
      setReceivedDirection(direction);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  // Function to send the pose data if it has changed
  const sendMessage = (orientation: number, direction: Direction) => {
    const roundedOrientation = Math.round(orientation);

    // Only send if values have changed
    if (
      roundedOrientation !== lastSentOrientation.current ||
      direction !== lastSentDirection.current
    ) {
      lastSentOrientation.current = roundedOrientation;
      lastSentDirection.current = direction;

      const encodedPose = encodePose(roundedOrientation, direction);
      ws?.send(encodedPose.toString());
    }
  };

  return { sendMessage, receivedOrientation, receivedDirection };
};

export default useWebSocket;
