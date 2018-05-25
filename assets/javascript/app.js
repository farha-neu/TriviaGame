var questions = [
    {question:"What is the name of the acid that is used to corrosively dispose of Walter's victims?",
     options:["Hydrochloric Acid","Hydrofluoric Acid","Hydrochloride","Sulphuric Acid"],
     correctAnswer:"Hydrofluoric Acid",
     url: "1.png"
    },
    {question:"What was the name of the plant that Walt used to poison Brock?",
    options:["Lily of the Valley","Yellow Jessamine","Palma Christi","Lily of the Nile"],
    correctAnswer:"Lily of the Valley",
    url: "2.jpg"
    },
    {question:"What name did Walt Jr adopt during his teen rebellion phase?",
    options:["Flynn","Mike","Scotty","Ben"],
    correctAnswer:"Flynn",
    url: "3.jpg"
    },
    {question:"What was the website created by Walt Jr to raise donation money for his father's rising medical costs, which was later used by Saul Goodman to launder Walt's drug money?",
    options:["helpcuremydad.com","savewalterwhite.com","helpmydad.com","savemydad.com"],
    correctAnswer:"savewalterwhite.com",
    url: "4.jpg"
    },
    {question:"What does Walter White use to kill Krazy-8 (Maximinio Arciniega)?",
    options:["Bike lock","Screwdriver","Bunsen Burner","Knife"],
    correctAnswer:"Bike lock",
    url: "5.jpg"
    },
    {question:"What flavour Venezia Pizza does Walt end up hurling on to the garage roof?",
    options:["Ham and Pineapple","Pepperoni","Tuna and Olive","BBQ Chicken"],
    correctAnswer:"Pepperoni",
    url: "6.png"
    },
    {question:"Before his partnership with Walt, what name did Jesse operate as a meth cook under?",
    options:["Mister Meth","Cap'n Cook","Chilli Powder","Wonder Boy"],
    correctAnswer:"Cap'n Cook",
    url: "7.gif"
    },
    {question:"What is Walter White's middle name?",
    options:["Hartwell","Archibald","Carlos","Clinger"],
    correctAnswer:"Hartwell",
    url: "8.png"
    },
    {question:"What was the name of the video game that Jessie plays during 'Problem Dog'?",
    options:["Rage","Shooter","Hitman","DOOM"],
    correctAnswer:"Rage",
    url: "9.jpg"
    },
    {question:"In season two, an exhibition of which artist did Jane take Jesse to see?",
    options:["Andy Warhol","William David Sprague","Georgia O'Keeffe","Jean-Michel Basquiat"],
    correctAnswer:"Georgia O'Keeffe",
    url: "10.jpg"
    }

]

// randomly generate questions 
questions = questions.sort(function() { return 0.5 - Math.random() });

var index = -1;
var time = 20;
var timerId;
var startId;
var intervalId;
var  displayTimeId;
var userAns;
var correctAns;
var click = false;
var correct = false;
var correctCount = 0;
var incorrectCount = 0;
var unanswered = 0;


$("#start").click(startTrivia);

function displayQuestion(){
    //display question
    $("div.container").removeClass('bg2').addClass('bg1');
    $("#timer").show();
    $("#options").empty(); 
    $("#result").empty(); 
    $("#numberQ").show();
    $("#numberQ").html("Question "+(index+1)+"/"+questions.length);
    $("#question").html("<h1>"+questions[index].question+"</h1>");
    //display options
    questions[index].options.forEach(element => {
        var newQDiv = $("<div>");
        newQDiv.html(element);
        $("#options").append(newQDiv);
    });
    //timer will run for 20 seconds that is question will be displayed for 20 seconds
    time = 20;
    timer();
    timerId = setInterval(timer, 1000); 
}

function timer(){
    $("#timer").empty();
    var p = $("<p>").text("TIME REMAINING");
    var timeString = time.toString();
    if(timeString.length<2){
        var timeDiv =  $("<div>").html("<span>0</span><span>"+timeString+"</span>");     
    }
    else{
        var timeDiv =  $("<div>").html("<span>"+timeString[0]+"</span><span>"+timeString[1]+"</span>");
    }
    var pTwo = $("<p>").text("seconds");
    $("#timer").append(p,timeDiv,pTwo);
    time--;
}

function displayAnswer(){
    $("div.container").removeClass('bg1').addClass('bg2');
    clearInterval(timerId); //stop the clock
    $("#numberQ").hide();
    $("#question").empty();
    $("#options").empty();
    $("#timer").hide();
    
    correctAns = questions[index].correctAnswer;
    var header = $("<p>").text("Correct Answer: "+ correctAns);
    var correctHeader = $("<p>").text("Your Answer: "+ correctAns);
    var image = "assets/images/"+questions[index].url;
   
    if(click === false){
        var p1 = $("<p>").html("Timeout");
        unanswered++;
        $("#result").append(p1, header);
    }
    else{
    if(userAns === correctAns){
        var p1 = $("<p>").html("Correct!");
        correctCount++;
        $("#result").append(p1, correctHeader);
       }
       else{
        var p1 = $("<p>").html("Nope!");
        incorrectCount++;
        $("#result").append(p1, header);
    }}
    var img = $("<img>").attr("src", image);
    $("#result").append(img);
}


function nextQuestion(){
    index++;
    click = false;
    if(index === questions.length){
        clearAll();
        $("#result").empty();
        var header = $("<p>").text("Result");
        var correctH = $("<p>").text("Correct: "+correctCount);
        var incorrectH = $("<p>").text("Incorrect: "+incorrectCount);
        var timeoutH = $("<p>").text("Unanswered: "+unanswered);
        $("#result").append(header, correctH, incorrectH, timeoutH);
       
        $("#options").hide(); 
        $("#timer").hide();
        
        $("#playOver").show();
    }
    else{
        displayQuestion();
        displayTimeId = setTimeout(displayAnswer, 20000);
    }
   
}

$("#options").on("click","div",function(){
    click = true;
    clearAll();
    userAns = $(this).text();
    // console.log(userAns);
    displayAnswer();
    //display answer for 5 seconds
    startId = setTimeout(startTrivia,5000);
});

$("#playOver").click(function(){
    index = -1;
    $("#timer").show();
    $("#options").show();
    $("#result").show();
    reInitialize();
    startTrivia();
});

function clearAll(){
    clearInterval(timerId);
    clearInterval(intervalId);
    clearTimeout(displayTimeId);
    clearTimeout(startId);
}

function reInitialize(){
    correctCount = 0;
    incorrectCount = 0;
    unanswered = 0;
    correctAns="";
    userAns="";
}


function startTrivia(){
    $("#header").hide();
    $("#start").hide();
    $("#playOver").hide();
    nextQuestion();
    clearInterval(intervalId);
    if(index < questions.length){
        intervalId = setInterval(nextQuestion, 25000); //display Q ->20 sec, Answer -> 5 sec
    }
   
}


