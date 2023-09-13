import {
  Controller,
  Request,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch {
      throw new NotFoundException();
    }
  }
}
