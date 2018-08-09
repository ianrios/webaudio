function myFunction() {
    document.getElementById("test").innerHTML = "UDP server running on port: ";
}
function mouseDown() {
    //document.getElementById("status").innerHTML = "click";
    var message = new OSC.Message('/nething/pad/trig', 1);
    osc.send(message);
}
function mouseUp() {
    //document.getElementById("status").innerHTML = "release";
    var message = new OSC.Message('/nething/pad/trig', 0.0);
    osc.send(message);
}
const status = osc.status();
document.getElementById("status").innerHTML = osc.status();
