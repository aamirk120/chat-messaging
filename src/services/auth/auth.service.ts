import { User } from './../../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor() { }

    generateToken(user: User) {
        delete user.password;
        return jwt.sign(user, "TOKEN_SECRET_KEY", { expiresIn: "2d" });
    };

    validateToken(token: string | undefined): object | false {
        try {
            if (!token) {
                console.error("[validateToken]", "Authorization token is missing.");
                return false
            }

            if (token.split(" ")[0] !== "Bearer") {
                console.error("[validateToken]", "Authorization token is not Bearer Type");
                return false
            }

            token = token.split(" ")[1];

            const token_data = jwt.verify(token, "TOKEN_SECRET_KEY");

            if (!token_data) {
                console.error("[validateToken]", "Token Decode Error");
                return false;
            }
            return token_data
        } catch (e) {
            console.error("[ValidateToken][ERROR]", e);
            return false;
        }
    };

}
