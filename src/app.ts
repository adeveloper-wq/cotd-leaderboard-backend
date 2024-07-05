import "dotenv/config";
import express, { json, Request, Response, NextFunction } from "express";
import cors from "cors";
import { AdminRouter, TotdRouter, PlayerRouter, ImagesRouter, AuthenticationRouter, LeaderboardRouter, ServiceRouter, ChallengeRouter, CotdRouter } from "./routes";
import createHttpError, { isHttpError } from "http-errors";
import { Log } from "./util";

const app = express();

app.use(cors());
app.use(json());

app.use("/admin", AdminRouter);
app.use("/authentication", AuthenticationRouter);
app.use("/totd", TotdRouter);
app.use("/cotd", CotdRouter);
app.use("/challenge", ChallengeRouter);
app.use("/img", ImagesRouter);
app.use("/leaderboard", LeaderboardRouter);
app.use("/service", ServiceRouter);
app.use("/player", PlayerRouter);

// Handling of unknown endpoints
app.use((request, response, next) => {
    next(createHttpError(404, "Endpoint not found."));
})

// Error handling
app.use((error: unknown, request: Request, response: Response, next: NextFunction) => {
    const errorMessage = isHttpError(error) ? error.message : "An unknown error occured.";
    const errorStatus = isHttpError(error) ? error.status : 500;
    Log.error(`Status ${errorStatus}: ${errorMessage}`);
    response.status(errorStatus).json({ error: errorMessage });
});

export default app;