// define characters' info here
var obi_wan = {
    name: "Obi-Wan Kenobi",
    img_location: "assets/images/obi_wan.jpg",
    health_points: 155,
    attack_power: 10,
    counter_attack_power: 10,
};

var luke = {
    name: "Luke Skywalker",
    img_location: "assets/images/luke.jpg",
    health_points: 135,
    attack_power: 15,
    counter_attack_power: 8,
};

var darth = {
    name: "Darth Sidious",
    img_location: "assets/images/darth.jpg",
    health_points: 140,
    attack_power: 7,
    counter_attack_power: 15,
};

var maul = {
    name: "Darth Maul",
    img_location: "assets/images/maul.png",
    health_points: 200,
    attack_power: 3,
    counter_attack_power: 20,
};

// define all global variable 
var characters_array = [obi_wan,luke,darth,maul];
var my_character;
var my_defender;
var my_hp;
var defender_hp;
var my_att_power;
var noDefender = true;
var gameOver = false;

// determine which character that player selects
function findCharacter(name){
    for(var i=0; i<characters_array.length; i++){
        if(characters_array[i].name === name){
            return characters_array[i];
        }
    }
}

// print all characters
function printAllCharacters(){
    $("#characters").empty();
    $.each(characters_array,function(index,val){
        //define the elements to display the characters
        var cha_elem = $("<div class='character'></div>");
        var name = $("<h4>"+val.name+"</h4>");
        var image = $("<img>");
        image.attr("src",val.img_location)
        var p = $("<p>"+val.health_points+"</p>");
        
        //add the characters to main page
        cha_elem.append(name,image,p);
        $("#characters").append(cha_elem);
    })
}

// print enemies
function printEnemy(my_character){
    var all_characters = $(".character");
    var character = $(my_character);

    $.each(all_characters, function(index,val){
        if(! character.is(val)){
            $(val).attr("class","enemy");
            $("#enemies").append($(val));
        }
    });
}

// function to handle html when defender loses
function handleDefenderLose(){
    $(".defender").remove();
    var p1 = "";
    var bnt = "";
    if($(".enemy").length === 0){ //if you defeat all enemies
        p1 = "<p>You WON!!! GAME OVER!!!</p>";
        bnt = "<input type='button' value='restart' class='restart'>";
        gameOver = true;
    }else{ 
        $(".character p").text(my_hp);
        p1 = "<p>You have defeated " + my_defender.name + ", you can choose to fight another enemy.</p>";
    }            
    noDefender = true;
    $("#result").html(p1+bnt);
}

// function to handle html when player loses
function handlePlayerLose(){
    var p1 = "<p>You been defeated...GAME OVER!!!</p>";
    var bnt = "<input type='button' value='restart' class='restart'>";
    $("#result").html(p1+bnt);
    $("#defenders").empty();
    noDefender = true;
    gameOver = true;
}

// function to handle attack when no one loses or wins
function handleAttack(old_att_power){
    $(".character p").text(my_hp);
    $(".defender p").text(defender_hp);

    var p1 = "<p>You attacked " + my_defender.name + " for " + old_att_power + " damage.</p>";
    var p2 = "<p>"+my_defender.name + " attacked you back for "+ my_defender.counter_attack_power + " damage.</p>";
    $("#result").html(p1 + p2);
}

$(document).ready(function(){
    // print all characters
    printAllCharacters();

    // Handle click event when one character is clicked 
    $("#characters").on("click",".character", function(){
        //save my character's info
        my_character = findCharacter($(this).find("h4").text());
        my_hp =my_character.health_points;
        my_att_power = my_character.attack_power;
   
        //print the enemies
        printEnemy(this);
    });

    // Handle click event when one enemy is clicked
    $("#enemies").on("click", ".enemy",function(){
        if(noDefender){ //if there is no defender, define it and display
            my_defender = findCharacter($(this).find("h4").text());
            defender_hp = my_defender.health_points;
            noDefender = false;

            //change enemy to defender 
            $(this).attr("class","defender");
            $("#defenders").append(this);
            $("#result").empty();
        }
    });

    // Handle when player attacks
    $("#attackBnt").on("click",function(){
        if(noDefender){ //if no defender, cannot attack
            if(!gameOver){ //if game is not over yet
                $("#result").html("<p>No enemy here.</p>");
            }
        }else{
            // reduce player's and defender's health point  
            my_hp -= my_defender.counter_attack_power;
            defender_hp -= my_att_power;

            //increase player's attack power
            var old_att_power = my_att_power;
            my_att_power += my_character.attack_power;

            if(defender_hp <= 0){ //if defender loses the game
                handleDefenderLose();
            }else if(my_hp <= 0){ //if player loses the game
                handlePlayerLose();               
            }else{ // else print health points and attack detail
                handleAttack(old_att_power);
            }
        }
    });

    // When restart button is clicked, restart game.
    $("#result").on("click",".restart",function(){
        printAllCharacters();
        $("#result").empty();
        noDefender = true;
        gameOver = false;
    });
})