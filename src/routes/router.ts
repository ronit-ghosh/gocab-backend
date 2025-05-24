import { Router } from "express";
import riderRouter from "@controller/rider";
import driverRouter from "@controller/driver";

const rootRouter = Router();

rootRouter.use('/driver', driverRouter);
rootRouter.use('/rider', riderRouter);

export default rootRouter;
