import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from 'notistack';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_URI}/graphql`,
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <SnackbarProvider maxSnack={1}>
      <App />
    </SnackbarProvider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
