import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teacher.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'teacher', schema: TeacherSchema}]) ],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}
