import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
    // return { statusCode: req.res.statusCode, message: 'Logged in!' };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    /* google handles rest */
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleClb(@Request() req, @Res() res) {
    const user = { id: req.user._json.sub, username: req.user._json.email };
    // save the user to db and make jwt and assig to header
    const jwt = await this.authService.login(user);
    res.json(jwt);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req) {
    return req.user;
  }
}
