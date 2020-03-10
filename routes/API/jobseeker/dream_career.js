// Global var and functions
const pool = require('../../../config');
const validator = require('validator');

function sendJSON(statusCode, payload) {
    return JSON.stringify({
        status_code: statusCode,
        payload: payload
    })
}

function sendError(statusCode, message, additionalInfo = {}) {
    return JSON.stringify({
        status_code: statusCode,
        error: {
            message: message,
            additional_information: additionalInfo
        }
    })
}

exports.getDreamCareers = [
    async function (req, res, next) {
        let uid = validator.escape(req.params.uid);
        if (validator.isEmpty(uid)) {
            res.status(400).send("One of the field is empty");
            return;
        }
        if (!validator.isUUID(uid, [4])) {
            res.status(400).send("Invalid UUID");
            return;
        }
        let Query = `SELECT * FROM Dream_Careers where uid = $1`;
        Promise.all([pool.query(Query, [uid])])
            .then(result => {
                var rows = {};
                rows = result.filter(r => r.rowCount > 0).map(r => r.rows)
                res.type('application/json')
                if (rows) {
                    if (rows.length == 0) {
                        res.status(200).send([]);
                    }
                    res.status(200).send(rows[0]);
                } else {
                    res.status(400).send(`Jobseeker could not be found`);
                }
            })
            .catch(e => {
                res.status(500);
                res.send(sendError(500, '/jobseeker error ' + e))
            });
    }
];

exports.addDreamCareers = [
    async function (req, res, next) {
        let uid = validator.escape(req.params.uid);
        let dream_career = validator.escape(req.body.dream_career);
        if (validator.isEmpty(uid) || validator.isEmpty(dream_career)) {
            res.status(400).send("One of the field is empty");
            return;
        }
        if (!validator.isUUID(uid, [4])) {
            res.status(400).send("Invalid UUID");
            return;
        }
        let Query = `INSERT INTO dream_careers (uid, dream_career, ranking) VALUES ($1, $2, 0) returning uid`;
        Promise.all([pool.query(Query, [uid, dream_career])])
            .then(result => {
                var rows = result.filter(r => r.rowCount > 0).map(r => r.rows);

                if (rows[0]) {
                    res.status(200).send('Added dream career');
                } else {
                    res.status(400).send(`Jobseeker could not be found`);
                }
            }).catch(e => {
                res.status(500);
                res.send(sendError(500, '/jobseeker error ' + e))
            });
    }
];

exports.deleteDreamCareers = [
    async function (req, res, next) {
        let uid = validator.escape(req.params.uid);
        let dream_career = validator.escape(req.headers.dream_career);
        if (validator.isEmpty(uid) || validator.isEmpty(dream_career)) {
            res.status(400).send("One of the field is empty");
            return;
        }
        if (!validator.isUUID(uid, [4])) {
            res.status(400).send("Invalid UUID");
            return;
        }
        let Query = `DELETE FROM dream_careers WHERE uid = $1 and dream_career = $2 returning uid`;
        Promise.all([pool.query(Query, [uid, dream_career])])
            .then(result => {
                var rows = result.filter(r => r.rowCount > 0).map(r => r.rows);

                if (rows[0]) {
                    res.status(200).send(rows[0][0]);
                } else {
                    res.status(400).send(`Jobseeker could not be found`);
                }
            })
            .catch(e => {
                res.status(500);
                res.send(sendError(500, '/jobseeker error ' + e))
            });
    }
];