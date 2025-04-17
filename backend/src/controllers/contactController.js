const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

exports.submitContact = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, subject, message } = req.body;

        const contact = await Contact.create({
            firstName,
            lastName,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error submitting contact form', 
            error: error.message 
        });
    }
};