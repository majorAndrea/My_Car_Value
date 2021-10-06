import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { SignUpUserDto } from './dtos/sign-up-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Serialize(UserDto)
  signUpUser(@Body() newUser: SignUpUserDto): Promise<User> {
    return this.authService.signUpUser(newUser.email, newUser.password);
  }

  @Post('/signin')
  @HttpCode(200)
  signInUser(
    @Body() userCredentials: SignInUserDto,
  ): Promise<{ token: string }> {
    return this.authService.signInUser(
      userCredentials.email,
      userCredentials.password,
    );
  }
}
