$(document).on( 'click', '#submit-button', function(e){
    e.preventDefault();
    var splittedUrl = $(location).attr('href').split("/"),
        groupId = splittedUrl[splittedUrl.length-1],
        personName = $( "input[name='name']" ).val(),
        userData = $( "input[name='user_data']" ).val();
    var settings = {
        "url": "/persongroup/"+groupId+"/person",
        "method": "POST",
        "data": {
            "id":groupId,
            "name":personName,
            "description": userData
        }
    };
    $.ajax(settings).done(function(res) {
        var row = getPersonRow(groupId, res.id, res.name, res.userData);
        $(".person-table").append(row);
        $(".results").html(personName+ " was added to "+ groupId +" successfully!");
        $("form[name='new-person']")[0].reset();
    });

});

$(document).on( 'click', '.delete', function(){
    var splittedUrl = $(location).attr('href').split("/"),
        groupId = splittedUrl[splittedUrl.length-1],
        personId = $(this).attr('id');
    var settings = {
        "url": "/persongroup/" + groupId + "/person/" + personId,
        "method": "DELETE"
    };
    $.ajax(settings).done(function(res) {
        var result;
        if(res === '') {
            $('#tr_' + personId).removePersonGroup();
            result = "The person was deleted successfully";
        } else {
            result = "Something went wrong.<br>" + JSON.stringify(res);
        }
        $(".results").html(result);
    });

});

$(document).on( 'click', '.train', function(){
    var splittedUrl = $(location).attr('href').split("/"),
        groupId = splittedUrl[splittedUrl.length-1];
    var settings = {
        "url": "/persongroup/" + groupId + "/train",
        "method": "POST"
    };
    $.ajax(settings).done(function(res) {
        $(".train-results").html("Training in progress." + JSON.stringify(res));
    });
});

$(document).on( 'click', '#identify-button', function(e){
    e.preventDefault();
    var splittedUrl = $(location).attr('href').split("/"),
        groupId = splittedUrl[splittedUrl.length-1],
        imgUrl = $( "input[name='imgUrl']" ).val();
    var settings = {
        "url": "/persongroup/" + groupId + "/identify",
        "method": "POST",
        "data": {
            "url": imgUrl
        }
    };
    $.ajax(settings).done(function(res) {
        var settings2 = {
            "url": "/persongroup/" + groupId + "/json",
            "method": "GET",
        };
        $(".identify-results").html("<img src='"+ imgUrl +"' height='300'><br>Results: <br>");
        $.ajax(settings2).done(function(res2) {
            $.each(res[0].candidates, function(i, candidate) {
                $.each(res2.persons, function(j, person) {
                    if(candidate.personId === person.personId) {
                        $(".identify-results").append("<p>Name: "+ person.name + "<br>Confidence: " + (candidate.confidence.toFixed(4)) * 100 + "%</p>");
                    }
                });
            });
        });
    });
});