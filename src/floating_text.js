import { k } from "./kaboom_provider.js";

export function floatingText(message, pos, color = k.color(255, 255, 255)) {
  const txt = k.add([
    k.text(message, { size: 30, textAlign: "center"}),
    k.pos(pos),
    color,
    k.opacity(1),
    {
      life: 1,   // seconds before auto-destroy
      speed: -90 // px per second upwards
    },
    "floatingText"
  ]);

  txt.onUpdate(() => {
    txt.move(0, txt.speed);
    txt.opacity -= k.dt() / txt.life;
    if (txt.opacity <= 0) {
      txt.destroy();
    }
  });

  return txt;
}
