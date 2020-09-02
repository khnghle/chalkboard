const router = require('express').Router()
const {Submission} = require('../db/models')
const path = require('path')

module.exports = router

console.log('on the submission api page')

router.post('/:assignment', async (req, res, next) => {
    
    let image = req.files.image;  
    image.mv(path.resolve(__dirname,'/Users/zachbryce/senior/chalkboard/public/img',image.name))
    const pic = '/Users/zachbryce/senior/chalkboard/public/img' + image.name
    try{
        await Submission.create({
            studentId: req.query.student,
            assignmentName: req.params.assignment,
            courseId: req.query.course,
            image: image
        })
    } catch (err) {
        console.log(err)
    }
    
 
})

router.get('/:courseId', async (req, res, next) => {

    try{
        const submissions = await Submission.findAll({
            where: {
                courseId: req.params.courseId
            }
        })
        res.json(submissions)
    }catch(err){
        console.log(err)
    }
})