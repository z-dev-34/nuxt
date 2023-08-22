export  interface IUser {
    id:string,
    email:string;
    password:string;
    name:string;
}

export interface IRequestBody {
    email: string;
    password: string;
    name: string;
  }