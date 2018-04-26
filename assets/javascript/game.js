
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


characters_array = [obi_wan,luke,darth,maul];
var my_character;
var my_defender;
var my_hp = -1;
var defender_hp = -1;
var my_att_power = -1;


function findCharacter(name){
    for(var i=0; i<characters_array.length; i++){
        if(characters_array[i].name === name){
            return characters_array[i];
        }
    };
}

function printHealthPoint(selector,character){
    $(selector).text(character["health_points"]);
}

function printAllCharacters(){
    $.each(characters_array,function(index,val){
        // console.log("hi");
        var cha_elem = $("<div>");
        cha_elem.addClass("character");
        
        var name = $("<h4>");
        name.text(val.name);

        var image = $("<img>");
        image.attr("src",val.img_location)

        var p = $("<p>");
        p.text(val.health_points);
        
        cha_elem.append(name,image,p);
        $("#characters").append(cha_elem);
    })
}

$(document).ready(function(){
    printAllCharacters();

    $("#characters").on("click",".character", function(){
        my_character = findCharacter($(this).find("h4").text());
        my_hp =my_character.health_points;
        my_att_power = my_character.attack_power;
   
        var all_characters = $(".character");
        var character = $(this);
        $("#characters").empty();
        $("#characters").append(character);
        
        $.each(all_characters, function(index,val){
            if(! character.is(val)){
                $(val).attr("class","enemy");
                $("#enemies").append(val);
            }
        });
    });

    $("#enemies").on("click", ".enemy",function(){
        if($(".defender").length === 0){
            my_defender = findCharacter($(this).find("h4").text());
            defender_hp = my_defender.health_points;
            // console.log(my_enemy);
            var enemy = $(this);
            $(this).remove();
            $(enemy).attr("class","defender");
            $("#defenders").append(enemy);
        }
    });

    $("#attackBnt").on("click",function(){
        if($(".defender").length === 0){
            var p1 = $("<p>");
            p1.text("No enemy here.")
            $("#result").empty();
            $("#result").append(p1);
        }else{
            my_hp -= my_defender.counter_attack_power;
            defender_hp -= my_att_power;
            var old_att_power = my_att_power;
            my_att_power += my_character.attack_power;

            if(defender_hp <= 0){
                $(".defender").remove();
                var p1;
                var bnt;
                if($(".enemy").length === 0){
                    p1 = $("<p>");
                    p1.text("You WON!!! GAME OVER!!!");
                    bnt = $("<input>");
                    bnt.attr("class","restart").attr("type","button").attr("value","restart");
                }else{
                    $(".character p").text(my_hp);
                    p1 = $("<p>");
                    p1.text("You have defeated " + my_defender.name + ", you can choose to fight another enemy.")
                }
                
                $("#result").empty();
                $("#result").append(p1,bnt);

            }else if(my_hp <= 0){
                var p1 = $("<p>");
                p1.text("You been defeated...GAME OVER!!!");
                var bnt = $("<input>");
                bnt.attr("type","button").attr("value","restart").attr("class","restart");
                $("#result").empty();
                $("#result").append(p1,bnt);
                
            }else{
                $(".character p").text(my_hp);
                $(".defender p").text(defender_hp);
    
                var p1 = $("<p>");
                p1.text("You attacked " + my_defender.name + " for " + old_att_power + " damage.");
                var p2 = $("<p>");
                p2.text(my_defender.name + " attacked you back for "+ my_defender.counter_attack_power + " damage.");
                $("#result").empty();
                $("#result").append(p1,p2);
            }
        }
    });

    $("#result").on("click",".restart",function(){
        console.log("restart")
        $("#characters").empty();
        printAllCharacters();
        $("#result").empty();
    });
})