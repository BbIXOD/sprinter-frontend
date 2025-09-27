import { k } from "./kaboom_provider.js";

const lerp = (a, b, t) => a + (b - a) * t;

export const scale = (obj, start, end, duration, callback) => {
  let elapsed = 0;
  console.log(obj.scale);
  obj.scaleTo(start);

  obj.onUpdate(() => {
    elapsed += k.dt(); // accumulate time
    let t = Math.min(elapsed / duration, 1);
    
    obj.scaleTo(lerp(start, end, t));

    if (t >= 1) {
      obj.destroy();
      if (callback) callback();
    }
  });
};
