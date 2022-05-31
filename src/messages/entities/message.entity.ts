import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class Message {
    @IsInt()
    id: number;

    @IsInt()
    to: number;

    @IsInt()
    from: number;

    @IsString()
    @IsNotEmpty()
    text: string;
}
