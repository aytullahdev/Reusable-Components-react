import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CaseStudyDocument = HydratedDocument<CaseStudy>;
@Schema({ timestamps: true })
export class CaseStudy{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;
}

export const CaseStudySchema = SchemaFactory.createForClass(CaseStudy)