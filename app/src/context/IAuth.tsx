export interface IAuth {
  loggedIn: boolean;
  userFirstName: string;
  userLastName: string;
  isAdmin: boolean;
  logIn: () => void;
  logOut: () => void;
  logInAdmin: () => void;
  updateLogInState: (isAdmin: boolean) => void;
}
