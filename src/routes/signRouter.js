import { Router } from 'express';
import {validSignUp, validSignIn} from "../middleware/schemaMiddleware.js";
import {schemaSignIn, schemaSignUp} from "../schemas/signSchema.js"; 
import {signInFunction, signUpFunction} from "../controllers/signController.js";

const signRoute = Router();

signRoute.post("sign-in", validSignIn(schemaSignIn) ,signInFunction);

signRoute.post("sign-up", validSignUp(schemaSignUp) ,signUpFunction);

export default signRoute;