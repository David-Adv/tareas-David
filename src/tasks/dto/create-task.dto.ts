import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsOptional()
    id?: string;
 
    @IsString()
    @MaxLength(15)
    name: string;
 
    @IsString()
    @MaxLength(45)
    description: string;
    @IsOptional()
    priority?: number;
    @IsOptional()
    @IsDateString()
    scheduledTime?: string;
}
