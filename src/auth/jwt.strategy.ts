import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'newtopsecret',
    });
  }

  //this method must exists for every strategy
  //this validate method must be here
  //this mehtod will be invoked whenever the jwt is valid\
  //whatever we return from here will be injected into the request which need to be authenticated

  async validate(payload: JwtPayload): Promise<User> {
    //we will get username from the payload after the jwt is varified from the header,sent from client

    const { username } = payload;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    //we will send the user after the verification process
    return user;
  }
}
