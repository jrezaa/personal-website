"use client";
import {
  AllBroken,
  CreateBricks,
  MovePaddle,
  PaddleHit,
  PlayerStats,
  ResetBall,
  UpdateBallAndHandleCollisions,
} from "@/app/utils/util-functions";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import data, { BrickType, PlayerType } from "../app/games/brick-breaker/data";
import { Direction, SingleBrick } from "@/app/utils/util-classes";

export default function Board({
  playerNumber,
  playerObj,
  setPlayerObj,
  setGameOver,
  start,
  direction,
  orientation,
}: {
  playerNumber: number;
  playerObj: PlayerType;
  setPlayerObj: Dispatch<SetStateAction<PlayerType>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  start: boolean;
  direction: Direction;
  orientation: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bricks, setBricks] = useState<SingleBrick[]>([]);
  const { ballObj, paddleProps, brickObj, player } = data;
  const [ball, setBall] = useState(ballObj);
  const [brickSet, setBrickSet] = useState(false);
  const [paddle, setPaddle] = useState(paddleProps);
  const [velocity, setVelocity] = useState(0);
  const [brickPlacement, setBrickPlacement] = useState<BrickType>(brickObj);
  const ballRef = useRef(ball);
  const playerRef = useRef(playerObj);
  const paddleRef = useRef(paddle);
  const bricksRef = useRef(bricks);
  const brickSetRef = useRef(brickSet);
  const levelUpRef = useRef(false);
  const brickPlacementRef = useRef(brickPlacement);
  const keysPressedRef = useRef<{ [key: string]: boolean }>({});
  const orientationRef = useRef<number>(0);
  const directionRef = useRef<Direction>(Direction.None);
  const velRef = useRef<number>(0);
  // Sync refs with state
  useEffect(() => {
    orientationRef.current = orientation;
  }, [orientation]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    velRef.current = velocity;
  }, [velocity]);

  useEffect(() => {
    ballRef.current = ball;
  }, [ball]);
  useEffect(() => {
    bricksRef.current = bricks;
  }, [bricks]);

  useEffect(() => {
    brickSetRef.current = brickSet;
  }, [brickSet]);

  useEffect(() => {
    playerRef.current = playerObj;
  }, [playerObj]);

  useEffect(() => {
    brickPlacementRef.current = brickPlacement;
  }, [brickPlacement]);

  useEffect(() => {
    paddleRef.current = paddle;
  }, [paddle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    setPaddle((prev) => ({ ...prev, y: (canvas?.height || 40) - 30 }));

    const render = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let newBricks = CreateBricks(
          playerRef.current.level,
          bricksRef.current,
          canvas,
          brickPlacementRef.current,
          setBrickPlacement
        );
        if (!brickSetRef.current) {
          setBricks(newBricks);
          setBrickSet(true);
          levelUpRef.current = false;
        }
        // Draw bricks
        bricksRef.current.forEach((brick) => {
          if (!brick.broke) {
            brick.draw(ctx);
          }
        });
        PlayerStats(ctx, playerRef.current, canvas);
        if (playerRef.current.lives === 0) {
          setGameOver(true);
        }
        // Update ball position and handle collisions
        UpdateBallAndHandleCollisions(
          canvas,
          ctx,
          ballRef,
          setBall,
          bricksRef.current,
          setBricks,
          setPlayerObj
        );

        if (
          brickSetRef.current &&
          !levelUpRef.current &&
          AllBroken(bricksRef.current)
        ) {
          setPlayerObj((prev) => ({ ...prev, level: prev.level + 1 }));
          ResetBall(ballRef, setBall, paddleRef.current);
          brickPlacementRef.current.y = 50;
          levelUpRef.current = true;
          setBrickSet(() => {
            brickSetRef.current = false;
            return false;
          });
        }

        MovePaddle(ctx, canvas, paddleRef.current);
        handlePaddleMovement();
        PaddleHit(ballRef.current, setBall, paddleRef.current);
        requestAnimationFrame(render);
      }
    };

    start && render();

    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressedRef.current[event.key] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressedRef.current[event.key] = false;
    };

    // window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);

    return () => {
      // window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("keyup", handleKeyUp);
    };
  }, [player, start]);

  const handlePaddleMovement = () => {
    if (playerNumber === 1 || playerNumber === 2) {
      setPaddle((prev) => ({
        ...prev,
        x:
          prev.x +
          (directionRef.current === Direction.None
            ? 0
            : directionRef.current === Direction.Left
            ? 1
            : -1),
        orientation: orientationRef.current,
      }));
      // }
      // if (keysPressedRef.current["ArrowRight"]) {
      //   setPaddle((prev) => ({ ...prev, x: prev.x + paddle.speed }));
      // }
    }
    // else if (playerNumber === 2) {
    //   if (keysPressedRef.current["a"]) {
    //     setPaddle((prev) => ({ ...prev, x: prev.x - paddle.speed }));
    //   }
    //   if (keysPressedRef.current["d"]) {
    //     setPaddle((prev) => ({ ...prev, x: prev.x + paddle.speed }));
    //   }
    // }
  };

  return (
    <canvas
      ref={canvasRef}
      className="bg-[#134959] rounded"
      width={"800px"}
      height={"800px"}
    />
  );
}
