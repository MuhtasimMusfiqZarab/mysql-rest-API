//this extracts the user from the req object which was injected by passport
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//this is a custom decorator which helps us to retrieve req.user injected by passport js
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
