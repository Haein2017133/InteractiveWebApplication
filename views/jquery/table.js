
$(function() {
    //hang on event of form with id=myform
    $("#bookAdd").submit(function(e) {

        //prevent Default functionality
        e.preventDefault();

        //get the action-url of the form
        var actionurl = e.currentTarget.action;

        //do your own request an handle the results
        $.ajax({
                url: actionurl,
                type: 'post',
                dataType: 'application/json',
                data: $("#bookAdd").serialize(),
                success: setTimeout(draw_table, 1000)
        });

    });

});

function draw_table()
{
	$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
				select_row();
			}
		});
	};
	$.getJSONuncached("/get/html")
};

// function bookDelete() {
//     var bookIdArray = [2, 3, 4, 5, 6];
//     postAjax("/book/delete", {selectedBooks : bookIdArray});

function select_row()
{
    

	$("#bookListTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	
		var entree = $(this).attr("id") - 1;
        delete_row( entree);
       console.log("entree");
        console.log(entree);
	})
};

function delete_row(ent)
{
    $("#delete").click(function ()
	{
		$.ajax(
		{
			url: '/book/delete',
			type: 'POST',
			data:
			{
				
				entree: ent
			},
			cache: false,
			success: setTimeout(draw_table,1000)
		})
	})
};

$(document).ready(function ()
{
	draw_table();
});

function search()
{
   // function bookDelete() {
//     var bookIdArray = [2, 3, 4, 5, 6];
//     postAjax("/book/delete", {selectedBooks : bookIdArray});

           $("searchBt").click(function () {
            $("#searchID").keyup(function() {
                var k = $(obj.search);
                console.log(k);
                $("#bookListTable> tbody > tr").hide();
           var temp = $("#bookListTable > tbody > tr > td:nth-child(8n+4):contains('" + k + "')");

                $(temp).parent().show();
        
             })
            })
};