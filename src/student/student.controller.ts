import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService:StudentService) {}

    @Get()
    readAllStudents(): Promise<any>{
        return this.studentService.readStudents();
    }

    @Get(':tia')
    readStudent( @Param('tia') tia: string): Promise<any>{
        return this.studentService.readStudent(tia);
    }

    @Post()
    async createStudent(@Body() student: Student): Promise<any>{
        var response = await this.studentService.createStudent(student);
        return {id: response};
    }

    @Patch()
    async updateStudent( @Body() student: Student){
        await this.studentService.updateStudent(student);
    }

    @Delete(':tia')
    async deleteStudent(@Param('tia') tia: number){
        await this.studentService.deleteStudent(tia);
        return null;
    }
}
