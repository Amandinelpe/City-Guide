import { FC } from "react";
import AuthProvider from "./context/AuthProvider";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
