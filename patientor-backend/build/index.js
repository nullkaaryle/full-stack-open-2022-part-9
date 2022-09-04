"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import cors from 'cors';
const app = (0, express_1.default)();
app.use(express_1.default.json());
//app.use(cors());
//app.use(cors as (options: cors.CorsOptions) => express.RequestHandler);
//app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
const PORT = 3001;
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
