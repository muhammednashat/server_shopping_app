


const router =  require('express').Router()
const authControllers = require('../controllers/auth')

const {body} = require('express-validator')

const validateUser = [
    body('name').not().isEmpty().withMessage("name is required"),
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min:8}).withMessage("please enter a long password")
    .isStrongPassword().withMessage("please enter a strong password"),
    body('phone').isMobilePhone().withMessage('please enter a valid phone')
]

const validateLogin =[
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').notEmpty("password is required")
]

router.post('/login',authControllers.login)

router.post('/register', authControllers.register)

router.post('/forgotPassword',authControllers.forgotPassword)

router.post('/verifyPasswordOtp',authControllers.verifyPasswordOtp)
router.post('/resetPassword',authControllers.resetPassword)


module.exports = router