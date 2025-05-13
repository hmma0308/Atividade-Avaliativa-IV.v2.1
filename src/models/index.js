import dbConfig from '../config/db.config.js';
import { Sequelize } from 'sequelize';
import User from './User.js';
import pg from 'pg';
import Task from './Task.js';

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: process.env.DATABASE_URL.includes('neon.tech') ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {},
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
            evict: dbConfig.pool.evict
        },
        logging: console.log
    })
    : new Sequelize(
        dbConfig.database,
        dbConfig.user,
        dbConfig.password,
        {
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            port: dbConfig.port,
            dialectModule: pg,
            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle,
                evict: dbConfig.pool.evict
            },
            logging: console.log
        }
    );

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = User(sequelize, Sequelize);
db.tasks = Task(sequelize, Sequelize);

db.users.hasMany(db.tasks, { foreignKey: 'userId' });
db.tasks.belongsTo(db.users, { foreignKey: 'userId' });

export default db;