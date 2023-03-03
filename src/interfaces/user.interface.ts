import IDocumentType from "./documentType.interface";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUser: string;
  photoDocumentUser: string;
  phone: string;
  address: string;
  role: string;
  documentType: IDocumentType;
  numberDocument: string;
  status: boolean;
  google: boolean;
  createAt: string;
  updateAt: string;
}

export default IUser;
