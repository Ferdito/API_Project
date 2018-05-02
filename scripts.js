$(document).ready(function(){
    
    $.get("https://opentdb.com/api.php?amount=50&type=multiple", function(data){
        var num = 0;
        function getData(){
            
            var question = data.results[num].question;
            var answer = data.results[num].correct_answer;
            var incorrect = data.results[num].incorrect_answers;
            
            //Prints question and answer choices
            
            $("#question").html(question);
            $("#answer").append("<li>" + answer + "</li>");
            for(i = 0; i < 3; i++){
                $("#answer").append("<li>" + incorrect[i] + "</li>");
            }
            
            //Randomizes answer choices
            
            $(function () {
                var parent = $("#answer");
                var divs = parent.children();
                while (divs.length) {
                parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
                }
            });
            
            //Click event for correct answer
            
            $("li").click(function(){
               if($(this).html() == answer){
                    $(this).css("background-color", "gold");
                    num++;
                    $("*").off("click");
                    var timer = setTimeout(function(){
                        $("#answer").html("");
                        getData();
                    }, 2000);
               }
                else{
                    $(this).css("background-color", "red");
                }
            });
        };
        getData(); 
        
        //Next/Previous buttons
            
            $("#btn2").click(function(){
                num++;
                $("#answer").html("");
                getData();
            });
        
            $("#btn").click(function(){
                num--;
                $("#answer").html("");
                getData();
            });
    }); 
});