import { DocumentData, DocumentReference } from "firebase/firestore";

export interface IUser {
  id?: string;
  email: string;
  nrelAPIKey?: string;
  validNRELAPIKey?: boolean;
  ref?: DocumentReference<DocumentData>;
}
