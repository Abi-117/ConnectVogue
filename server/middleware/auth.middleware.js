const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/Admin');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const admin = await AdminUser.findOne({ email });
    if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return res.json({
        token,
        admin: { name: admin.name, email: admin.email }
    });
});

module.exports = router;
