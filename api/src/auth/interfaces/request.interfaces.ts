import { User } from '../../user/user.entity';

export interface LoggedRequest extends Request {
  user: User;
}
