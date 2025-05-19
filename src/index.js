import express from 'express';
import db from './models/index.js'
import userRoute from './routes/user.routes.js'
import exampleRoute from './routes/example.routes.js';
import taskRoute from './routes/task.routes.js';
import swaggerRoute from './routes/swagger.route.js';
import cors from 'cors';

db.sequelize.sync()
    .then(() => {
        console.log("Database synced successfully.");
    })
.catch((error) => {
    console.error("Error syncing database:", error);
});

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://effective-guide-9r4pxjr6gxr2x675-5173.app.github.dev',
    'https://atividade-avaliativa-iv-final.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/users', userRoute);
app.use("/secureExampleRoute", exampleRoute);
app.use('/tasks', taskRoute);
app.use(swaggerRoute);

app.get('/', (req, res) => {
    res.send({message: 'Hello World!'});
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});