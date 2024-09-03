import { Request } from 'express';
import UserModel from 'src/users/models/user.model';

interface RequestWithUser extends Request {
  user: UserModel;
}

export default RequestWithUser;