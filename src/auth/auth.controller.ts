import {
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService
      .validateUser(req.body.username, req.body.password)
      .then((user) => {
        console.log(user);
        return this.authService.login(user);
      })
      .catch(() => {
        throw new UnauthorizedException('Invalid credentials');
      });
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Request() req) {
    // Your logout logic here (optional)
  }
}
