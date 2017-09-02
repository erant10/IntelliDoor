const request = require("request");

const headers = {
    'cache-control': 'no-cache',
    'ocp-apim-subscription-key': '579243856750483c9a79cc26a21c4a9e'
};

const host = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0';
const url = host + '/persongroups/';

module.exports = {

    /* Person Group methods */

    //  Returns a list of all the person groups
    getAllGroups(req, res, next) {
        var options = {
            method: 'GET',
            url: url,
            headers: headers
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.render('persongroups', { groupsJson: JSON.parse(body) });
        });
    },

    // Returns a single person group
    getOneGroup(req, res, next) {
        var options = {
            method: 'GET',
            url: url + '/' + req.params.id,
            headers: headers
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            if (response.statusCode === 200) {
                options.url = url + '/' + req.params.id + "/persons";
                request(options, function (error2, response2, body2) {
                    if (error2) throw new Error(error2);
                    res.render('persongroup', { id: req.params.id, groupJson: JSON.parse(body), persons: JSON.parse(body2)});
                });
            } else {
                res.send(body)
            }
        });
    },

    // Returns a single person group in Json format
    getOneGroupJson(req, res, next) {
        var options = {
            method: 'GET',
            url: url + '/' + req.params.id  + "/persons",
            headers: headers
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send({ id: req.params.id, persons: JSON.parse(body)});
        });

    },

    // Creates a person group
    createPersonGroup(req, res, next) {
        var options = {
            method: 'PUT',
            url: url + '/' + req.body.id,
            headers: headers,
            body: { name: req.body.name , userData: req.body.description },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send({ success: true });
        });
    },

    // Removes a person group
    removePersonGroup(req, res, next) {
        var options = {
            method: 'DELETE',
            url: url + '/' + req.params.id,
            headers: headers
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send({ success: true });
        });
    },

    // Trains a person group
    train(req, res, next) {
        var options = {
            method: 'POST',
            url: url + '/' + req.params.groupId + "/train",
            headers: headers
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send({ success: response.statusCode === 202, body: body});
        });
    },

    // Identifies a face from the persons in person group
    identify(req, res, next) {
        var options = {
            method: 'POST',
            url: host + '/detect',
            headers: headers,
            body: {
                url: req.body.url
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            if (response.statusCode === 200) {
                var options2 = {
                    method: 'POST',
                    url: host + '/identify',
                    headers: headers,
                    body: {
                        personGroupId: req.params.groupId,
                        faceIds: [ body[0].faceId ],
                        maxNumOfCandidatesReturned: 2,
                        confidenceThreshold: 0
                    },
                    json: true
                };
                request(options2, function (error2, response2, body2) {
                    if (error2) throw new Error(error2);
                    res.send(body2)
                });

            }
        });
    },

    /* Person methods */

    // Returns a spercific person in a person group
    getOnePerson(req, res, next) {
        var options = {
            method: 'GET',
            url: url + '/' + req.params.groupId + "/persons/" + req.params.personId,
            headers: headers
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.render('person', { person: JSON.parse(body) });
        });
    },

    // Creates a person
    createPerson(req, res, next) {
        var options = {
            method: 'POST',
            url: url + '/' + req.params.id + "/persons" ,
            headers: headers,
            body: { name: req.body.name , userData: req.body.description },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send({ id: body.personId, name: req.body.name , userData: req.body.description });
        });
    },

    // Removes a person
    removePerson(req, res, next) {
        var options = {
            method: 'DELETE',
            url: url + '/' + req.params.groupId + "/persons/" + req.params.personId ,
            headers: headers,
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send(body);
        });
    },

    /* Person Face Methods */

    // Add a Person face
    addPersonFace(req, res, next) {
        var options = {
            method: 'POST',
            url: url + '/' + req.params.groupId + "/persons/" + req.params.personId + "/persistedFaces",
            headers: headers,
            body: { url: req.body.url },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send(body);
        });
    }

}

