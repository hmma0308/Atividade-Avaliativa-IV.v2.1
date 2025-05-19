import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const registerUser = async (userData) => {
    const { username, password, email } = userData;

    const existingUser = await db.users.findOne({ where: { email } });
    if (existingUser) {
        throw { code: 11000 };
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await db.users.create({
        username,
        password: hashedPassword,
        email
    });
};

const login = async (credentials) => {
    // 1. Find the user by username or email
    const user = await db.users.findOne({ 
        where: { 
            email: credentials.email // or username: credentials.username
        } 
    });

    // 2. Add debug logs to verify the correct user is found
    console.log("User found in DB:", user?.id); // Should log 3 (not 2)

    if (!user) return { code: 'Login_Bad_Email', message: 'User not found' };
    
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) return { code: 'Login_Bad_Password', message: 'Invalid password' };

    // 3. Verify the token payload before signing
    console.log("Creating token for userId:", user.id); // Should log 3 (not 2)
    
    const token = jwt.sign(
        { id: user.id }, // ⚠️ This MUST be user.id (3), but it's currently 2
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { 
        code: 'Login_Successful', 
        message: 'Login successful', 
        token 
    };
};

export default { registerUser, login };
