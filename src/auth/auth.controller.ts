import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard/jwt-refresh.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return { data: await this.authService.getUserAccessTokens(data) };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  async refresh(@Req() req) {
    // const accessToken = await this.authService.getAccessToken(
    //   req.user.userId,
    //   //req.user.username,
    // );
    // return { accessToken };
  }
}
