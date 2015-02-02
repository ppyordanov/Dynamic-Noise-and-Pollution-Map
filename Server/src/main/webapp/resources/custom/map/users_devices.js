/**
 * Created by Peter Yordanov on 1.2.2015 г..
 */

var userContent;

function generateDevicesContent(){
    userContent="";
    devices.forEach(function (entry) {
        userContent += "<div class='panel panel-primary'><div class='panel-heading'><h3 class='panel-title'>" + entry.title + "</h3></div><div class='panel-body'><span class='left'>" +
            "<b>ID</b>:" + entry.id + "<br>" +
            "<b>Description</b>: " + entry.description + "<br>" +
            "<b>Location</b>: " + entry.location + "<br>" +
            "<b>Kit Version</b>: " + entry.kitVersion + "<br>" +
            "<b>First Access</b>: " + entry.created + "<br>" +
            "<b>Associated User</b>: " + entry.userId+ "<br>" +
            "</span><img id='userImage' src='" + larger_image + "'></div></div>";
    });
    $('#devicesSCK').html(userContent);
}

function generateUsersContent(){

    userContent="";
    users.forEach(function (entry) {
        userContent += "<div class='panel panel-primary'><div class='panel-heading'><h3 class='panel-title'>" + entry.userName + "</h3></div><div class='panel-body'><span class='left'>" +
            "<b>ID</b>:" + entry.id + "<br>" +
            "<b>City</b>: " + entry.city + "<br>" +
            "<b>Country</b>: " + entry.country + "<br>" +
            "<b>Website</b>: <a target='_blank' href='" + entry.website + "'>" + entry.website + "</a><br>" +
            "<b>Email</b>: <a href='mailto:" + entry.email + "'>" + entry.email + "</a><br>" +
            "<b>First Access</b>: " + entry.created + "<br>" +
            "</span><a target='_blank' href='" + entry.website + "'><img id='userImage' src='" + profile_image + "'></a></div></div>";
    });
    $('#usersSCK').html(userContent);

}