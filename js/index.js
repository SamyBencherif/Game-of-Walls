//These settings are configurable
var ObstructionSeed = "Witty!"
var ObstructionPercentage = 40

var w = 500
var h = 500

var px = 0
var py = 0
var ox = 0
var oy = 0

var wallCount = 0
var invertedH = []
var invertedV = []

var OnewayCount = 0
var invertedHW = []
var invertedVW = []

function setup() {
  createCanvas(w, h)
    /* position: absolute;
     top: 50%;
     left: 50%;*/
}

function keyPressed() {
  //y forward
  //x back

  //Invertable Wall Colliders
  //var leftWall = poll(w/2-15-30*px, h/2+15-30*py, ObstructionSeed, ObstructionPercentage) != invertedV.contains([w/2-15-30*px, h/2+15-30*py])
  //var rightWall = poll(w/2+15-30*px, h/2+15-30*py, ObstructionSeed, ObstructionPercentage) != invertedV.contains([w/2+15-30*px, h/2+15-30*py])
  //var bottomWall = poll(h/2+15-30*py, w/2-15-30*px, ObstructionSeed, ObstructionPercentage) != invertedH.contains([h/2+15-30*py, w/2-15-30*px])
  //var topWall = poll(h/2-15-30*py, w/2-15-30*px, ObstructionSeed, ObstructionPercentage) != invertedH.contains([h/2-15-30*py, w/2-15-30*px])

  //One Way Wall Colliders
  //leftWall = leftWall || (poll(w/2-15-30*px, h/2+15-30*py, ObstructionSeed+"w", ObstructionPercentage/4) && poll(w/2-15-30*px, h/2+15-30*py,ObstructionSeed+"wd",50))
  //add respective polls arguments to direction poll
  //rightWall = rightWall || (poll(w/2+15-30*px, h/2+15-30*py, ObstructionSeed+"w", ObstructionPercentage/4) && !poll(w/2+15-30*px, h/2+15-30*py,ObstructionSeed+"wd",50))
  //bottomWall = bottomWall || (poll(h/2+15-30*py, w/2-15-30*px, ObstructionSeed+"w", ObstructionPercentage/4) && !poll(h/2+15-30*py, w/2-15-30*px,ObstructionSeed+"wd",50))
  //topWall = topWall || (poll(h/2-15-30*py, w/2-15-30*px, ObstructionSeed+"w", ObstructionPercentage/4) && poll(h/2-15-30*py, w/2-15-30*px,ObstructionSeed+"wd",50))

  //Added arrow key support for Sydney
  var moveUp = keyCode == 38 //|| key=="W"
  var moveLeft = keyCode == 37 //|| key=="S"
  var moveDown = keyCode == 40 //|| key=="A"
  var moveRight = keyCode == 39 //|| key=="D"

  var invertUp = key == "W"
  var invertDown = key == "S"
  var invertLeft = key == "A"
  var invertRight = key == "D"

  var IC = []
  var HAxis = false;

  if (invertUp)
    IC = [h / 2 - 15 - 30 * py, w / 2 - 15 - 30 * px]
  if (invertDown)
    IC = [h / 2 + 15 - 30 * py, w / 2 - 15 - 30 * px]
  if (invertLeft)
    IC = [w / 2 - 15 - 30 * px, h / 2 + 15 - 30 * py]
  if (invertRight)
    IC = [w / 2 + 15 - 30 * px, h / 2 + 15 - 30 * py]

  HAxis = invertUp || invertDown

  //console.log(wallCount)

  var Wall
  var direction = true//(moveRight || moveDown) ? !poll(IC[0], IC[1], ObstructionSeed + "wd", 50) : poll(IC[0], IC[1], ObstructionSeed + "wd", 50)
  
  if (HAxis) {
    Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) != invertedH.contains(IC)
    var BWall = ((poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && direction) && !invertedH.contains(IC))
    //Wall = Wall || BWall
    if (!IC.equals([]) && (Wall || wallCount > 0)) {
      if (invertedH.contains(IC))
        invertedH.splice(invertedH.indexOf(IC), 1) //uninvert
      else if (!(BWall && !Wall))
        invertedH.push(IC) //invert
    }
  } else {
    Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) != invertedV.contains(IC)
    var BWall = ((poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && direction) && !invertedV.contains(IC))
    //Wall = Wall || BWall
    if (!IC.equals([]) && (Wall || wallCount > 0)) {
      if (invertedV.contains(IC))
        invertedV.splice(invertedV.indexOf(IC), 1) //uninvert
      else if (!(BWall && !Wall))
        invertedV.push(IC) //invert
    }
  }
  if (!IC.equals([])) {
    if (Wall)
      wallCount++
      else if (wallCount && !(BWall && !Wall))
        wallCount--
  }

  if (moveUp)
    IC = [h / 2 - 15 - 30 * py, w / 2 - 15 - 30 * px]
  else if (moveDown)
    IC = [h / 2 + 15 - 30 * py, w / 2 - 15 - 30 * px]
  else if (moveLeft)
    IC = [w / 2 - 15 - 30 * px, h / 2 + 15 - 30 * py]
  else if (moveRight)
    IC = [w / 2 + 15 - 30 * px, h / 2 + 15 - 30 * py]
  else
    IC = []

  direction = (moveRight || moveDown) ? !poll(IC[0], IC[1], ObstructionSeed + "wd", 50) : poll(IC[0], IC[1], ObstructionSeed + "wd", 50)
  HAxis = moveUp || moveDown
  var InvertD = moveDown || moveRight

  if (!IC.equals([])) {
    if (HAxis) {
      Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) != invertedH.contains(IC)
      Wall = Wall || ((poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && direction) && !invertedH.contains(IC))
    } else {
      Wall = poll(IC[0], IC[1], ObstructionSeed, ObstructionPercentage) != invertedV.contains(IC)
      Wall = Wall || ((poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && direction) && !invertedV.contains(IC))
    }
    //Wall = Wall || (poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4) && InvertD != poll(IC[0], IC[1], ObstructionSeed + "wd", 50))

  } else {
    Wall = false;
  }

  //console.log([(poll(IC[0], IC[1], ObstructionSeed + "w", ObstructionPercentage / 4), poll(IC[0], IC[1], ObstructionSeed + "wd", 50))])

  //shortened
  /*
  if (invertUp && (topWall || wallCount>0))
    {
      if (invertedH.contains([h/2-15-30*py, w/2-15-30*px]))
        invertedH.splice(invertedH.indexOf([h/2-15-30*py, w/2-15-30*px]),1) //uninvert
      else
        invertedH.push([h/2-15-30*py, w/2-15-30*px]) //invert
        
      if (topWall)
         wallCount++
      else
        wallCount--
    }
  if (invertDown && (bottomWall || wallCount>0))
    {
      if (invertedH.contains([h/2+15-30*py, w/2-15-30*px]))
        invertedH.splice(invertedH.indexOf([h/2+15-30*py, w/2-15-30*px]),1)
      else
        invertedH.push([h/2+15-30*py, w/2-15-30*px])
        
      if (bottomWall)
         wallCount++
      else
        wallCount--  
    }
  if (invertLeft && (leftWall || wallCount>0))
    {
      if (invertedV.contains([w/2-15-30*px, h/2+15-30*py]))
        invertedV.splice(invertedV.indexOf([w/2-15-30*px, h/2+15-30*py]),1)
      else
        invertedV.push([w/2-15-30*px, h/2+15-30*py])
      if (leftWall)
         wallCount++
      else
        wallCount--
    }
  if (invertRight && (rightWall || wallCount>0))
    {
      if (invertedV.contains([w/2+15-30*px, h/2+15-30*py]))
        invertedV.splice(invertedV.indexOf([w/2+15-30*px, h/2+15-30*py]),1)
      else
        invertedV.push([w/2+15-30*px, h/2+15-30*py])
      if (rightWall)
         wallCount++
      else
        wallCount--
    }*/

  if (moveUp && !Wall) {
    py += 1
    oy = -30
  } else if (moveLeft && !Wall) {
    px += 1
    ox = -30
  } else if (moveDown && !Wall) {
    py -= 1
    oy = 30
  } else if (moveRight && !Wall) {
    px -= 1
    ox = 30
  }

}

function poll(x, y, seed, percentage) {
  if (seed == undefined) {
    seed = "Witty!"
  }
  if (percentage == undefined) {
    percentage = 40
  }
  return (~"0123456789abcdef".substring(0, 16 * percentage / 100).indexOf(md5(x + " " + y + " " + seed)[0])) != 0
}

function draw() {
  background(107, 0, 110)
  stroke(255, 255, 255)
  strokeWeight(3)
  ellipse(w / 2, h / 2, 10, 10)
  
  for (var i=0; i<wallCount; i++)
    {
      line(10+10*i,h-10,10+10*i,h-20)
    }
  
  for (var x = -(w % 30) - 15; x <= w; x += 30) {
    for (var y = -(h % 30) - 15; y <= h; y += 30) {
      //x -= px
      //y -= py

      //Math.Floor(((w/2)-(-(w%30)-15))/30)
      var alpha = 255 - (abs(x - w / 2) + abs(y - h / 2))
      stroke(255, 255, 255, alpha)

      //Vertical Field
      if (poll(x - 30 * px, y - 30 * py, ObstructionSeed, ObstructionPercentage) != invertedV.contains([x - 30 * px, y - 30 * py]))
        line(x + ox, y + oy, x + ox, y - 27 + oy)
      else if (poll(x - 30 * px, y - 30 * py, ObstructionSeed + "w", ObstructionPercentage / 4) && !invertedV.contains([x - 30 * px, y - 30 * py])) {
        var d = -1 + 2 * poll(x - 30 * px, y - 30 * py, ObstructionSeed + "wd", 50)
        stroke(0, 56, 204, alpha)
        line(x + ox, y + oy, x + ox + 5 * d, y - 27 / 2 + oy)
        line(x + ox + 5 * d, y - 27 / 2 + oy, x + ox, y - 27 + oy)
      }

      stroke(255, 255, 255, 255 - (abs(x - w / 2) + abs(y - h / 2)))
        //Horizontal Field
      if (poll(y - 30 * py, x - 30 * px, ObstructionSeed, ObstructionPercentage) != invertedH.contains([y - 30 * py, x - 30 * px]))
        line(x + ox, y + oy, x + ox + 28, y + oy)
      else if (poll(y - 30 * py, x - 30 * px, ObstructionSeed + "w", ObstructionPercentage / 4) && !invertedH.contains([y - 30 * py, x - 30 * px])) {
        var d = -1 + 2 * poll(y - 30 * py, x - 30 * px, ObstructionSeed + "wd", 50)
        stroke(0, 56, 204, alpha)
        line(x + ox, y + oy, x + ox + 28 / 2, y + oy + 5 * d)
        line(x + ox + 28 / 2, y + oy + 5 * d, x + ox + 28, y + oy)
      }
    }
  }

  if (oy != 0) {
    if (oy > 0)
      oy -= 6
    if (oy < 0)
      oy += 6
  } else {
    if (ox > 0)
      ox -= 6
    if (ox < 0)
      ox += 6
  }
}

// Allow inversion of blue walls in seperate inversion cache. Display inversion caches and have picker