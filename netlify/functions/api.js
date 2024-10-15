import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

const api = express();
const router = Router();

// const pastebinAPI = process.env.PASTEBIN_API_KEY || "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";


api.use("/api/", router);

export const handler = serverless(api);
