import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VersioningService } from './versioning.service';

@ApiTags('Versioning')
@Controller({ path: 'versioning' })
export class VersioningController {
  constructor(private versioningService: VersioningService) {}

  @Version('1')
  @Get()
  sayHello() {
    return this.versioningService.hello();
  }

  @Version('2')
  @Get()
  sayHello2() {
    return this.versioningService.hello();
  }

  @Version(VERSION_NEUTRAL)
  @Get('both')
  both() {
    return 'both versions';
  }
}
