import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserAccessTokens(data: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: ILike(data.email) },
    });

    if (!user) {
      throw new HttpException('Invalid Credendential', 422);
    }

    return {
      user: user,
      accessToken: await this.getAccessToken(user),
    };
  }

  async getAccessToken(user: User) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: '15m',
    });
  }

  async getRefreshToken(userId: number, username: string) {
    const payload = { username, sub: userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: '7d',
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.findUserById(userId); // Replace with your user fetching logic
    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (isMatch) {
      return user;
    }
    return null;
  }

  private async findUserById(userId: number) {
    // Replace this with your actual user fetching logic
    return {
      userId,
      username: 'testUser',
      refreshToken: await bcrypt.hash('refreshToken', 10),
    };
  }
}
