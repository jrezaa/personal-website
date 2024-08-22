import { useState, useRef, useEffect } from "react";
import {
  Direction,
  WebSocketInboundMessage,
  WebSocketOutboundMessage,
  WebSocketRawMessage,
} from "../utils/util-classes";
import { User } from "../games/brick-breaker/controller/page";

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
  const lastSentOrientation1 = useRef<number>(0);
  const lastSentOrientation2 = useRef<number>(0);
  const lastSentDirection1 = useRef<Direction>(Direction.None);
  const lastSentDirection2 = useRef<Direction>(Direction.None);
  const [recievedUsers, setReceivedUsers] = useState<User[]>([] as User[]);

  const [receivedOrientation1, setReceivedOrientation2] = useState<number>(0);
  const [receivedOrientation2, setReceivedOrientation1] = useState<number>(0);
  const [receivedDirection1, setReceivedDirection1] = useState<Direction>(
    Direction.None
  );
  const [receivedDirection2, setReceivedDirection2] = useState<Direction>(
    Direction.None
  );

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(url);
    setWs(socket);

    socket.onmessage = (event) => {
      const data = event.data as WebSocketInboundMessage;
      switch (data.Type) {
        case "JOIN":
          if (data.Users)
            setReceivedUsers((prev) => {
              return [...prev, ...data.Users!];
            });
          break;
        case "UPDATE":
          if (!data.Pose) break;
          const encodedPose = parseInt(data.Pose);
          const { orientation, direction } = decodePose(encodedPose);

          if (data.PlayerNumber === 0) {
            setReceivedOrientation1(orientation);
            setReceivedDirection1(direction);
          } else if (data.PlayerNumber === 1) {
            setReceivedOrientation2(orientation);
            setReceivedDirection2(direction);
          }
          break;
        case "GETUSERS":
          if (!data.Users) break;
          setReceivedUsers(data.Users);
          break;
      }
    };

    return () => {
      socket.close();
    };
  }, [url]);

  // Function to send the pose data if it has changed
  const sendMessage = (message: WebSocketRawMessage) => {
    // Only send if values have changed

    let wsMessage: WebSocketOutboundMessage = {
      Type: message.Type,
    };
    switch (message.Type) {
      case "JOIN":
        wsMessage.Username = message.Username;
        wsMessage.PlayerNumber = message.PlayerNumber;
        break;
      case "UPDATE":
        if (!message.Orientation || !message.Direction) break;
        const roundedOrientation = Math.round(message.Orientation);
        const encodedPose = encodePose(roundedOrientation, message.Direction);
        if (samePose(roundedOrientation, message.Direction)) return;
        if (message.PlayerNumber === 0) {
          lastSentOrientation1.current = roundedOrientation;
          lastSentDirection1.current = message.Direction;
        } else if (message.PlayerNumber === 1) {
          lastSentOrientation2.current = roundedOrientation;
          lastSentDirection2.current = message.Direction;
        }

        wsMessage.Pose = encodedPose;
      case "GETUSERS":
        break;
    }
    function samePose(currOrientation: number, currDirection: number): boolean {
      return (
        (message.PlayerNumber === 0 &&
          currOrientation === lastSentOrientation1.current &&
          currDirection === lastSentDirection1.current) ||
        (message.PlayerNumber === 1 &&
          currOrientation === lastSentOrientation2.current &&
          currDirection === lastSentDirection2.current)
      );
    }
    if (ws?.readyState === ws?.CONNECTING) {
      setTimeout(() => {
        ws?.send(JSON.stringify(wsMessage));
      }, 100);
    } else ws?.send(JSON.stringify(wsMessage));
  };

  return {
    sendMessage,
    receivedOrientation1,
    receivedDirection1,
    receivedOrientation2,
    receivedDirection2,
    recievedUsers,
  };
};

export default useWebSocket;
