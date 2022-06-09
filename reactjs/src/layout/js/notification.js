$(document).ready(function(){
    $("#notic-close").click(function(){
        $("#notic-open").show();
        $("#box").show();
    })

    $("#notic-open").click(function(){
        $("#notic-open").hide();
        $("#box").hide();
    })
})