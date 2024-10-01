import { UserOutput } from 'src/user/application/output/user-output';

export type LoginOutput = {
  user: UserOutput;
  token: string;
};
