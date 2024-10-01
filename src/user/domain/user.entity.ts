type UsersProps = {
  id?: number;
  login: string;
  password: string;
};

export class Users {
  id: number;
  login: string;
  password: string;

  constructor(props?: UsersProps) {
    this.id = props?.id;
    this.login = props?.login;
    this.password = props?.password;
  }
}
