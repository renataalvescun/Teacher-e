import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [StudentModule, MongooseModule.forRoot( 'mongodb+srv://renata-alves:senha123@teacher-e.z32j3ri.mongodb.net/?retryWrites=true&w=majority' ), TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
