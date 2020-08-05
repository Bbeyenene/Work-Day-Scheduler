$(document).ready(function(){
    myHeaderTime();
    eventColor();
    myStorage();
    saveChangeButtons();
  });

function myHeaderTime() {
    //the header todays time format
    var today = moment().format('dddd, ');
    var date = moment().format('ll,');
    //incrementing seconds every second interval
    setInterval(function() {
        var time = moment();
        $('#currentDay').text(today + " " + date + " " + time.format('hh:mm:ss A'));
    }, 100);
}

function eventColor () { 
    //each textarea given that id number compared to current time style it past, present or future.
    var currentTime =  parseInt( moment().hour());
    //console.log(currentTime);
    $(".form-control").each(function () {
        var eventTime = parseInt($(this).attr("id"));
        if (currentTime > eventTime) {
            $(this).addClass("past");
        } else if (currentTime  < eventTime) {
            $(this).addClass("future");
        } else {
            $(this).addClass("present");
        }
    });
}

function myStorage() {
    //creating var called element local storage for every hours input
    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        //console.log(element);
        if(element){
            //basically parse that input as element and assign it the that id 
            $('#' + element).val(JSON.parse(localStorage.getItem(element)));
        }
    }
} 

function saveChangeButtons () {
    var userInput;
    var hourSpan1;
    //every save button saves its sibling textareas input into the localStorage
    $(".saveBtn").on("click", function(){
        userInput = $(this).siblings(".form-control").val().trim();
        // console.log(userInput);
        hourSpan1 = $(this).siblings('textarea').attr('id');
        //console.log(hourSpan1);
        localStorage.setItem(hourSpan1, JSON.stringify(userInput));
    })
    $("#clearDay").on("click", function(e){
        //clearing day event if confirming yes.
        if (localStorage.length>0) {
            var clear = confirm("Press OK if you want to clear today's events?");
            if(clear){
                localStorage.clear();
            }
        }
    })

}