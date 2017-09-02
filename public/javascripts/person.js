$(document).on( 'click', '#submit-button', function(e){
    e.preventDefault();
    var imgUrl= $( "input[name='image_url']" ).val(),
        splittedUrl = $(location).attr('href').split("/"),
        groupId = splittedUrl[splittedUrl.length-3],
        personId = splittedUrl[splittedUrl.length-1];

    var settings = {
        "url": "/persongroup/"+groupId+"/person/" + personId ,
        "method": "POST",
        "data": {
            "url": imgUrl
        }
    };
    $.ajax(settings).done(function(res) {
        // var row = getPersonRow(groupId, res.id, res.name, res.userData);
        // $(".person-table").append(row);
        $(".results").html(JSON.stringify(res));
        $("form[name='new-face']")[0].reset();
    });

});