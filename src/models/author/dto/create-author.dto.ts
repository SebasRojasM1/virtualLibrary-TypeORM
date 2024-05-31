import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthorDto {
    @IsNumber()
    @IsOptional()
    id: number;
  
    @ApiProperty()
    @IsString()
    name: string;
}
