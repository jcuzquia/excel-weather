import { DocumentData, DocumentReference } from "firebase/firestore";

export interface IUser {
  id?: string;
  username: string;
  email: string;
  nrelAPIKey?: string;
  validNRELAPIKey?: boolean;
  ref?: DocumentReference<DocumentData>;
  nrelEmail?: string;
}
