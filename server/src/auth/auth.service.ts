import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, email: string) {
    console.log('Incoming registration:', username, email);
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { username, password: hashed, email },
    });
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return {
      access_token: token,
      user: { username: user.username },
    };
  }
}
