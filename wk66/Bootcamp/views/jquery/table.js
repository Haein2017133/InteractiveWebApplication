function draw_table(){
    $("#results").empty(); //call the id results
    $.getJSONuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#results").append(html); // pls find html ,injecting 
            }
        });
    };
    $.getJSONuncached("/get/html")
}
$(document).ready(function(){
    draw_table();
})