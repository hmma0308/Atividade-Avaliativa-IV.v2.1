import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const registerUser = async (userData) => {
    const { username, password, email } = userData;

    // Start a transaction to ensure data consistency
    const transaction = await db.sequelize.transaction();

    try {
        // 1. Check for existing user (case-insensitive search)
        const existingUser = await db.users.findOne({
            where: {
                email: db.sequelize.where(
                    db.sequelize.fn('LOWER', db.sequelize.col('email')),
                    db.sequelize.fn('LOWER', email)
                )
            },
            transaction
        });

        if (existingUser) {
            await transaction.rollback();
            throw {
                code: 'EMAIL_EXISTS',
                message: 'Email already registered'
            };
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user (email stored in lowercase)
        const newUser = await db.users.create({
            username,
            password: hashedPassword,
            email: email.toLowerCase() // Normalize to lowercase
        }, { transaction });

        // Commit the transaction
        await transaction.commit();
        
        return newUser;

    } catch (error) {
        // Rollback transaction on error
        await transaction.rollback();

        // Handle PostgreSQL unique violation error (code 23505)
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw {
                code: 'EMAIL_EXISTS',
                message: 'Email already registered'
            };
        }

        console.error('Registration error:', error);
        throw {
            code: 'REGISTRATION_FAILED',
            message: 'Could not complete registration'
        };
    }
};

const login = async (credentials) => {
    const user = await db.users.findOne({ username: credentials.username });

    if (!user) return { code: 'Login_Bad_Email', message: 'User not found' };
    
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) return { code: 'Login_Bad_Password', message: 'Invalid password' };

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
        expiresIn: '1h' 
    });
    
    return { 
        code: 'Login_Successful', 
        message: 'Login successful', 
        token 
    };
};

export default { registerUser, login };
