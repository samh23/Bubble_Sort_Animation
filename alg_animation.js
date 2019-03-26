var collection = document.getElementsByClassName('col');
var playButton = document.querySelector('.play');
var restartButton = document.querySelector('.restart');
var stopButton = document.querySelector('.stop');
var forwardButton = document.querySelector('.forward');
var newButton = document.querySelector('.new');
var arr = [];
var columns = [];
var queue = [];
var stack = [];

init();

function init(){
	for(var i = 0; i < collection.length; i++){
		columns.push(collection[i]);
	}
	generateColumns();
	bubblesort();
	setUpInteraction();
}

function setUpInteraction(){
	var pause;
	var index = 0;
	var disablePlay = false;

	playButton.addEventListener("click", function(){
		pause = false;
		if(!disablePlay){
			var play = setInterval(shift, 300);
		}	
		disablePlay = true;
		function shift(){
			if(queue && (index === queue.length || pause === true)){
				clearInterval(play);
				diablePlay = false;
			}
			else{
				//stack.push(queue[0]);
				queue[index++]();
			}
		}
	});

	forwardButton.addEventListener("click", function(){
		pause = true;
		disablePlay = false;
		if(queue && index < queue.length){
			//stack.push(queue[0]);
			queue[index++]();
		}
	});

	stopButton.addEventListener("click", function(){
		pause = true;
		disablePlay = false;
	});

	newButton.addEventListener("click", function(){
		pause = true;
		disablePlay = false;
		arr=[];
		queue = [];
		stack = [];
		index = 0;
		clearColors();
		generateColumns();
		bubblesort();
	});
}

function generateColumns(){
	for(var i = 0; i < columns.length; i++){
		var height = generateHeight();
		columns[i].style.height = height + "px";
		arr.push(height);
		if(i === 0){
			columns[i].style.left = "0px";
		} else {
			columns[i].style.left = (parseInt(columns[i-1].style.left) + 55) + "px";
		}
	}
}

function bubblesort() {
	for(let i = 0; i < arr.length; i++){
		if(i > 0){
			queue.push(function(){
				columns[columns.length - i - 1].style.background = "#11CCCC";
				columns[columns.length - i].style.background = "orange";
	        });
		}
		for(let j = 0; j < arr.length - i - 1; j++){
			if(j === 0){
					queue.push(function(){
	            		columns[j].style.background = "green";
	            		columns[j+1].style.background = "green";
	                });
	            } else {
					queue.push(function(){
	            		columns[j-1].style.background = "#11CCCC";
	            		columns[j+1].style.background = "green";
	                });
	            }
	        if(arr[j] > arr[j+1]){
				queue.push(function(){
	            	columns[j].style.left = (parseInt(columns[j].style.left) + 55) + "px";
	            	columns[j+1].style.left = (parseInt(columns[j+1].style.left) - 55) + "px";
	            	var temp = columns[j];
	            	columns[j] = columns[j+1];
	            	columns[j+1] = temp;
	            });
	            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
	        }
	    }
	}
}


function generateHeight() {
	return Math.floor((Math.random() * 300) + 1);
}

function clearColors() {
	for(var i = 0; i < columns.length; i++){
		columns[i].style.background = "#11CCCC";
	}
}


//SAME AS ABOVE BUT PUSHING OBJECTS (BEFORE I KNEW THE SAME COULD BE ACHIEVED USING 'LET' IN THE FOR LOOPS)
/*for(var i = 0; i < columns.length; i++){
	if(i > 0){
		queue.push({id: i, animate: function(){
			copy[copy.length - this.id - 1].classList.toggle('toggle');
			copy[copy.length - this.id].style.background = "orange";
        }});
	}
	for(var j = 0; j < columns.length - i - 1; j++){
		if(j === 0){
				queue.push({id: j, animate: function(){
            		copy[this.id].classList.toggle('toggle');
            		copy[this.id+1].classList.toggle('toggle');
                }});
            } else {
				queue.push({id: j, animate: function(){
            		copy[this.id-1].classList.toggle('toggle');
            		copy[this.id+1].classList.toggle('toggle');
                }});
            }
        if(parseInt(columns[j].style.height) > parseInt(columns[j+1].style.height)){
			queue.push({id: j, animate: function(){
            	copy[this.id].style.left = (parseInt(copy[this.id].style.left) + 55) + "px";
            	copy[this.id+1].style.left = (parseInt(copy[this.id+1].style.left) - 55) + "px";
            	var temp = copy[this.id];
            	copy[this.id] = copy[this.id + 1];
            	copy[this.id+1] = temp;
            }});
            var temp = columns[j];
            columns[j] = columns[j+1];
            columns[j+1] = temp;
        }
    }
}*/

//MAKE SURE ANIMATION WORKS BY STEPPING THROUGH WITH DEBUGGER
/*for(var i = 0; i < columns.length; i++){
	if(i > 0){
			columns[columns.length - i - 1].classList.toggle('toggle');
			columns[columns.length - i].style.background = "orange";
	}
	for(var j = 0; j < columns.length - i - 1; j++){
		if(j === 0){
            	columns[j].classList.toggle('toggle');
            	columns[j+1].classList.toggle('toggle');
            } else {
            	columns[j-1].classList.toggle('toggle');
            	columns[j+1].classList.toggle('toggle');
            }
        if(parseInt(columns[j].style.height) > parseInt(columns[j+1].style.height)){
            columns[j].style.left = (parseInt(columns[j].style.left) + 55) + "px";
            columns[j+1].style.left = (parseInt(columns[j+1].style.left) - 55) + "px";
            var temp = columns[j];
            columns[j] = columns[j+1];
            columns[j+1] = temp;
        }
    }
}*/

//MY IMPLEMENTATION OF BUBBLESORT

/*for(var i = 0; i < arr.length; i++) {
	for(var j = 0; j < arr.length - i - 1; j++) {
		if(arr[j] > arr[j+1]) {
			[arr[j], arr[j+1]] = [arr[j+1], arr[j]];
		}
	}
}*/

//BOOK IMPLEMENTATION OF BUBBLESSORT (JAVA)

/*public void bubblesort(Object[] data) {
for (int i = 0; i < data.length-1; i++)
for (int j = data.le  scngth-1; j > i; --j)
if (((Comparable)data[j]).compareTo(data[j-1]) < 0)
swap(data,j,j-1);
}*/
