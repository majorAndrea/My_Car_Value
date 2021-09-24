import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { SignUpUserDto } from './dtos/sign-up-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUpUser(@Body() newUser: SignUpUserDto) {
    return this.authService.signUpUser(newUser.email, newUser.password);
  }

  @Post('/signin')
  @HttpCode(200)
  signInUser(@Body() userCredentials: SignInUserDto) {
    return this.authService.signInUser(
      userCredentials.email,
      userCredentials.password,
    );
  }
}
