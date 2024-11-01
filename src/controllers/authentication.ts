import express from "express";
import { getUserByEmail, createUser } from '../db/users'
import { random, authentication } from '../helpers/index'

export const login = async (req: express.Request, res:express.Response):Promise<any>=> {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("Please fill all the details")
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user){
            console.log("Email Id doesn't exisits")
            return res.sendStatus(400);
        }

        if (!user.authentication || !user.authentication.salt || !user.authentication.password) {
            console.log("Authentication details are missing")
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            console.log("Password did not match")
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('AUTH-HANDLER', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async(req:express.Request, res:express.Response):Promise<any>=>{
    try {
        const { email,password, username } = req.body;

        if(!email || !password || !username){
            console.log("Please fill all the details")
            return res.sendStatus(400);
        }

        const exisitingUser = await getUserByEmail(email);

        if(exisitingUser){
            console.log("Email Id Exisits")
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: authentication(salt,password)
            }
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}