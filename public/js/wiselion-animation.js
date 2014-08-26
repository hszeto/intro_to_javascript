/**
 * Created by protocol on 8/25/14.
 */

//The amount of segment points we want to create
var amount = 5;

//The maximum height of the wave
var height = 60;

//Create a new path and style it:
var path  = new Path({
    //80% black:
    strokeColor: [0.8],
    strokeWidth: 30,
    strokeCap: 'square'
});

//Add 5 segments points to the path spread out over the width of the view:
for (var i = 0; i <= amount; i++){

    path.add(new Point(i / amount, 1) * view.size);
}

//Select the path, so we can see how it is constructed:
path.selected = true;

function onFrame(event){
    //Loop through the segments of the path:
    for (var i=0; i <= amount; i++){
        var segment = path.segments[i];

        //A cyclic value between -1 and 1
        var sinus  = Math.sin(event.time * 3 + i);

        //Change the y position of the segment point:
        segment.point.y = sinus * height + 100;
    }

    //Uncomment the following line and run the script again to smooth the path

}