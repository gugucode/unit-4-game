
var obi_wan = {
    health_points: 120,
    attack_power: 5,
    counter_attack_power: 100
}

$(document).ready(function(){
    $(".character").on("click", function(){
        var all_characters = $(".character");
        var my_character = $(this);
        $("#characters").empty();
        $("#characters").append(my_character);
        
        $.each(all_characters, function(index,character){
            if(! my_character.is(character)){
                $(character).attr("class","enemy");
                $("#enemies").append(character);
            }
        });
    });

    $("#enemies").on("click", ".enemy",function(){
        if($(".defender").length === 0){
            var my_enemy = $(this);
            $(this).remove();
            $(my_enemy).attr("class","defender");
            $("#defenders").append(my_enemy);
        }
    });
})