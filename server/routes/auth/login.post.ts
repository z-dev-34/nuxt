
import { getUserByEmail } from "../../models/index";
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody<{ email: string; password: string; }>(event);

    const { email, password } = body;

    if (!email || !password) {
        return createError({
            statusCode: 400,
            message: "Email address and password are required",
        });
    }

    const userWithPassword = await getUserByEmail(email);

    if (!userWithPassword) {
        return createError({
            statusCode: 401,
            message: "Bad credentials",
        });
    }

    const verified = await verify(password, userWithPassword.password);
    console.log('verify',verified)
    if (!verified) {
        return createError({
            statusCode: 401,
            message: "Bad credentials",
        });
    }
    
    const payload = {
        sub:userWithPassword.id,
        email:userWithPassword.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        
    }
    const token = await jwt.sign(payload,process.env.SECRET_KEY)
    setCookie(event, '_token', token)
    return {
        email:userWithPassword.email,
        token
    }
});