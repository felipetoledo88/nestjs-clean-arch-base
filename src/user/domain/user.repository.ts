import { Repository } from 'src/shared/domain/Repository';
import { Users } from './user.entity';

export interface UserRepository extends Repository<Users> {
  findByUserLogin(login: string): Promise<Users>;

  userExistsById(userId: number): Promise<boolean>;
}
