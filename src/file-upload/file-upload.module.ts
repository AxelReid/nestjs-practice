import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityFactory } from 'src/ability/ability.factory';
import { File } from './entities/file.entity';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileUploadController],
  providers: [FileUploadService, AbilityFactory],
})
export class FileUploadModule {}
