/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ballObj: {
    x: 20,
    y: 200,
    dx: 5,
    dy: 5,
    rad: 10,
    speed: 5,
  },
  brickObj: {
    x: 0.5,
    y: 50,
    width: 800 / 10 - 1,
    height: 20,
    density: 2,
    colors: ["blue", "lightblue"],
  },
  player: {
    name: "Jeff",
    lives: 5,
    score: 0,
    level: 1,
  },
  paddleProps: {
    height: 10,
    width: 100,
    x: 100,
    y: 10,
    orientation: 0,
    dx: 5,
    speed: 2,
    color: "orange",
  },
};

export type BallType = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rad: number;
  speed: number;
};

export type BrickType = {
  x: number;
  y: number;
  width: number;
  height: number;
  density: number;
  colors: string[];
};

export type PlayerType = {
  name: string;
  lives: number;
  score: number;
  level: number;
};

export type PaddleType = {
  height: number;
  width: number;
  x: number;
  y: number;
  orientation: number;
  color: string;
  dx: number;
  speed: number;
};
