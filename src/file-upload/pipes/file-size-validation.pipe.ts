import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidatiopPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value, metadata });

    const oneKB = 1000;
    const oneMB = 1000000;

    return oneKB <= value.size && value.size <= oneMB * 5;
  }
}
