import { PartialType } from "@nestjs/swagger";
import { CreateCaseStudyDto } from "./case-study.dto";


export class UpdateCaseStudyDto extends PartialType(CreateCaseStudyDto){}