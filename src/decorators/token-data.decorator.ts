import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const TokenData = createParamDecorator(
    (key: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.user) {
            return undefined;
        }
        
        if (key) {
            return request.user[key]
        }
        return request.user;

    }
)