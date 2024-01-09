import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CaseStudy, CaseStudyDocument } from "../schemas/case-study.schema";
import { Model } from "mongoose";
import { CreateCaseStudyDto } from "../dto/case-study.dto";
import { UpdateCaseStudyDto } from "../dto/update-case-study-dto";

@Injectable()

export class CaseStudyService{
    constructor(
        @InjectModel(CaseStudy.name) private caseStudyModel: Model<CaseStudy>
    ) { }

    async create(createCaseStudyDto: CreateCaseStudyDto): Promise<CaseStudyDocument> {
        const createdCaseStudy = new this.caseStudyModel(createCaseStudyDto);
        return createdCaseStudy.save();

    }

    async findAll(): Promise<CaseStudyDocument[]>{
        return this.caseStudyModel.find().exec();
    }

    async findOne(id: string): Promise<CaseStudyDocument>{
        const caseStudy = await this.caseStudyModel.findById(id).exec();
        if (!caseStudy) {
            throw new NotFoundException(`Case Study with id ${id} not exist`);

        }

        return caseStudy;
    }

    async update(id: string, updateCaseStudyDto: UpdateCaseStudyDto): Promise<CaseStudyDocument> {
        const existiongCaseStudy = await this.caseStudyModel.findByIdAndUpdate(id, updateCaseStudyDto, { new: true }).exec();

        if (!existiongCaseStudy) {
            throw new NotFoundException(`Case Study with id ${id} not exist`);
        }
        return existiongCaseStudy;  
    }

    async remove(id: string): Promise<CaseStudyDocument>{
        const deletedCaseStudy = await this.caseStudyModel.findByIdAndDelete(id).exec();
        if (!deletedCaseStudy) {
            throw new NotFoundException(`Case Study with id ${id} not exist`);
        }
        return deletedCaseStudy;
    }
}