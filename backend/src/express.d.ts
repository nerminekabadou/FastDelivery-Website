// this file ensures that requests can have a user attribute
import { UserEntity } from './users/entities/user.entity'; 

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
