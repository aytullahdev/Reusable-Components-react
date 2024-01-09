import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CaseStudy, CaseStudySchema } from "./schemas/case-study.schema";
import { CaseStudyController } from "./controllers/case-study.controller";
import { CaseStudyService } from "./providers/case-study-services";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: CaseStudy.name, schema:CaseStudySchema
        }])
    ],
    controllers: [CaseStudyController],
    providers: [CaseStudyService],
})

export class CaseStudyModule { }