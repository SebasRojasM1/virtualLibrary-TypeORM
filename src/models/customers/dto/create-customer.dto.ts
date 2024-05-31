import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail({}, { message: 'The email it´s not valid. Try again.' })
    @IsNotEmpty()
    email: string;
}
