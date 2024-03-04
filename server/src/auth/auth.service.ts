import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const valid = await bcrypt.compare(password, user.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOneByEmail(loginUserInput.email);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
      user,
    };
  }

  async register(createUserInput: CreateUserInput) {
    const user = await this.usersService.findOneByEmail(createUserInput.email);

    if (user) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(createUserInput.password, 10);

    return this.usersService.create({
      ...createUserInput,
      password,
    });
  }
}
