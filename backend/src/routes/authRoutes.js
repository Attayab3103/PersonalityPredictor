const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const passport = require('../config/passport');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Regular auth routes
router.post('/signup', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
], signup);

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], login);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        session: false 
    })
);

router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: `${process.env.FRONTEND_URL}/login?error=Authentication failed`,
        session: false
    }),
    async (req, res) => {
        try {
            if (!req.user) {
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=Authentication failed`);
            }
            const token = req.user.generateToken();
            res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&userId=${req.user._id}`);
        } catch (error) {
            console.error('Google callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=Authentication failed`);
        }
    }
);

// Facebook OAuth routes
router.get('/facebook',
    passport.authenticate('facebook', { 
        scope: ['email', 'public_profile'],
        session: false
    })
);

router.get('/facebook/callback',
    passport.authenticate('facebook', { 
        failureRedirect: `${process.env.FRONTEND_URL}/login?error=Authentication failed`,
        session: false
    }),
    async (req, res) => {
        try {
            if (!req.user) {
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=Authentication failed`);
            }
            const token = req.user.generateToken();
            res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&userId=${req.user._id}`);
        } catch (error) {
            console.error('Facebook callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=Authentication failed`);
        }
    }
);

// User profile route
router.get('/user/profile', protect, (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profilePic: req.user.profilePic
    });
});

module.exports = router;
