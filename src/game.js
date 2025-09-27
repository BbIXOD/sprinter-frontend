import { floatingText } from "./floating_text.js";
import { k } from "./kaboom_provider.js";
import { scale } from "./scale.js";
import { Spawner } from "./spawner.js";

let score = 0;
const scoreLabel = k.add([k.text(score), pos(24, 24)]);

k.loadSprite("base", "sprites/human.png");
k.loadSprite("bomb", "sprites/bomb.png");

const minX = 30;
const maxX = k.width() - 30;
const minY = 30;
const maxY = k.height() - 30;

const rand = (min, max) => Math.random() * (max - min) + min;

const getRekt = (size) =>
  new k.Polygon([
    k.vec2(-size, size),
    k.vec2(size, size),
    k.vec2(size, -size),
    k.vec2(-size, -size),
  ]);

const spawnHuman = () => {
  const x = rand(minX, maxX);
  const y = rand(minY, maxY);
  const human = k.add([
    k.pos(x, y),
    k.anchor("center"),
    k.sprite("base"),
    k.scale(1),
    k.area(),
    "human",
  ]);

  scale(human, 1, 1.5, 3, () => {
    k.quit();
  });
};

const spawnBomb = () => {
  const x = rand(minX, maxX);
  const y = rand(minY, maxY);
  const bomb = k.add([
    k.pos(x, y),
    k.sprite("bomb"),
    k.scale(1),
    k.anchor("center"),
    k.area(),
    "bomb",
  ]);

  scale(bomb, 1, 1.5, 3, () => {});
};

k.onClick("human", (human) => {
  console.log("click");
  score++;
  scoreLabel.text = score;
  human.destroy();
  k.addKaboom(human.pos, { scale: 0.5, speed: 2 });
  floatingText("БРОК!", human.pos, k.color(255, 0, 0));
});

k.onClick("bomb", () => {
  k.quit();
});

new Spawner(3, 0.1, spawnHuman);
k.wait(5, () => new Spawner(6, 0.5, spawnBomb));
