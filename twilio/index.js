// Twilio Credentials
var accountSid = 'ACd5ff12cc48aca205675b92bd0e9b3c19';
var authToken = 'e3266099d68dfd0d779bb25fe4cdde32';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: "+972524581995",
    from: "+18316090186 ",
    body: "awake",
}, function(err, message) {
    console.log(err);
    console.log(message.sid);
});