import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {

    @IsInt()
    to: number;

    @IsInt()
    from: number;

    @IsString()
    @IsNotEmpty()
    text: string;
}
