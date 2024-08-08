export class Ball {
  constructor(public x: number, public y: number, public rad: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
  }
}

export class Paddle {
  colors = ["red", "#FFA62B"];
  broke = false;
  constructor(
    public x: number,
    public y: number,
    public height: number,
    public width: number
  ) {}

  move(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.broke ? "white" : this.colors[1];
    ctx.strokeStyle = this.broke ? "white" : "red";
    ctx.lineWidth = 1;
    ctx.fillStyle = this.broke ? "white" : this.colors[1];
    ctx.shadowBlur = 0;
    ctx.shadowColor = "blue";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}

export class SingleBrick {
  public broke = false;
  public hitNumber = 0;
  public x: number;
  constructor(
    x: number,
    public y: number,
    public width: number,
    public height: number,
    public colors: string[],
    public maxHealth: number
  ) {
    this.x = x - this.width;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.hitNumber >= this.maxHealth) this.broke = true;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.broke
      ? "rgba(19, 73, 89, 0)"
      : this.colors[this.hitNumber];
    ctx.strokeStyle = this.broke ? "rgba(19, 73, 89, 0)" : "transparent";
    ctx.fill();
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
