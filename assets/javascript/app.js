var questions = [
    {question:"What is the name of the acid that is used to corrosively dispose of Walter's victims?",
     options:["Hydrochloric Acid","Hydrofluoric Acid","Hydrochloride","Sulphuric Acid"],
     correctAnswer:"Hydrofluoric Acid"
    },
    {question:"What was the name of the plant that Walt used to poison Brock?",
    options:["Lily of the Valley","Yellow Jessamine","Palma Christi","Lily of the Paradise"],
    correctAnswer:"Lily of the Valley"
    },
    {question:"What name did Walt Jr adopt during his teen rebellion phase?",
    options:["Flynn","Mike","Scotty","Ben"],
    correctAnswer:"Flynn"
    },
    {question:"What was the website created by Walt Jr to raise donation money for his father's rising medical costs, which was later used by Saul Goodman to launder Walt's drug money?",
    options:["helpcuremydad.com","savewalterwhite.com","helpmydad.com","savemydad.com"],
    correctAnswer:"savewalterwhite.com"
    },
    {question:"What colour ribbons did people wear to commemorate the Wayfarer 515 air crash?",
    options:["Light blue and orange","Blue","Orange","Yellow"],
    correctAnswer:"Light blue and orange"
    },
    {question:"What does Walter White use to kill Krazy-8 (Maximinio Arciniega)?",
    options:["Bike lock","Screwdriver","Bunsen Burner","Knife"],
    correctAnswer:"Bike lock"
    },
    {question:"What flavour Venezia Pizza does Walt end up hurling on to the garage roof?",
    options:["Ham and Pineapple","Pepperoni","Tuna and Olive","BBQ Chicken"],
    correctAnswer:"Pepperoni"
    },
    {question:"Before his partnership with Walt, what name did Jesse operate as a meth cook under?",
    options:["Mister Meth","Cap'n Cook","Chilli Powder","Superman"],
    correctAnswer:"Cap'n Cook"
    },
    {question:"What is Walter White's middle name?",
    options:["Hartwell","Archibald","Carlos","Clinger"],
    correctAnswer:"Hartwell"
    },
    {question:"What was the name of the video game that Jessie plays during 'Problem Dog'?",
    options:["Rage","Shooter","Hitman","DOOM"],
    correctAnswer:"Rage"
    },
    {question:"In season two, an exhibition of which artist did Jane take Jesse to see?",
    options:["Andy Warhol","William David Sprague","Georgia O'Keeffe","Jean-Michel Basquiat"],
    correctAnswer:"Georgia O'Keeffe"
    }

]

questions = questions.sort(function() { return 0.5 - Math.random() });

var index = -1;
var time = 10;
var timerId;
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
    $("#options").empty(); 
    $("#result").empty(); 
    $("#numberQ").show();
    $("#numberQ").html("<h1>"+(index+1)+"/"+questions.length+"</h1>");
    $("#question").html("<h1>"+questions[index].question+"</h1>");
    //display options
    questions[index].options.forEach(element => {
        var newQDiv = $("<div>");
        newQDiv.html(element);
        $("#options").append(newQDiv);
    });
    //timer will run for 10 seconds that is question will be displayed for 10 seconds
    time = 10;
    timer();
    timerId = setInterval(timer, 1000); 
}

function timer(){
    $("#timer").html("TIME:"+time);
    time--;
}

function displayAnswer(){
    clearInterval(timerId); //stop the clock
    $("#numberQ").hide();
    $("#options").empty();
    correctAns = questions[index].correctAnswer;
    if(click === false){
        $("#result").html("Time out");
        unanswered++;
    }
    else{
    if(userAns === correctAns){
        $("#result").html("Correct");
        correctCount++;
       }
       else{
        $("#result").html("Incorrect");
        incorrectCount++;
    }}

    $("#question").html(questions[index].correctAnswer);
    console.log(userAns,correctAns);
   
}


function nextQuestion(){
    index++;
    click = false;
    if(index === questions.length){
        $("#question").html("done");
        $("#question").append("<br>Correct Answer: "
    +correctCount+"<br>Incorrect Answer: "+incorrectCount+"<br> Unanswered: "+unanswered);
        $("#options").hide();
        clearInterval(timerId);
        clearInterval(intervalId);
        clearInterval(displayTimeId);
        $("#timer").hide();
        $("#result").hide();
        $("#playOver").show();
    }
    else{
        displayQuestion();
        displayTimeId = setTimeout(displayAnswer, 10000);
    }
   
}

$("#options").on("click","div",function(){
    click = true;
    clearTimeout(displayTimeId);
    clearInterval(intervalId);
    userAns = $(this).text();
    // console.log(userAns);
    displayAnswer();
    setTimeout(startTrivia,5000);
});

$("#playOver").click(function(){
    index = -1;
    clearInterval(timerId);
    clearInterval(intervalId);
    clearInterval(displayTimeId);
    $("#timer").show();
    $("#options").show();
    $("#result").show();
    correctCount = 0;
    incorrectCount = 0;
    unanswered = 0;
    correctAns="";
    userAns="";
    startTrivia();
});



function startTrivia(){
    $("#start").hide();
    $("#playOver").hide();
    nextQuestion();
    intervalId = setInterval(nextQuestion, 15000);
}


