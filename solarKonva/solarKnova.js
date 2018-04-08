var stageContainer = document.getElementById('container');//container element in which rectangles and square are drawn.
var rectForm = document.querySelector('.rectForm'); // rectangle input form.
var circleForm = document.querySelector('.circleForm'); // circle input form
var btnCircle = document.querySelector('#btnCircle'); //button which activates the circle form

//height and width of container.
var width = window.innerWidth;
var height = window.innerHeight;

//creating stage where all the shapes will be drawn.
    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });

//layer to which shapes are added.
    var layer = new Konva.Layer();

//group in which recatngle and sqaures are added.
    var rectGroup = new Konva.Group();

//group in which circle will be added.
    var circleGroup = new Konva.Group({draggable:true});

//variables which will be used through out the program.
    var flag=0;var str;var rect;var circd;var circle;var rectangle;var drawn=0;
    
//function which displays the rectangle form onclick.
    function fetchRect(event){
            rectForm.style.display ='inline';
    }
//function displays the circle form onclick.
    function fetchCircle(event){
        event.preventDefault();
        circleForm.style.display='inline';
    }

//function activated on rectangle form submission.
    function drawRect(event){
        event.preventDefault();
        rect=true; //sets true in order to draw rectangle only once.
        btnCircle.style.display = 'inline-block'; //draw circle button is displayed.
    }

//function activated on circle form submission.
    function drawCircle(event){
        event.preventDefault();
        circd=true; // sets true in order to draw circle only once.
    }

//when click in blank white space shapes are drawn.
    stageContainer.onclick=(e)=>{
      // if rectangle form is submitted then rectangle is drawn.
      if(rect){
        str=stage.getPointerPosition();//get the current mouse position
        
        //recatngle varible which stores all the value of rectangle for future ref.
        rectangle = new Konva.Rect({ 
            x:str.x,//set to current mouse position.
            y:str.y,
            width:rectForm.elements[0].value,//values taken from form.
            height:rectForm.elements[1].value,
            stroke:'red',
            strokeWidth:1
             });
                rectGroup.add(rectangle); //rectangle added to a group
                layer.add(rectGroup); //group added to layer.
                stage.add(layer); //layer added to stage.
                rect=false; // set to false so rectangle can't be redrawn.
            }
        // if rectangle form is submitted then rectangle is drawn.
      else if(circd){
        str=stage.getPointerPosition();
        //circle varible which stores all the value of circle for future ref.
        circle = new Konva.Circle({
        x:str.x,//set to current mouse position.
        y:str.y,
        radius:circleForm.elements[0].value,//values taken from form.
        stroke: 'green',fill:'white',
        strokeWidth: 1
        });
            circleGroup.add(circle);//rectangle added to a group
            layer.add(circleGroup);//group added to layer
            stage.add(layer);
            circd=false; //set to false so circle can't be redrawn. 
        }
    }

    // function which activates on drag and use to draw the squares.
    function drawSquare(){
        if(flag==1){
                rectGroup.add(rectangle);
                layer.add(rectGroup);
                stage.add(layer);

                // coordinates for sqaure (+10) for spacing.
                var ax = rectangle.attrs.x + 10; 
                var ay = rectangle.attrs.y + 10;

                // ref of rectangle height and width.
                var tempHeight = rectangle.getHeight(); 
                var tempWidth = rectangle.getWidth();
                
                //loops for drawing sqaures to full height and wdith including spaces(+10)
                while(tempHeight>=30){
                         while(tempWidth>=30 ){
                                //checkCoords called to check for point inside circle
                                if(checkCoords(ax,ay)==1){
                                    var square = new Konva.Rect({
                                        x:ax,y:ay,
                                        height:10,width:10,//height and width of sqaure 
                                        fill:'black'
                                        });
                                        rectGroup.add(square);//added to same group to which recangle belongs.
                                        layer.add(rectGroup);
                                        stage.add(layer);
                                        }
                                     ax = ax+20;
                                     tempWidth -=20; 
                                    }
                    ay+=20;ax=rectangle.attrs.x+10;
                    tempWidth = rectangle.getWidth();
                    tempHeight -=20;
                    }
                drawn = 1;
            }
            else{//called on drag start and recreates square every time.
                if(drawn==1){
                    rectGroup.destroyChildren();
                    }
                }
}
function checkCoords(ax,ay){console.log('circle:',circle.attrs.x,circle.attrs.y);
    var roots = Math.sqrt(Math.pow((circle.attrs.x-ax),2)+Math.pow((circle.attrs.y-ay),2));
    if(roots>circle.attrs.radius)
        {roots = Math.sqrt(Math.pow((circle.attrs.x-(ax+10)),2)+Math.pow((circle.attrs.y-ay),2));//console.log('roots1',roots);
        if(roots>circle.attrs.radius)
            {roots = Math.sqrt(Math.pow((circle.attrs.x-ax),2)+Math.pow((circle.attrs.y-(ay+10)),2));//console.log('roots2',roots);
            if(roots>circle.attrs.radius)
                {roots = Math.sqrt(Math.pow((circle.attrs.x-(ax+10)),2)+Math.pow((circle.attrs.y-(ay+10)),2))//;console.log('roots3',roots);
                if(roots>circle.attrs.radius)
                    return 1;
                }
            }
        }
        
        return 0;
     } 

//events actiavted on drag of circle.

circleGroup.on('dragstart',()=>{
    flag=0;
    drawSquare();
})
circleGroup.on('dragend',(event)=>{
    circle.attrs.x=stage.getPointerPosition().x; //circle position set to current mouse position.
    circle.attrs.y=stage.getPointerPosition().y;
    flag=1;
    drawSquare();
})
