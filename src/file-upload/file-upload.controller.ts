import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { File } from './entities/file.entity';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { dest, fname } from './config/storageOptions';
import { Action } from 'src/ability/action.enum';
import { PoliciesGuard } from 'src/ability/guards/policies.guard';
import { CheckPolicies } from 'src/ability/decorators/check-policies.decorator';

@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadservice: FileUploadService) {}

  // @ApiHeader to multipart
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'files', type: 'file' })
  @UseInterceptors(
    FilesInterceptor('files', undefined, {
      storage: diskStorage({
        destination: (req, file, cb) => cb(null, dest()),
        filename: (req, file, cb) => cb(null, fname(file.originalname)),
      }),
    }),
  )
  @Post()
  uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
  ) {
    return this.fileUploadservice.saveFiles(files, req.user.id);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard, AbilitiesGuard)
  // @CheckAbilities({ action: Action.Delete, subject: File })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, File))
  deleteFile(@Param('id', ParseIntPipe) fileId: number) {
    return this.fileUploadservice.deleteFile(fileId);
  }

  @ApiOkResponse({ type: [File] })
  @Get()
  getFiles() {
    return this.fileUploadservice.getUploadedFiles();
  }
}
