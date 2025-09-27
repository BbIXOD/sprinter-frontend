import { k } from "./kaboom_provider.js";

export class Spawner {
  constructor(spawnTime, timeDecrease, callback) {
    this.spawnTime = spawnTime
    this.timeDecrease = timeDecrease
    this.callback = callback
    this.active = true
    this._loop()
  }

  _loop() {
    if (!this.active) return
    this.callback()
    const nextTime = Math.max(this.spawnTime - this.timeDecrease, this.timeDecrease)
    k.wait(nextTime, () => {
      this.spawnTime = nextTime
      this._loop()
    })
  }

  stop() {
    this.active = false
  }

  reset(time) {
    this.spawnTime = time
    if (!this.active) {
      this.active = true
      this._loop()
    }
  }
}
