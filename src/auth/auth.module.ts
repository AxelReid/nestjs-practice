import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule /*.register({ session: true })*/,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: jwtConstants().secret,
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy /*SessionSerializer*/,
    JwtStrategy,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
