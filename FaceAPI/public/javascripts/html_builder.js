function getPersonGroupRow(id, name, desc) {
    return "<tr id='tr_"+id+"'>" +
            "<td><a href='/persongroup/"+id+"'>"+id+"</a></td>" +
            "<td>"+name+"</td>" +
            "<td>"+desc+"</td>" +
            "<td><a class='delete' id='"+id+"'>Delete</a></td>" +
           "</tr>";
}

function getPersonRow(gid, pid, name, desc) {
    return "<tr id='tr_"+pid+"'>" +
            "<td><a href='/persongroup/"+ gid +"/person/"+ pid + "'>"+name+"</a></td>" +
            "<td>"+desc+"</td>" +
            "<td></td>" +
            "<td><a class='delete' id='"+ pid +"'>Delete</a></td>" +
           "</tr>";
}