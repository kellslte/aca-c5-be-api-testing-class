import * as userService from '../users/users.service.js';
import jwt from 'jsonwebtoken';
import {comparePassword} from "../../common/utils.js";
import {AuthenticationError, ConflictError, NotFoundError} from "../../common/error-definition.js";

export const signUp = async (payload) => {
    const user  = await userService.getUserByEmail(payload.email);
    if(user) throw new ConflictError('This email has been taken');
    const {password, ...details } = await userService.createUser(payload);
    return details;
}

export const signIn = async (payload) => {
    const user = await userService.getUserByEmail(payload.email);
    if(!user) throw new NotFoundError('Invalid email or password');
    if(!(await comparePassword(payload.password, user.password))) throw new AuthenticationError('Invalid email or password');
    delete user.password;
    const token = jwt.sign({
        ...user,
        id: user._id
    }, '5001d2609009b634fc4a272d955cc27b02d03575769cd5f8971c117beb3e320e538a959bcd5db975a71bd23367468882155f6db010925733ea3772f3af50dc5ce671e45b4e028dd1057d73359cf0942071fe1390682891e0e6485ca8f9fbc923e78c00006404fbf5d7ca7032db6f192d1f2530afe691d7d36580606de5fc8a7d', {
        expiresIn: '1d'
    });
    return token;
}

export const getUser = async (id) => {
    const user = await userService.getUserById(id);
    if(!user) return null;
    delete user.password;
    return user;
}