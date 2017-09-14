$(document).on( 'click', '#submit-button', function(e){
    e.preventDefault();
    var groupId = $( "input[name='group_id']" ).val(),
        groupName = $( "input[name='name']" ).val(),
        groupData = $( "input[name='group_data']" ).val();
    var settings = {
        "url": "/persongroup",
        "method": "POST",
        "data": {
            "id":groupId,
            "name":groupName,
            "description": groupData
        }
    };
    $.ajax(settings).done(function(res) {
        var row = getPersonGroupRow(groupId, groupName, groupData);
        $(".person-group-table").append(row);
        $(".results").html(groupId+ " was created successfully!");
        $("form[name='new-person-group']")[0].reset();
    });
});

$(document).on( 'click', '.delete', function(e){
    var groupId = $(this).attr('id');
    var settings = {
        "url": "/persongroup/" + groupId,
        "method": "DELETE"
    };
    $.ajax(settings).done(function(res) {
        $('#tr_'+groupId).remove();
        $(".results").html(groupId+ " was deleted successfully!");
    });
});