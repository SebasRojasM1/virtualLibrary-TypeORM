import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    @IsOptional()
    id: number;
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(3, { message: 'El nombre debe contener al menos 3 caracteres.' })
    @MaxLength(50, { message: 'El nombre del autor no puede contener más de 50 caracteres.' })
    name: string;
}
