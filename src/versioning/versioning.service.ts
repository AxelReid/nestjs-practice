import { Injectable } from '@nestjs/common';

@Injectable()
export class VersioningService {
  hello() {
    return 'Hello versioning';
  }
}
