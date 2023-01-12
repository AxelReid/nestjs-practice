import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VersioningService } from './versioning.service';

@ApiTags('Versioning')
@Controller({ path: 'versioning', version: '2' })
export class VersioningV2Controller {
  constructor(private versioningService: VersioningService) {}

  @Get()
  sayHello() {
    return 'Hello versioning from V2';
  }
}
