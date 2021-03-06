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

exports.getProfile = [
    async function(req, res, next) {
        let uid = validator.escape(req.params.uid);
        if (validator.isEmpty(uid)) {
            res.status(400).send();
            return;
        }
        if (!validator.isUUID(uid, [4])) {
            res.status(400).send();
            return;
        }
        let query_jobseeker = `SELECT uid, acceptance_wage, goal_wage, open_relocation FROM jobseeker WHERE uid = $1`;
        // let query_skills = `SELECT * FROM skills where uid = $1`;
        let query_dream_careers = `SELECT PDC.career as dream_career FROM pre_dream_careers PDC LEFT JOIN dream_careers DC
                                    ON PDC.id = DC.career_id WHERE uid = $1`;
        let query_skills = `SELECT ps.skill, s.years, s.level FROM pre_skills ps, skills s WHERE ps.id = s.skill_id 
        AND s.uid = $1;`;
        let query_dream_companies = `SELECT PDC.company as dream_company FROM pre_dream_companies PDC LEFT JOIN
                                        dream_companies DC ON PDC.id = DC.company_id WHERE uid = $1`;
        let query_experiences = `SELECT * FROM experiences WHERE uid = $1`;
        let query_certification = `SELECT * FROM certification WHERE uid = $1`;
        let query_education = `SELECT * FROM education WHERE uid = $1`;
        
        Promise.all([await pool.query(query_jobseeker, [uid]), await pool.query(query_skills, [uid]),
        await pool.query(query_dream_careers, [uid]), await pool.query(query_dream_companies, [uid]),
        await pool.query(query_experiences, [uid]), await pool.query(query_certification, [uid]),
        await pool.query(query_education, [uid])])
        .then(values => {
            
            let mapping = ['', 'skills', 'dream_career', 'dream_company', 'experiences', 'certification', 'education'];
            // Don't filter as will need to do a loop
            let rows = values.map(r => r.rows);
            // Need to check if jobseeker exists
            if (rows[0].length === 0) {
                res.status(404).send()
                return;
            }
            let result = {}
            result['jobseeker'] = {};
            result['jobseeker']['uid'] = rows[0][0]['uid'];
            result['jobseeker']['info'] = {};
            // We don't want uid in that field anymore
            delete rows[0][0]['uid'];
            Object.keys(rows[0][0]).forEach(function(key) {
                result['jobseeker']['info'][key] = rows[0][0][key];
            })
            
            for (let i = 1; i < rows.length; i++) {
                if (mapping[i] === 'experiences' || mapping[i] === 'education' || mapping[i] === 'certification' || mapping[i] == 'skills') {
                    Object.keys(rows[i]).forEach(function(key) {
                        delete rows[i][key]['uid'];
                    })
                    result['jobseeker']['info'][mapping[i]] = rows[i];
                } else {
                    result['jobseeker']['info'][mapping[i]] = []
                    for (let j = 0; j < rows[i].length; j++) {
                        result['jobseeker']['info'][mapping[i]].push(rows[i][j][mapping[i]]);
                        
                    }
                }
                
            }

            res.type('application/json')
            res.status(200).send(JSON.stringify(result));

            
        }) .catch(e => { res.status(500); res.send(sendError(500, 'profile error ' + e)) });
    }
]