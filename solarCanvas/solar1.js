const form = document.querySelector('form'); // selects the form element from html.
var canvas = document.querySelector('canvas'); // selects the canvas element from html.
const formCircle = document.querySelector('.circle'); // circle form
const draw = document.querySelector('.draw'); // button which onclick draws the sqaure.
const heading = document.querySelector('.heading'); //heading guidelines.
const headingSquare = document.querySelector('.headingSquare'); //heading guidelines.
const headingCircle = document.querySelector('.headingCircle'); //heading guidelines.
//canvas height and width.
canvas.height= (window.innerHeight)-110;
canvas.width= window.innerWidth;

// diff context for diff shapes.
var ctx = canvas.getContext('2d');//for circle
var ctx1 = canvas.getContext('2d');//for  bigger square/rectangle
var ctx2 = canvas.getContext('2d');//for smaller sqaure

// initialisation of variables.
var rectangle = {
	height : 0,
	width : 0,
	x : 0,
	y : 0
};
var circle = {
	radius : 0,
	x : 0,
	y: 0
};
var flag =0;

// called on submission of rectangle form
function init(event){
	event.preventDefault();

	// retrieve the value from form
	rectangle.height = form.elements[0].value; 
	rectangle.width = form.elements[1].value;

	// guideline display.
	heading.style.display="inline-block";

}
//called on submission of circle form.
function drawCircle(event){
	event.preventDefault();
	circle.radius = formCircle.elements[0].value;
	headingCircle.style.display="inline";
}

// draws the shapes onclick in white area/canvas area.
canvas.onclick = (e)=>{
	var bound = canvas.getBoundingClientRect();
	if(flag==0){
		//coordiantes set on mouse click.at mouse position.
		rectangle.x = e.clientX - bound.left;
		rectangle.y = e.clientY - bound.top;
		ctx1.strokeStyle = "blue";
		//draws rectangle based on value.
		ctx1.strokeRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
		//displays the circle form
		formCircle.style.display='block';
		flag=1; // only once recatngle can be drawn and next circle can be drawn.
	}
	else if(flag==1){
		circle.x = e.clientX - bound.left;
		circle.y = e.clientY - bound.top;
		ctx.strokeStyle = 'green';
		ctx.fillStyle = 'white';
		// draws circle based on values.
		ctx.beginPath();
		ctx.arc(circle.x,circle.y,circle.radius,0,Math.PI*2,false);
		ctx.fill();ctx.stroke();
		// draw square buutton displayed.
		draw.style.display='inline';
		flag=2;
	}
}
// function which draws the square on button click 'Draw Sqaure'
function drawSquare(){
	headingSquare.style.display="inline";
	//coordinates of sqaure (+1) spacing.
	var ax = rectangle.x + 1;
	var ay = rectangle.y + 1;
	var tempHeight = rectangle.height;
	var tempWidth = rectangle.width;
	ctx2.fillStyle="black";
	//loops to ensure sqaures are drawn to full height and width.
	while(tempHeight>=3){
		while(tempWidth>=3){
			// to check point lies inside circle.
			if(checkCoords(ax,ay)==1)
				ctx2.fillRect(ax,ay,1,1);
			ax = ax+2;
			tempWidth -=2; 
			}
			ay+=2;ax=rectangle.x+1;
			tempWidth = rectangle.width;
			tempHeight -=2;
		}
	}

function checkCoords(ax,ay){
	var roots = Math.sqrt(Math.pow((circle.x-ax),2)+Math.pow((circle.y-ay),2));
	if(roots>circle.radius)
		{roots = Math.sqrt(Math.pow((circle.x-(ax+10)),2)+Math.pow((circle.y-ay),2));
		if(roots>circle.radius)
			{roots = Math.sqrt(Math.pow((circle.x-ax),2)+Math.pow((circle.y-(ay+10)),2));
			if(roots>circle.radius)
				{roots = Math.sqrt(Math.pow((circle.x-(ax+10)),2)+Math.pow((circle.y-(ay+10)),2));
				if(roots>circle.radius)
					return 1;
				}
			}
		}
	
	 	return 0;
	 } 
