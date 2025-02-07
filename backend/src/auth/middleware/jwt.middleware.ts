import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UserEntity } from '../../users/entities/user.entity';
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.access_token as string;

    if (!token) {
      return next(); // Allow requests without a token (e.g., register)
    }

    try {
      const decodedUser = verify(token, process.env.JWT_KEY!) as JwtPayload; //verify returns string
      req.user = decodedUser as UserEntity; // because otherwise decodedUser is string. but req.user is expecting UserEntity
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }

    return next();
  }
}
