"use client";
import useWebSocket from "@/app/hooks/useWebSocket";
import { Direction, WebSocketRawMessage } from "@/app/utils/util-classes";
import { ChangeEvent, use, useEffect, useState } from "react";

export default function ControlPage() {
  const { sendMessage, recievedUsers } = useWebSocket(
    "https://jeeflikebeef.duckdns.org/api/websocket/controller?isController=1"
  );
  const [orientation, setOrientation] = useState<number>(0);
  const [calibratedOrientation, setCalibratedOrientation] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>(Direction.None);

  const [isStarted, setIsStarted] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const [username, setUsername] = useState("");
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [player1Taken, setPlayer1Taken] = useState(false);
  const [player2Taken, setPlayer2Taken] = useState(false);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

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
      const wsMessage: WebSocketRawMessage = {
        PlayerNumber: isPlayer1 ? 0 : 1,
        Username: username,
        Type: "UPDATE",
        Orientation: orientation - calibratedOrientation,
        Direction: direction,
      };
      sendMessage(wsMessage);
    }, 1); // Adjust the interval if needed

    return () => {
      clearInterval(interval);
    };
  }, [orientation, direction, sendMessage]);

  useEffect(() => {
    userLogic(recievedUsers);
  }, [recievedUsers]);

  const userLogic = (users: User[]) => {
    for (let user of users) {
      if (user.playerNumber === 0) {
        setPlayer1Taken(true);
        setPlayer1Name(user.name);
      } else if (user.playerNumber === 1) {
        setPlayer2Taken(true);
        setPlayer2Name(user.name);
      }
    }
  };
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
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4"
      style={{ userSelect: "none", WebkitTouchCallout: "none" }}
    >
      {!isStarted ? (
        <div className="flex gap-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Enter Your Details
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                  placeholder="Enter your name"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="player"
                  className="block text-sm font-medium text-gray-700"
                >
                  Player
                </label>
                <div className="mt-2 flex items-center">
                  <button
                    disabled={player1Taken}
                    type="button"
                    className={`w-1/2 py-2 text-center font-semibold rounded-l-lg transition-all ${
                      isPlayer1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setIsPlayer1(true)}
                  >
                    Player 1
                  </button>
                  <button
                    disabled={player2Taken}
                    type="button"
                    className={`w-1/2 py-2 text-center font-semibold rounded-r-lg transition-all ${
                      !isPlayer1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setIsPlayer1(false)}
                  >
                    Player 2
                  </button>
                </div>
              </div>

              <button
                type="button"
                disabled={!username?.length}
                onClick={handleStart}
                className={`w-full text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md ${
                  !username?.length
                    ? "bg-gray-400"
                    : "bg-blue-500 border  hover:bg-blue-600 focus:outline-none focus:ring-2 hover:ring-blue-400 hover:ring-opacity-75 transition-all"
                }`}
              >
                Start
              </button>
            </div>
          </div>
          {player1Taken ||
            (player2Taken && (
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {player1Taken ? "Player 1:" : "Player 2:"}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="player"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Player
                    </label>
                    <div className="mt-2 flex items-center">
                      <button
                        disabled={player1Taken}
                        type="button"
                        className={`w-1/2 py-2 text-center font-semibold rounded-l-lg ${
                          isPlayer1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setIsPlayer1(true)}
                      >
                        Player 1
                      </button>
                      <button
                        disabled={player2Taken}
                        type="button"
                        className={`w-1/2 py-2 text-center font-semibold rounded-r-lg ${
                          !isPlayer1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setIsPlayer1(false)}
                      >
                        Player 2
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleStart}
                    className="w-full bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex-1 w-full flex">
            <div
              className="flex-1 bg-blue-500 flex items-center justify-center"
              onTouchStart={handleTouchStartLeft}
              onTouchEnd={handleTouchEnd}
            ></div>
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
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export type UserBody = {
  users: User[];
};

export type User = {
  name: string;
  userId: string;
  playerNumber: 0 | 1;
};
