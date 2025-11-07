import jwt from 'jsonwebtoken';
import {sendForbidden} from "./response.interceptor.js";
import {ForbiddenError} from "../error-definition.js";

const token = 'Bearer ejyklksdmioijdfd.oisidjfiosdjsioisdijsiojodifdff.dijoifjifodiidsodaiz'

export const checkToken = (req, res, next) => {
    try {
        const authorizationToken = req.headers['authorization']?.split(' ')[1];
        if(!authorizationToken) throw new ForbiddenError('Invalid token or no token provided');
        const payload = jwt.verify(authorizationToken, '5001d2609009b634fc4a272d955cc27b02d03575769cd5f8971c117beb3e320e538a959bcd5db975a71bd23367468882155f6db010925733ea3772f3af50dc5ce671e45b4e028dd1057d73359cf0942071fe1390682891e0e6485ca8f9fbc923e78c00006404fbf5d7ca7032db6f192d1f2530afe691d7d36580606de5fc8a7d');
        req.user = payload;
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}

export const checkUserRole = (...roles) => {
    return (req, res, next) => {
        const role = req.user.role;
        if(!roles.includes(role)) throw new ForbiddenError('You are not authorized to make this request');
        next();
    }
}