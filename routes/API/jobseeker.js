// Global var and functions
const express = require('express');
const router = express.Router({
    mergeParams: true,
    strict: true
});
const bodyParser = require('body-parser');

const basic = require('./jobseeker/basic');
const profile = require('./jobseeker/profile');
const skill = require('./jobseeker/skill');
const dream_career = require('./jobseeker/dream_career');
const dream_company = require('./jobseeker/dream_company');
const experience = require('./jobseeker/experience'); 
const ed = require('./jobseeker/education'); 
const cert = require('./jobseeker/certification'); 
const resume = require('./jobseeker/resume');
const universal = require('./universal/util');

router.route('/?:uid?')
    /**
     *  @swagger
     * 
     *  /jobseeker:
     *      post:
     *          description: Create a jobseeker
     *          tags:
     *              - Jobseeker
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: firebaseID
     *                description: FirebaseID generated by Firebase
     *                in: formData
     *                requried: true
     *                type: string
     *              - name: email
     *                description: E-mail of the jobseeker
     *                in: formData
     *                requried: true
     *                type: string
     *              - name: name
     *                description: Name of the jobseeker
     *                in: formData
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully created a jobseeker
     *              400:
     *                  description: User could not be created
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .post(basic.createJobseeker)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}:
     *      get:
     *          description: Returns information about specified jobseeker
     *          tags:
     *              - Jobseeker
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(universal.verifyToken, basic.getJobseeker)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}:
     *      put:
     *          description: Modify information of specified jobseeker; NOTE! YOU MUST PASS EVERYTHING ELSE AS BODY
     *          tags:
     *              - Jobseeker
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UUID of the corresponding jobseeker
     *                in: path
     *                requried: true
     *                type: string
     *              - name: name
     *                description: The new name of the Jobseeker
     *                in: formData
     *                requried: false
     *                type: string
     *              - name: email_address
     *                description: The new e-mail of the jobseeker
     *                in: formData
     *                requried: false
     *                type: string
     *              - name: phone_number
     *                description: The new phone number of the jobseeker
     *                in: formData
     *                requried: false
     *                type: string
     *              - name: location
     *                description: The new location of the jobseeker
     *                in: formData
     *                requried: false
     *                type: string
     *          responses:
     *              200:
     *                  description: Successfully modified the jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .put(basic.updateJobseeker);


router.route('/:uid/profile/?')
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/profile:
     *      get:
     *          description: Return the default profile for a jobseeker
     *          tags:
     *              - Jobseeker, profile
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker profile
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(profile.getProfile);

router.route('/:uid/skill/?:skill?')
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/skill:
     *      get:
     *          description: Returns the skills of specified jobseeker
     *          tags:
     *              - Jobseeker, skills
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(skill.getSkills)

    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/skill:
     *      post:
     *          description: Add a new skill to a jobseeker table
     *          tags:
     *              - Jobseeker, skills
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: skill
     *                description: Skill to add for a user
     *                in: formData
     *                required: true
     *                type: string
     *              - name: ranking
     *                description: Ranking of the skill
     *                in: formData
     *                required: false
     *                type: integer
     *              - name: level
     *                description: Level of expertise with the skill. 1 is expert and 5 is beginner.
     *                in: formData
     *                required: true
     *                type: integer
     *              - name: years
     *                description: years of experience with the skill
     *                in: formData
     *                required: true
     *                type: integer
     * 
     *          responses:
     *              200:
     *                  description: Successfully add the Jobseeker's skill
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .post(skill.addSkill)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/skill/{skill}:
     *      delete:
     *          description: Delete a skill added to the database for a jobseeker
     *          tags:
     *              - Jobseeker, skills
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: skill
     *                description: Skill to delete
     *                in: path
     *                required: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .delete(skill.deleteSkill)

router.route('/:uid/education/?:ed_id?')
    /**
    *  @swagger
    * 
    *  /jobseeker/{uid}/education:
    *      post:
    *          description: Add a new education experience to jobseeker
    *          tags:
    *              - Jobseeker, Education
    *          produces: 
    *              - application/json
    *          parameters:
    *              - name: uid
    *                description: UID for the specific user
    *                in: path
    *                requried: true
    *                type: string
    *              - name: school_name
    *                description: Name of the school
    *                in: formData
    *                required: true
    *                type: string
    *              - name: start_date
    *                description: Start date
    *                in: formData
    *                required: true
    *                type: string
    *              - name: grad_date
    *                description: Graduation date
    *                in: formData
    *                required: true
    *                type: string
    *              - name: program
    *                description: Name of the program
    *                in: formData
    *                required: true
    *                type: string
    * 
    *          responses:
    *              200:
    *                  description: Successfully get the Jobseeker
    *              400:
    *                  description: User could not be found
    *              500:
    *                  description: Internal server error
    * 
    * 
    */
    .post(ed.addEducation)

    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/education:
     *      get:
     *          description: Returns the education experience of specified jobseeker
     *          tags:
     *              - Jobseeker, Education
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(ed.getEducation)
    /**
    *  @swagger
    * 
    *  /jobseeker/{uid}/education:
    *      put:
    *          description: Modify the education of a jobseeker
    *          tags:
    *              - Jobseeker, Education
    *          produces: 
    *              - application/json
    *          parameters:
    *              - name: uid
    *                description: UUID of the corresponding jobseeker
    *                in: path
    *                requried: true
    *                type: string
    *              - name: ed_id
    *                description: The id of the education experience to be updated
    *                in: formData
    *                requried: true
    *                type: integer
    *              - name: school_name
    *                description: The name of the school
    *                in: formData
    *                requried: true
    *                type: string
    *              - name: start_date
    *                description: The start date of the education experience
    *                in: formData
    *                requried: true
    *                type: string
    *              - name: grad_date
    *                description: The graduation date of the education experience
    *                in: formData
    *                requried: true
    *                type: string
    *              - name: program
    *                description: The program of study
    *                in: formData
    *                requried: true
    *                type: string
    *          responses:
    *              200:
    *                  description: Successfully modified education experience
    *              400:
    *                  description: User could not be found
    *              500:
    *                  description: Internal server error
    */
    .put(ed.updateEducation)

    /**
    *  @swagger
    * 
    *  /jobseeker/{uid}/education/{ed_id}:
    *      delete:
    *          description: Delete an education experience from a jobseeker
    *          tags:
    *              - Jobseeker, Education
    *          produces: 
    *              - application/json
    *          parameters:
    *              - name: uid
    *                description: UID for the specific user
    *                in: path
    *                requried: true
    *                type: string
    *              - name: ed_id
    *                description: id of the education experience
    *                in: path
    *                requried: true
    *                type: string
    * 
    *          responses:
    *              200:
    *                  description: Successfully get the Jobseeker
    *              400:
    *                  description: User could not be found
    *              500:
    *                  description: Internal server error
    * 
    */
   .delete(ed.deleteEducation)

router.route('/:uid/certification/?:c_id?')
    /**
    *  @swagger
    * 
    *  /jobseeker/{uid}/certification:
    *      post:
    *          description: Add a new certification to jobseeker
    *          tags:
    *              - Jobseeker, Certification
    *          produces: 
    *              - application/json
    *          parameters:
    *              - name: uid
    *                description: UID for the specific user
    *                in: path
    *                requried: true
    *                type: string
    *              - name: cert_name
    *                description: Name of the certification
    *                in: formData
    *                required: true
    *                type: string
    *              - name: start_date
    *                description: Start date
    *                in: formData
    *                required: false
    *                type: string
    *              - name: end_date
    *                description: End date
    *                in: formData
    *                required: false
    *                type: string
    *              - name: issuer
    *                description: Name of the issuer of the certificate
    *                in: formData
    *                required: true
    *                type: string
    * 
    *          responses:
    *              200:
    *                  description: Successfully get the Jobseeker
    *              400:
    *                  description: User could not be found
    *              500:
    *                  description: Internal server error
    * 
    * 
    */
    .post(cert.addCert)

    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/certification:
     *      get:
     *          description: Returns the certification of specified jobseeker
     *          tags:
     *              - Jobseeker, Certification
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(cert.getCert)

    /**
    *  @swagger
    * 
    *  /jobseeker/{uid}/certification:
    *      put:
    *          description: Modify the certification of a jobseeker
    *          tags:
    *              - Jobseeker, Certification
    *          produces: 
    *              - application/json
    *          parameters:
    *              - name: uid
    *                description: UUID of the corresponding jobseeker
    *                in: path
    *                requried: true
    *                type: string
    *              - name: c_id
    *                description: The id of the certification to be updated
    *                in: formData
    *                requried: true
    *                type: integer
    *              - name: cert_name
    *                description: The name of the cert
    *                in: formData
    *                requried: true
    *                type: string
    *              - name: start_date
    *                description: The start date of the cert
    *                in: formData
    *                requried: false
    *                type: string
    *              - name: end_date
    *                description: The end date of the education cert
    *                in: formData
    *                requried: false
    *                type: string
    *              - name: issuer
    *                description: The issuer of the cert
    *                in: formData
    *                requried: true
    *                type: string
    *          responses:
    *              200:
    *                  description: Successfully modified education experience
    *              400:
    *                  description: User could not be found
    *              500:
    *                  description: Internal server error
    */
   .put(cert.updateCert)

    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/certification/{c_id}:
     *      delete:
     *          description: Delete an certification from jobseeker
     *          tags:
     *              - Jobseeker, Certification
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: c_id
     *                description: id of the cert
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully delete the cert
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .delete(cert.deleteCert)

router.route('/:uid/dream_career/?:dream_career?')
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/dream_career:
     *      get:
     *          description: Returns the dream careers of specified jobseeker
     *          tags:
     *              - Jobseeker, Dream Career
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(dream_career.getDreamCareers)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/dream_career:
     *      post:
     *          description: Add a new dream career to a jobseeker table
     *          tags:
     *              - Jobseeker, Dream Career
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: dream_career
     *                description: Dream career to add for a user
     *                in: formData
     *                required: true
     *                type: string
     *              - name: ranking
     *                description: Ranking of the career
     *                in: formData
     *                required: false
     *                type: integer
     * 
     *          responses:
     *              200:
     *                  description: Successfully add the dream career
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .post(dream_career.addDreamCareers)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/dream_career/{dream_career}:
     *      delete:
     *          description: Delete a drema career added to the database for a jobseeker
     *          tags:
     *              - Jobseeker, Dream Career
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: dream_career
     *                description: Dream career to add for a user
     *                in: path
     *                required: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .delete(dream_career.deleteDreamCareers)

router.route('/:uid/dream_company/?:dream_company?')
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/dream_company:
     *      get:
     *          description: Returns the dream careers of specified jobseeker
     *          tags:
     *              - Jobseeker, Dream Company
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(dream_company.getDreamCompanies)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/dream_company:
     *      post:
     *          description: Add a new dream company to a jobseeker table
     *          tags:
     *              - Jobseeker, Dream Company
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: dream_company
     *                description: Dream company to add to the user
     *                in: formData
     *                required: true
     *                type: string
     *              - name: preference
     *                description: Preference of the company
     *                in: formData
     *                required: false
     *                type: integer
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .post(dream_company.addDreamCompanies)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/dream_company/{dream_company}:
     *      delete:
     *          description: Delete a dream company added to the database for a jobseeker
     *          tags:
     *              - Jobseeker, Dream Company
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: dream_company
     *                description: Dream company to delete from the user
     *                in: path
     *                required: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .delete(dream_company.deleteDreamCompanies)

router.route('/:uid/exp/?:exp_id?')
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/exp:
     *      get:
     *          description: Returns the experiences of specified jobseeker
     *          tags:
     *              - Jobseeker, Experiences
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .get(experience.getExp)
    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/exp:
     *      post:
     *          description: Add a new experience to jobseeker (ONLY SUPPORST 1 RIGHT NOW)
     *          tags:
     *              - Jobseeker, Experiences
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: title
     *                description: Title of the past job experience
     *                in: formData
     *                required: true
     *                type: string
     *              - name: start_date
     *                description: Starting date of job
     *                in: formData
     *                required: true
     *                type: string
     *              - name: end_date
     *                description: Ending date of job
     *                in: formData
     *                required: true
     *                type: string
     *              - name: description
     *                description: The description of the job
     *                in: formData
     *                required: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .post(experience.addExp)

    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/exp:
     *      put:
     *          description: update an experience from jobseeker (ONLY SUPPORST 1 RIGHT NOW)
     *          tags:
     *              - Jobseeker, Experiences
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: exp_id
     *                description: Experience ID of the specific experience
     *                in: formData
     *                required: true
     *                type: string
     *              - name: title
     *                description: Title of the past job experience
     *                in: formData
     *                required: true
     *                type: string
     *              - name: start_date
     *                description: Starting date of job
     *                in: formData
     *                required: true
     *                type: string
     *              - name: end_date
     *                description: Ending date of job
     *                in: formData
     *                required: true
     *                type: string
     *              - name: description
     *                description: The description of the job
     *                in: formData
     *                required: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully update the experience
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .put(experience.updateExp)

    /**
     *  @swagger
     * 
     *  /jobseeker/{uid}/exp/{exp_id}:
     *      delete:
     *          description: Delete an experience from jobseeker (ONLY SUPPORST 1 RIGHT NOW)
     *          tags:
     *              - Jobseeker, Experiences
     *          produces: 
     *              - application/json
     *          parameters:
     *              - name: uid
     *                description: UID for the specific user
     *                in: path
     *                requried: true
     *                type: string
     *              - name: exp_id
     *                description: Experience ID of the specific experience
     *                in: path
     *                required: true
     *                type: string
     * 
     *          responses:
     *              200:
     *                  description: Successfully get the Jobseeker
     *              400:
     *                  description: User could not be found
     *              500:
     *                  description: Internal server error
     * 
     * 
     */
    .delete(experience.deleteExp);

router.route('/:uid/resumes/?')
    /**
    *   @swagger
    * 
    *   /jobseeker/{uid}/resumes:
    *       get:
    *           description: Get all the resumes for an jobseeker
    *           tags:
    *               - Jobseeker | Resumes
    *           produces:
    *               - application/json
    *           parameters:
    *               - name: uid
    *                 description: The uid of the jobseeker of target
    *                 in: path
    *                 required: true
    *                 type: string
    *           responses:
    *               200:
    *                   description: Successfully returned back the all the resumes
    *               400:
    *                   description: One of the supplied argument does not follow our syntax
    *               404:
    *                   description: No job found or no employer is found
    *               422:
    *                   description: Information missing
    *               500:
    *                   description: There is an error in the backend
    *               
    */
    .get(resume.getAllResume);

router.route('/:uid/resumes/?:resume_id?/?')
    /**
    *   @swagger
    * 
    *   /jobseeker/{uid}/resumes/{resume_id}:
    *       get:
    *           description: Get a specific resume for a jobseeker
    *           tags:
    *               - Jobseeker | Resumes
    *           produces:
    *               - application/json
    *           parameters:
    *               - name: uid
    *                 description: The uid of the jobseeker of target
    *                 in: path
    *                 required: true
    *                 type: string
    *               - name: resume_id
    *                 description: The id of the target resume for the jobseeker
    *                 in: path
    *                 required: true
    *                 type: integer
    *           responses:
    *               200:
    *                   description: Successfully returned back the specified resume
    *               400:
    *                   description: One of the supplied argument does not follow our syntax
    *               404:
    *                   description: No job found or no employer is found
    *               422:
    *                   description: Information missing
    *               500:
    *                   description: There is an error in the backend
    *               
    */
    .get(resume.getResume)
    /**
    *   @swagger
    * 
    *   /jobseeker/{uid}/resumes:
    *       post:
    *           description: Create a specific resume for a jobseeker
    *           tags:
    *               - Jobseeker | Resumes
    *           produces:
    *               - application/json
    *           parameters:
    *               - name: uid
    *                 description: The uid of the jobseeker of target
    *                 in: path
    *                 required: true
    *                 type: string
    *               - name: resume_id
    *                 description: The id of the target resume for the jobseeker
    *                 in: path
    *                 required: true
    *                 type: integer
    *               - name: Resume Snapshot
    *                 description: The json of a resume
    *                 in: requestBody
    *                 required: true
    *                 type: array
    *                 items: {}
    *           responses:
    *               200:
    *                   description: Successfully created the resume
    *               400:
    *                   description: One of the supplied argument does not follow our syntax
    *               404:
    *                   description: No job found or no employer is found
    *               422:
    *                   description: Information missing
    *               500:
    *                   description: There is an error in the backend
    *               
    */
    .post(resume.createResume)
    /**
    *   @swagger
    * 
    *   /jobseeker/{uid}/resumes/{resume_id}:
    *       put:
    *           description: Update a specific resume for a jobseeker
    *           tags:
    *               - Jobseeker | Resumes
    *           produces:
    *               - application/json
    *           parameters:
    *               - name: uid
    *                 description: The uid of the jobseeker of target
    *                 in: path
    *                 required: true
    *                 type: string
    *               - name: resume_id
    *                 description: The id of the target resume for the jobseeker
    *                 in: path
    *                 required: true
    *                 type: integer
    *               - name: Resume Snapshot
    *                 description: The json of a resume that needs to be updated (Full json)
    *                 in: requestBody
    *                 required: true
    *                 type: array
    *                 items: {}
    *           responses:
    *               200:
    *                   description: Successfully updated the resume for the jobseeker
    *               400:
    *                   description: One of the supplied argument does not follow our syntax
    *               404:
    *                   description: No job found or no employer is found
    *               422:
    *                   description: Information missing
    *               500:
    *                   description: There is an error in the backend
    *               
    */
    .put(resume.updateResume)
    /**
    *   @swagger
    * 
    *   /jobseeker/{uid}/resumes/{resume_id}:
    *       delete:
    *           description: Delete a specific resume for a jobseeker
    *           tags:
    *               - Jobseeker | Resumes
    *           produces:
    *               - application/json
    *           parameters:
    *               - name: uid
    *                 description: The uid of the jobseeker of target
    *                 in: path
    *                 required: true
    *                 type: string
    *               - name: resume_id
    *                 description: The id of the target resume for the jobseeker
    *                 in: path
    *                 required: true
    *                 type: integer
    *           responses:
    *               200:
    *                   description: Successfully deleted the resume
    *               400:
    *                   description: One of the supplied argument does not follow our syntax
    *               404:
    *                   description: No job found or no employer is found
    *               422:
    *                   description: Information missing
    *               500:
    *                   description: There is an error in the backend
    *               
    */
    .delete(resume.deleteResume);

module.exports = router;