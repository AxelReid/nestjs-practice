import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';
import { VersioningModule } from './versioning/versioning.module';
import { AbilityModule } from './ability/ability.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    FileUploadModule,
    VersioningModule,
    AbilityModule,
  ],
})
export class AppModule {}
