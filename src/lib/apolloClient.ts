import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";

const httpLink = createHttpLink({
  uri: "https://www.kurjerzy.pl/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  // Send the mutation using Axios to obtain the new token
  const response = await axios.post("https://www.kurjerzy.pl/graphql", {
    query: `
        mutation {
          createToken(email: "polidkamil@gmail.com", password: "Polid123") {
            token,
            expire,
            expireHuman
          }
        }
      `,
  });

  const newToken = response.data.data.createToken.token;
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${newToken}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
