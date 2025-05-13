import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import express from "express";
const router = express.Router();

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Atividade-Avaliativa-IV.V2.1.0",
            version: "1.0.0",
            description: "API documentada com Swagger",
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/docs", serve, setup(swaggerDocs));

export default router;