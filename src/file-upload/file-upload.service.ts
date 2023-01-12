import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readdirSync, rmdirSync, unlinkSync } from 'fs';
import { Repository } from 'typeorm';
import { UploadFileDto } from './dto/upload-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FileUploadService {
  constructor(@InjectRepository(File) private fileRepo: Repository<File>) {}

  saveFiles(files: UploadFileDto[], userId: number) {
    const newFiles = this.fileRepo.create(
      files.map((file) => ({ userId, ...file })),
    );
    return this.fileRepo.save(newFiles);
  }

  getUploadedFiles() {
    return this.fileRepo.find();
  }

  // LEARN: graceful-fs
  async deleteFile(fileId: number) {
    const file = await this.fileRepo.findOneBy({ id: fileId });
    if (!file) throw new NotFoundException("File doesn't exist");

    // removing from folder and db
    this.fileRepo.remove(file);
    unlinkSync(file.path);

    // Removing parent folder if empty
    const dir = file.path.replace('/' + file.filename, '');
    const empty = !readdirSync(dir).length;
    if (empty) rmdirSync(dir);

    return file;
  }
}
