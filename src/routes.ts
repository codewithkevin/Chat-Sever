import { Express, Request, Response } from "express";
import chatRoutes from "./chat/routes"


export default (app: Express) => {
    app.get("/api/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.use("/api/chat", chatRoutes);
}