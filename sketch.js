let walls = []
let ray
let particle
let xoff = 0
let yoff = 10000

const sceneW = 400
const sceneH = 400

function setup() {
  var canvas = createCanvas(800, 400)
  canvas.parent('canvas')

  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW)
    let x2 = random(sceneW)
    let y1 = random(sceneH)
    let y2 = random(sceneH)
    walls[i] = new Boundary(x1, y1, x2, y2)
  }

  walls.push(new Boundary(0, 0, sceneW, 0))
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH))
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH))
  walls.push(new Boundary(0, sceneH, 0, 0))

  particle = new Particle()
}

function draw() {
  background(0)

  if (keyIsDown(65)) {
    particle.rotate(-0.10)
  } else if (keyIsDown(68)) {
    particle.rotate(0.10)
  }

  for (let wall of walls) {
    wall.show()
  }
  // particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH)
  particle.update(mouseX, mouseY)
  particle.show()
  const scene = particle.look(walls)

  xoff += 0.01
  yoff += 0.01

  push()
  translate(sceneW, 0)
  const w = sceneW / scene.length
  for (let i = 0; i < scene.length; i++) {
    noStroke()
    const b = map(scene[i], 0, sceneW, 255, 0)
    const h = map(scene[i], 0, sceneW, sceneH, 0)
    fill(b)
    rectMode(CENTER)
    rect(i * w + w / 2, sceneH / 2, w, h)
  }
  pop()
  // ray.show()
  // ray.lookAt(mouseX, mouseY)

  // let pt = ray.cast(wall)
  // if (pt) {
  //   fill(255)
  //   ellipse(pt.x, pt.y, 8, 8)
  // }
}