/*goal- cycle through randomly generated versions ( simple line / geometric): hair, eyes, mouth(simple ellipses varied in size), maybe like neo-tribal kind of art
*/

//mimicked some code from an AI powered google search, used to generate the arrays that hold the sin wave values, other than that all work is original!

//offset values
var xoff = 0;
var yoff = 0;

//custom variables for circle size and rgb values
var c = 10;
var g = 255;
var r = 255;
var smileStart;
var smileStop;

//sine wave variables to be customized etc
let xspacing = 8; //disctance bt pts on wave
let w; // width of wave
let theta = 0.0; // starting ang
let amplitude = 50.0; //height of wav
let period = 500;
let dx; // value to incr angel for each pt
let yvalues; //array to store y values of wav
let thetaRate = 0.02;

let hairColor = 'deeppink';
let xCirc, vR, cSize;
let xSpeed = 0.1;
let thickness = 1;

let trailBlend, clearBlend;
let fadeModes; //array to store blend modes to be cycled through!
let currentBlendModeIndex = 9;
 // array to store blend mode values



function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width - windowWidth/2; // set width
  dx =  (TWO_PI/ period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
    background(0);
  fadeModes = [BLEND, //0
                ADD, //1
                DARKEST, //2 
                LIGHTEST, //3
                EXCLUSION, //4
                MULTIPLY, //5
                SCREEN, //6
                REPLACE, //7
                REMOVE, //8
                DIFFERENCE, //9 
                OVERLAY, //10
                HARD_LIGHT, //11
                SOFT_LIGHT,  //12
                DODGE, //13
                BURN,  //14
               NORMAL]; //15

  trailBlend = fadeModes[currentBlendModeIndex];
  clearBlend = fadeModes[11];

  smileStart=0;
  smileStop = PI;
}

function draw() {
  
  //interaction instructions
  noStroke();
  fill(255);
  textSize(16)
  textFont('courier');
  text("h3ll0... wElc0mE t0 tH3 C4nvAS...", 15, 50);
  text("Interaction: ", 15, 75);
  text("press 'H' key - HAIR", 15, 100);
  text("E: EyEs o___0 ", 15, 125);
  text("S: SAD :(", 15, 150);
  text("SPACE BAR: =)", 15, 175)
  text("F: randomize fade effects", 15, 200)

  //custom functions to be called and associated variables:
  calcWave(); // calc yvalues for wave
  renderWave(); //draw wave to canvas
  theta += thetaRate; // increment theta for animation (adjusts 'speed' of pink hairs)
  
  
  //maps noise generator to width of screen for symmetric 'trails' animation
  noiseDetail(4,0.1) //sets octave & falloff of noise operator
  var x = map(noise(xoff), 0, 1, 0, width);
  xoff += 0.02;
    
  var y= map(noise(yoff), 0, 1, 0, height)
  yoff += 0.005;
  
  blendMode(trailBlend);
   stroke(r,r-64,0);
    fill(g);
  
  //draw four circles in symmetrical self-reflection
  //(trails effect thru noise)
  circle(x, y, c);
  circle(y, x, c)
  circle(width-x, height-y, c)
  circle(width-y, height-x, c)
  
  //size of circle incremented gradually up until 60pt (see below for statement)
  c+=0.1;
  
  //rgb value of stroke is being incremented and offset by 64 in the red and green channels
  g++;
  r--;
  for(let z=0; z<height; z++){
    
  }
 if (c>60){
   c=0;
  
 }
  if(g>266){
    g=0;
  }
  if(r<-10){
    r=260;
  }

  
  //fade effect
  blendMode(clearBlend);
  stroke(0);
  fill(70, 70, 40, 5);
  rectMode(CENTER);
  square(windowWidth/2, windowHeight/2, windowWidth-20);
  
  
  
  
  //INTERACTION CODE HERE
fill('khaki')
  rect(110,height-69, 200, 50 );
    stroke(0);
  text('period: '+ (int(period*100))/100, 45, height-75);
  text('theta: '+ (int(theta*1000))/1000, 45, height-50);
  //EDIT HAIR
   if (keyIsPressed === true){

 }  
  
  //SMILE
  noFill();
  stroke(255);
  strokeWeight(4)
   arc(width/2, height - 200, 260, 200, smileStart, smileStop);
}

function calcWave(){
  let x = theta; //start w current angle
  for (let i = 0; i < yvalues.length; i++){
    //calc y-value using sine, amp, and current x ''[angle]''
    yvalues[i] = sin(x) * amplitude;
    x += dx; // move to next x-position in the wave
  }
}

function renderWave( ) {
  noStroke(); // no outline for points
  fill(hairColor); //set fill color ;)*/
  //draws 'hair wave' from stored arrayed values of generated sin waves
  for (let x=0; x < yvalues.length; x++) {
    ellipse(x * xspacing+windowWidth/2-windowWidth/4, height / 2-200 + yvalues[x], 2*thickness, 128*thickness) // this changes 'thickness' of hair
    //halving the height centers the wave vertically
  }
}


//key presses, interaction goes here ie. H, E, F and S / Space keys.
function keyReleased(){

  //H hair
     if(keyCode === 72){
 period = random(50, 700);
 thetaRate= random(0.01, 0.09);
    
    dx =  (TWO_PI/ period) * xspacing;
   }
   
   //E Eyes 0______0
   if(keyCode === 69){
     fill(random(255),random(255), 0)
     strokeWeight(random(1, 6));
     stroke(255);
     //left eye
   ellipse(width/2 + 100, height/2-50, 10+random(5,120), 50+random(50));
     // right eye
        ellipse(width/2 - 100, height/2-50, 10+random(5,160), 50+random(15, 100));
    }
  

    //S SAD :(
   if(keyCode === 83){
     smileStart=PI;
     smileStop = 0;
     
   }

   //SPace Happy =)
     if(keyCode === 32){
     smileStart=0;
     smileStop = PI;
     
   }
  

   //F fade effects ( use at your own risk!)
       if(keyCode === 70){
                 fill(255);
                 rect( 80, height/2, 400, 40);
        fill(0);
         textSize(16);
    trailBlend = fadeModes[random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])];
  text(`trailsFade: ${getBlendModeName(trailBlend)}`, 40, height/2);
         
    clearBlend = fadeModes[random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])];
            textSize(16);
  text(`clear filter mode: ${getBlendModeName(clearBlend)}`, 40, height/2+20);
   }

         
   

}

//custom helper function to convert blend modes from array into strings to output IE FEEDBACK
function getBlendModeName(mode) {
  switch (mode) {
    case BLEND: return "BLEND";
    case ADD: return "ADD";
    case DARKEST: return "DARKEST";
    case LIGHTEST: return "LIGHTEST";
    case DIFFERENCE: return "DIFFERENCE";
    case EXCLUSION: return "EXCLUSION";
    case MULTIPLY: return "MULTIPLY";
    case SCREEN: return "SCREEN";
    case REPLACE: return "REPLACE";
    case OVERLAY: return "OVERLAY";
    case HARD_LIGHT: return "HARD_LIGHT";
    case SOFT_LIGHT: return "SOFT_LIGHT";
    case DODGE: return "DODGE";
    case BURN: return "BURN";
    case NORMAL: return "NORMAL";
    default: return "UNKNOWN";
  }
}

