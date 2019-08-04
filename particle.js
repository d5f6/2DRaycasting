class Particle {
  constructor() {
    this.fov = 45
    this.pos = createVector(sceneW / 2, sceneH / 2)
    this.rays = []
    this.heading = 0

    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)))
    }
  }

  updateFOV(fov) {
    this.fov = fov
    this.rays = []
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a) + this.heading))
    }
  }

  rotate(angle) {
    this.heading += angle
    let index = 0
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading)
      index++
    }
  }

  move(amount) {
    const velocity = p5.Vector.fromAngle(this.heading)
    velocity.setMag(amount)
    this.pos.add(velocity)
  }

  update(x, y) {
    this.pos.set(x, y)
  }

  look(walls) {
    const scene = []
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i]
      let closest = null
      let record = Infinity
      for (let wall of walls) {
        const pt = ray.cast(wall)
        if (pt) {
          let distance = p5.Vector.dist(this.pos, pt)
          let a = ray.dir.heading() - this.heading
          if (!mouseIsPressed) {
            distance *= cos(a)
          }
          if (distance < record) {
            record = distance
            closest = pt
          }
        }
      }
      if (closest) {
        stroke(255, 100)
        line(this.pos.x, this.pos.y, closest.x, closest.y)
      } 
      scene[i] = record
    }
    return scene
  }

  show() {
    fill(255)
    ellipse(this.pos.x, this.pos.y, 4)

    for (let ray of this.rays) {
      ray.show()
    }
  }
}
