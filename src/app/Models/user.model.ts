export class User {
  _id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  email?: string;
  disabled?: boolean;
  role?: string;
  securityQuestions?: [string];
  password?: string;
  dateCreated?: Date;
  dateModified?: Date;
}
