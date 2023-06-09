import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from './teacher.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {

    constructor( @InjectModel('teacher') private readonly teacherModel: Model<Teacher> ){}

    // CRUD - CREATE, READ, UPDATE, DELETE
    //CREATE
    async createTeacher(teacher: Teacher){
        const teacherModel = new this.teacherModel(
            {
                name: teacher.name, 
                drt: teacher.drt
            }
        );
        const result = await teacherModel.save();
        return result.id as string;
    }
    
    // READ
    async readTeachers(){
        const teachers = await this.teacherModel.find().exec();
        return teachers;
    }

    // READ BY DRT
    async readTeacher(drt: number){
        const teachers = await this.teacherModel.findOne({drt: drt}).exec();
        return teachers;
    }

    // UPDATE
    async updateTeacher(teacher: Teacher){
        const updatedTeacher = await this.teacherModel.findOne({drt: teacher.drt});
        if (!updatedTeacher){
            throw new NotFoundException('Could not find the teacher.');
        }
        if (teacher.name){
            updatedTeacher.name = teacher.name
        }
        updatedTeacher.save()
    }

    // DELETE
    async deleteTeacher(drt: number){
        const result = await this.teacherModel.deleteOne({drt: drt}).exec(); 
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not delete the teacher');
        }
    }
}

