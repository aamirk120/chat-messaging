import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class User {
    @IsInt()
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsOptional()
    last_name?: string;
}
