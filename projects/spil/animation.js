window.addEventListener("load", sidenVises);

function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent = 5;
  let myFont = (widthScreen / 100) * myFontInProcent;
  document.querySelector("#score").style.fontSize = myFont + "px";
  document.querySelector("#vis_tid").style.fontSize = myFont + "px";
}

let myRand;
let point;
let livTilbage;

const kodben1 = document.querySelector("#kodben_container1");
const kodben2 = document.querySelector("#kodben_container2");
const gulerod1 = document.querySelector("#gulerod_container1");
const gulerod2 = document.querySelector("#gulerod_container2");
const chokolade1 = document.querySelector("#chokolade_container1");
const chokolade2 = document.querySelector("#chokolade_container2");

kodben1.addEventListener("mousedown", visDetteElement);
kodben2.addEventListener("mousedown", visDetteElement);
gulerod1.addEventListener("mousedown", visDetteElement);
gulerod2.addEventListener("mousedown", visDetteElement);
chokolade1.addEventListener("mousedown", visDetteElement);
chokolade2.addEventListener("mousedown", visDetteElement);

function visDetteElement() {
  console.log(this.firstElementChild);
}

function sidenVises() {
  console.log("sidenVises");

  windowResize();
  window.addEventListener("resize", windowResize);

  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");

  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");

  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startGame);
}

// Spillet går i gang
function startGame() {
  console.log("startGame");

  // Point
  point = 0;

  document.querySelector("#eric_sprite").classList.add("neutral_eric");

  //Skjul andre skærme

  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#start_knap").classList.add("hide");

  //Sætter start-tiden til 60 sekunder og udskriver tiden
  tid = 60;
  document.querySelector("#vis_tid").textContent = tid;

  //Går til funktionen startTimer
  startTimer();

  // Point
  document.querySelector("#score").textContent = point;

  // Liv
  livTilbage = 3;

  document.querySelector("#liv1").classList.remove("hide");
  document.querySelector("#liv2").classList.remove("hide");
  document.querySelector("#liv3").classList.remove("hide");

  //KODBEN1
  //position og delay
  kodben1.classList.add("pos1");
  myRand = Math.floor(Math.random() * 3) + 1;
  kodben1.classList.add("delay" + myRand);
  //falling
  kodben1.classList.add("falling");
  //stop falling
  kodben1.addEventListener("animationiteration", genstartKodben);
  //klik
  kodben1.addEventListener("mousedown", goodHandler);

  //KODBEN2
  //position og delay
  kodben2.classList.add("pos2");
  myRand = Math.floor(Math.random() * 3) + 1;
  kodben2.classList.add("delay" + myRand);
  //falling
  kodben2.classList.add("falling");
  //stop falling
  kodben2.addEventListener("animationiteration", genstartKodben);
  //klik
  kodben2.addEventListener("mousedown", goodHandler);

  //GULEROD1
  //position og delay
  gulerod1.classList.add("pos3");
  myRand = Math.floor(Math.random() * 3) + 1;
  gulerod1.classList.add("delay" + myRand);
  //falling
  gulerod1.classList.add("falling");
  //stop falling
  gulerod1.addEventListener("animationiteration", genstartGulerod);
  //klik
  gulerod1.addEventListener("mousedown", badHandler);

  //GULEROD2
  //position og delay
  gulerod2.classList.add("pos4");
  myRand = Math.floor(Math.random() * 3) + 1;
  gulerod2.classList.add("delay" + myRand);
  //falling
  gulerod2.classList.add("falling");
  //stop falling
  gulerod2.addEventListener("animationiteration", genstartGulerod);
  //klik
  gulerod2.addEventListener("mousedown", badHandler);

  //CHOKOLADE1
  //position og delay
  chokolade1.classList.add("pos5");
  myRand = Math.floor(Math.random() * 3) + 1;
  chokolade1.classList.add("delay" + myRand);
  //falling
  chokolade1.classList.add("falling");
  //stop falling
  chokolade1.addEventListener("animationiteration", genstartChokolade);
  //klik
  chokolade1.addEventListener("mousedown", deadHandler);

  //CHOKOLADE2
  //position og delay
  chokolade2.classList.add("pos6");
  myRand = Math.floor(Math.random() * 3) + 1;
  chokolade2.classList.add("delay" + myRand);
  //falling
  chokolade2.classList.add("falling");
  //stop falling
  chokolade2.addEventListener("animationiteration", genstartChokolade);
  //klik
  chokolade2.addEventListener("mousedown", deadHandler);
}

// Handler
function goodHandler() {
  console.log("goodHandler");
  console.log(this);

  this.classList.add("frys");
  this.firstElementChild.classList.add("zoom_in");
  point++;
  console.log("point");
  document.querySelector("#score").textContent = point;
  this.firstElementChild.addEventListener("animationend", genstartKodben);
  document.querySelector("#eric_sprite").classList = "";
  document.querySelector("#eric_sprite").classList.add("glad_eric");

  document.querySelector("#glad_lyd").volume = 0.5;
  document.querySelector("#glad_lyd").currentTime = 0;
  document.querySelector("#glad_lyd").play();
}

function badHandler() {
  console.log("badHandler");
  console.log(this);

  this.classList.add("frys");
  this.firstElementChild.classList.add("zoom_out");
  point--;
  console.log("point");
  document.querySelector("#score").textContent = point;
  this.firstElementChild.addEventListener("animationend", genstartGulerod);
  document.querySelector("#eric_sprite").classList = "";
  document.querySelector("#eric_sprite").classList.add("sur_eric");
  document.querySelector("#sur_lyd").volume = 0.5;
  document.querySelector("#sur_lyd").currentTime = 0;
  document.querySelector("#sur_lyd").play();
}

function deadHandler() {
  console.log("livTilbage");
  console.log(this);

  this.classList.add("frys");
  this.firstElementChild.classList.add("rotation");
  this.firstElementChild.addEventListener("animationend", genstartChokolade);
  document.querySelector("#eric_sprite").classList = "";
  document.querySelector("#eric_sprite").classList.add("opkast_eric");
  document.querySelector("#liv" + livTilbage).classList.add("hide");
  livTilbage--;

  document.querySelector("#opkast_lyd").volume = 0.5;
  document.querySelector("#opkast_lyd").currentTime = 0;
  document.querySelector("#opkast_lyd").play();

  if (livTilbage <= 0) {
    console.log("0 livTilbage");
    stopSpillet();
  }
}

// Genstart
function genstartKodben() {
  console.log(this);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("falling");
  this.addEventListener("mousedown", goodHandler);

  myRand = Math.floor(Math.random() * 6) + 1;
  console.log(myRand);
  this.classList.add("pos" + myRand);
}

function genstartGulerod() {
  console.log(this);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("falling");
  this.addEventListener("mousedown", badHandler);

  myRand = Math.floor(Math.random() * 6) + 1;
  console.log(myRand);
  this.classList.add("pos" + myRand);
}

function genstartChokolade() {
  console.log(this);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("falling");
  this.addEventListener("mousedown", deadHandler);

  myRand = Math.floor(Math.random() * 6) + 1;
  console.log(myRand);
  this.classList.add("pos" + myRand);
}

function startTimer() {
  console.log("startTimer");

  //Hvis der er tid tilbage, startes timeren som kalder funktionen udskrivTid() efter 1 sekund
  if (tid > 0) {
    minTimer = setTimeout(udskrivTid, 1000);
  }

  function udskrivTid() {
    console.log("udskrivTid");

    //Trækker 1 fra samlet tid (nedskriver tiden med 1 sekund)
    tid--;
    console.log("tid: " + tid);

    //Udskriver tiden til #vis_tid
    document.querySelector("#vis_tid").textContent = tid;

    //Hvis der er mere tid, sættes en ny timer i gang
    //Hvis der ikke er mere tid, så stoppes spillet
    if (tid > 0) {
      startTimer();
    } else {
      stopSpillet();
    }
  }
}

// Spillet stopper
function stopSpillet() {
  console.log("stopSpillet");

  //Stop alle animationer
  kodben1.classList = "";
  document.querySelector("#kodben_sprite1").classList = "";
  kodben2.classList = "";
  document.querySelector("#kodben_sprite2").classList = "";

  gulerod1.classList = "";
  document.querySelector("#gulerod_sprite1").classList = "";
  gulerod2.classList = "";
  document.querySelector("#gulerod_sprite2").classList = "";

  chokolade1.classList = "";
  document.querySelector("#chokolade_sprite1").classList = "";
  chokolade2.classList = "";
  document.querySelector("#chokolade_sprite2").classList = "";

  document.querySelector("#eric_sprite").classList = "";

  //Stop alle addEventListener
  kodben1.removeEventListener("mousedown", goodHandler);
  kodben2.removeEventListener("click", goodHandler);
  gulerod1.removeEventListener("click", badHandler);
  gulerod2.removeEventListener("click", badHandler);
  chokolade1.removeEventListener("click", deadHandler);
  chokolade2.removeEventListener("click", deadHandler);
  kodben1.removeEventListener("animationiteration", genstartKodben);
  kodben2.removeEventListener("animationiteration", genstartKodben);
  gulerod1.removeEventListener("animationiteration", genstartGulerod);
  gulerod2.removeEventListener("animationiteration", genstartGulerod);
  chokolade1.removeEventListener("animationiteration", genstartChokolade);
  chokolade2.removeEventListener("animationiteration", genstartChokolade);

  if (liv <= 0) {
    gameOver();
  } else if (point >= 5) {
    levelComplete();
  } else {
    gameOver();
  }
}

// Game over
function gameOver() {
  console.log("GAME OVER");

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");

  //Udskriv points

  document.querySelector("#game_over_points").textContent = " Your score " + point;

  //Klik på genstart1
  document.querySelector("#genstart1").classList.remove("hide");
  document.querySelector("#genstart1").addEventListener("click", startGame);
}

// You won
function levelComplete() {
  console.log("LEVEL COMPLETE");

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");

  //Udskriv points
  document.querySelector("#level_complete_points").textContent = " Your score " + point;

  //Klik på genstart2
  document.querySelector("#genstart2").classList.remove("hide");
  document.querySelector("#genstart2").addEventListener("click", startGame);
}
