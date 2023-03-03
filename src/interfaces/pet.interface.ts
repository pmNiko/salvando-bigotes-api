import IUser from "./user.interface";

interface IPet {
  type: string;
  name: string;
  photoPet: string;
  user: IUser;
  status: boolean;
}

export default IPet;
