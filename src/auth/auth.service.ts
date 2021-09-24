import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private usersService: UsersService,
  ) {}

  async signUpUser(email: string, password: string) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.repo.create({ email, password: hashedPassword });

    return this.repo.save(newUser);
  }

  async signInUser(email: string, password: string) {
    const [foundUser] = await this.usersService.find(email);

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      return foundUser;
    } else {
      throw new UnauthorizedException('Invalid email or password!');
    }
  }
}
