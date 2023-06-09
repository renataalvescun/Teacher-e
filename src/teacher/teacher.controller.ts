import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Teacher } from './teacher.model';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService:TeacherService) {}

    @Get()
    readAllteachers(): Promise<any>{
        return this.teacherService.readTeachers();
    }

    @Get(':drt')
    readTeacher( @Param('drt') drt: number): Promise<any>{
        return this.teacherService.readTeacher(drt);
    }

    @Post()
    async createTeacher(@Body() teacher: Teacher): Promise<any>{
        var response = await this.teacherService.createTeacher(teacher);
        return {id: response};
    }

    @Patch()
    async updateteacher( @Body() teacher: Teacher){
        await this.teacherService.updateTeacher(teacher);
    }

    @Delete(':drt')
    async deleteTeacher(@Param('drt') drt: number){
        await this.teacherService.deleteTeacher(drt);
        return null;
    }

}
