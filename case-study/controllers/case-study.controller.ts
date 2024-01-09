import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateCaseStudyDto } from "../dto/case-study.dto";
import { CaseStudyService } from "../providers/case-study-services";
import { UpdateCaseStudyDto } from "../dto/update-case-study-dto";

@ApiTags("Case Study")
@Controller("case-study")
export class CaseStudyController {
    constructor(private readonly caseStudyService: CaseStudyService) { }
    @Post()
    @ApiOperation({
        summary: "Create a new Case Study",
        description: "Endpoint to create a new Case Study",
    })
    @ApiCreatedResponse({ description: "Case Study created successfully" })
    @ApiBadRequestResponse({ description: "Bed Request" })
    async create(@Body() createCaseStudyDto: CreateCaseStudyDto) {
        return this.caseStudyService.create(createCaseStudyDto)
    }

    @Get()
    @ApiOperation({
        summary: "Get all Case Studys",
        description:"Endpoint to retrieve all Case Studys",
    })
    @ApiOkResponse({
        description:"Case Studys retrieved successfully"
    })
    async findAll() {
        return this.caseStudyService.findAll();
   }
    @Get(":id")
    @ApiOperation({
        summary: "Get a Case Study by id",
        description: "Endpoint to retrieve a case study by id"
    })
    @ApiOkResponse({
        description:"Case Study retrieve successfully"
    })
    @ApiNotFoundResponse({
        description:"Case Study not found"
    })
    async findOne(@Param("id") id: string) {
        return this.caseStudyService.findOne(id);
    }
    @Patch(":id")
    @ApiOperation({
        summary: "Update a Case Study by id",
        description: "Endpoint to update a Case Study by id",
    })
    @ApiOkResponse({ description: "Case Study updated    successfully" })
    @ApiNotFoundResponse({ description: "Case Study not  found" })
    async update(
        @Param("id") id: string,
        @Body() updatecaseStudyDto: UpdateCaseStudyDto
    ) {
        return this.caseStudyService.update(id,  updatecaseStudyDto);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a Case Study by id",
        description: "Endpoint to delete a Case Study by id",
    })
    @ApiOkResponse({ description: "Case Study deleted    successfully" })
    @ApiNotFoundResponse({ description: "Case Study not  found" })
    async remove(@Param("id") id: string) {
        return this.caseStudyService.remove(id);
    }

}