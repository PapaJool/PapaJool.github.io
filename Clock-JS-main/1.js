setInterval(Clock,500);                                  // часы
 
var idSec = document.getElementById("sec");
var idMin = document.getElementById("min");
var idHour = document.getElementById("hour");
var date = new Date();
var sec = date.getSeconds();
    function Clock(){
    idSec.style.transform = 'rotate('+ 6 * date.getSeconds() +'deg)';
    idMin.style.transform = 'rotate('+ 6 * date.getMinutes() +'deg)';
    idHour.style.transform = 'rotate('+ 30 * date.getHours() +'deg)';
    sec = date.getSeconds();
    date = new Date();
    
    if ((sec <= 15 && sec >= 0) || (sec <= 60 && sec >= 45)) 
    {
       document.querySelector("#adtime").style.opacity = "1";
       
    } 
    else 
    {
        document.querySelector("#adtime").style.opacity = "0";
    }
    console.log(sec);
}


