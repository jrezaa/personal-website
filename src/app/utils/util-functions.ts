import { Dispatch, SetStateAction } from "react";
import {
  BallType,
  BrickType,
  PaddleType,
  PlayerType,
} from "../games/brick-breaker/data";
import { Ball, Paddle, SingleBrick } from "./util-classes";
export function UpdateBallAndHandleCollisions(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  ballRef: React.MutableRefObject<BallType>,
  setBall: Dispatch<SetStateAction<BallType>>,
  bricks: SingleBrick[],
  setBricks: Dispatch<SetStateAction<SingleBrick[]>>,
  setPlayer: Dispatch<SetStateAction<PlayerType>>
) {
  const ballObj = ballRef.current;
  if (!ballObj) return;
  let newDx = ballObj.dx;
  let newDy = ballObj.dy;
  let newX = ballObj.x + ballObj.dx;
  let newY = ballObj.y + ballObj.dy;

  if (newY - ballObj.rad <= 0) {
    ballRef.current.dy *= -1;
    newY = ballObj.rad;
  }
  if (newY + ballObj.rad >= canvas.height) {
    ballRef.current.dy *= -1;
    newY = canvas.height - ballObj.rad;
    setPlayer((prev) => ({ ...prev, lives: prev.lives - 1 }));
  }
  if (newX - ballObj.rad <= 0) {
    newDx = Math.abs(ballObj.dx);
    newX = ballObj.rad;
  }
  if (newX + ballObj.rad >= canvas.width) {
    newDx = -Math.abs(ballObj.dx);
    newX = canvas.width - ballObj.rad;
  }
  for (let i = 0; i < bricks.length; i++) {
    if (!bricks[i].broke) {
      const brickCollision = BrickCollision(ballObj, bricks[i]);

      if (brickCollision.hit && !bricks[i].broke) {
        setPlayer((prev) => ({ ...prev, score: prev.score + 1 }));
        if (brickCollision.axis === "X") {
          newDx *= -1;
          newX += newDx; // Move the ball slightly away from the brick
        } else if (brickCollision.axis === "Y") {
          newDy *= -1;
          ballRef.current.dy = newDy;
          ballRef.current.y += newDy;
        }
        if (++bricks[i].hitNumber >= bricks[i].maxHealth) {
          setPlayer((prev) => ({ ...prev, score: prev.score + 5 }));
          bricks[i].broke = true;
        }
        setBricks([...bricks]); // Update the state to reflect the broken brick
        break;
      }
    }
  }
  setBall((prev) => ({ ...prev, dx: newDx, dy: newDy, x: newX, y: newY }));

  // Draw the ball
  let ball = new Ball(newX, newY, ballObj.rad);
  ball.draw(ctx);
}

export function MovePaddle(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  paddleProps: PaddleType
) {
  let paddle = new Paddle(
    paddleProps.x,
    canvas.height - 30,
    paddleProps.height,
    paddleProps.width
  );
  paddle.move(ctx);
  if (paddleProps.x <= 0) paddleProps.x = 0;
  else if (paddleProps.x + paddleProps.width >= canvas.width)
    paddleProps.x = canvas.width - paddleProps.width;
}

export function CreateBricks(
  level: number,
  bricks: SingleBrick[],
  canvas: HTMLCanvasElement,
  brickPlacement: BrickType,
  setBrickPlacement: Dispatch<SetStateAction<BrickType>>
) {
  let newBricks = [];
  const bricksPerRow = 8; // Number of bricks per row
  const brickWidth = (canvas.width - (bricksPerRow + 1)) / bricksPerRow;
  const brickHeight = brickPlacement.height; // Fixed height for each brick

  if (bricks.length >= bricksPerRow * level) {
    return bricks;
  }

  // Brick Formation here
  let x = brickWidth;
  let y = 60;

  for (let i = 0; i < bricksPerRow * level; i++) {
    let newBrick = new SingleBrick(
      x,
      y,
      brickWidth,
      brickHeight,
      brickPlacement.colors,
      2
    );
    newBricks.push(newBrick);

    x += brickWidth + 1; // Move to the next position
    if (x + brickWidth > canvas.width + 100) {
      x = brickWidth; // Reset x position and move to the next row
      y += brickHeight + 1; // Move to the next row
    }
  }

  // Update brick's x and y position for next creation
  setBrickPlacement((prev) => ({ ...prev, x, y }));
  return newBricks;
}

export default function BrickCollision(
  circle: BallType,
  rect: SingleBrick
): { hit: boolean; axis?: string } {
  const distX = Math.abs(circle.x - rect.x - rect.width / 2);
  const distY = Math.abs(circle.y - rect.y - rect.height / 2);

  if (distX > rect.width / 2 + circle.rad) {
    return { hit: false };
  }
  if (distY > rect.height / 2 + circle.rad) {
    return { hit: false };
  }

  if (distX <= rect.width / 2) {
    return { hit: true, axis: "Y" };
  }
  if (distY <= rect.height / 2) {
    return { hit: true, axis: "X" };
  }

  const dx = distX - rect.width / 2;
  const dy = distY - rect.height / 2;
  return { hit: dx * dx + dy * dy <= circle.rad * circle.rad, axis: "X" };
}

export function PaddleHit(
  ballObj: BallType,
  setBall: Dispatch<SetStateAction<BallType>>,
  paddleProps: PaddleType
) {
  const paddleHit =
    ballObj.x < paddleProps.x + paddleProps.width &&
    ballObj.x > paddleProps.x &&
    paddleProps.y < paddleProps.y + paddleProps.height &&
    ballObj.y + ballObj.rad > paddleProps.y - paddleProps.height / 2;
  if (paddleHit) {
    // CHECK WHERE THE ballObj HIT THE paddleProps
    let collidePoint = ballObj.x - (paddleProps.x + paddleProps.width / 2);

    // NORMALIZE THE VALUES
    collidePoint = collidePoint / (paddleProps.width / 2);

    // CALCULATE THE ANGLE OF THE ballObj
    let angle = (collidePoint * Math.PI) / 3;

    setBall((prev) => ({
      ...prev,
      dx: ballObj.speed * Math.sin(angle),
      dy: -ballObj.speed * Math.cos(angle),
    }));
  }
}

export function PlayerStats(
  ctx: CanvasRenderingContext2D,
  player: PlayerType,
  canvas: HTMLCanvasElement
) {
  // Name
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Name: ${player.name}`, 20, 30);

  // Lives
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  let gap = 0;
  for (let i = 0; i < player.lives; i++) {
    ctx.fillText("❤️", canvas.width / 2 - 260 + gap, 30);
    gap += 30;
  }

  // Score
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${player.score}`, canvas.width - 140, 30);
  ctx.fillText(`Level: ${player.level}`, canvas.width - 260, 30);
}

export function ResetBall(
  ballRef: React.MutableRefObject<BallType>,
  setBall: Dispatch<SetStateAction<BallType>>,
  paddleProps: PaddleType
) {
  const ballObj = ballRef.current;

  setBall((prev) => {
    const newBall = {
      ...prev,
      x: paddleProps.x,
      y: paddleProps.y - 80,
      dx: (ballObj.dx = 6 * (Math.random() * 2 - 1)),
      dy: (ballObj.dy = -6),
    };
    ballRef.current = newBall;
    return newBall;
  });
}

export function AllBroken(bricks: SingleBrick[]): boolean {
  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].broke === true) {
      total++;
    }
  }
  if (total === bricks.length && bricks.length !== 0) {
    return true;
  }
  return false;
}
