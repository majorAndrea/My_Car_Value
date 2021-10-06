import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/user.entity';

/**
 * @decorator GetUser
 * @return Custom param decorator to get the current user.
 */
export const GetUser = createParamDecorator(
  (_, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
