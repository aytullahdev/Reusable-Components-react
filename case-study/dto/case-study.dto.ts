import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateCaseStudyDto{
    @ApiProperty({
        example: "Case Study",
        description:"The name of the Case Study"
    })
    @MaxLength(255, { message: "Name is too long" })
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: "Name must be a string" })
    name: string;

    @ApiProperty({
        example: "A description of Case Study",
        description: "The description of the project",
    })
    @IsNotEmpty({ message: "Description is required" })
    @IsString({ message: "Description must be a string" })
    description: string;
    
}