import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from 'next-auth/providers/credentials';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        username: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        // remember: {
        //   label: "Remember",
        //   type: "boolean",
        //   placeholder: "Remember",
        // },
        id: {
          label: "Id",
          type: "text",
          placeholder: "Id",
        },
      },
      async authorize(credentials, req) {
        //Access token
        // const getAccessToken = await axios.get(process.env.ACCESSTOKEN_URL);

        // const responseForGetPhoto = await axios({
        //   method: "get",
        //   headers: {
        //     Authorization: getAccessToken.data.access_token,
        //   },
        //   responseType: "arraybuffer",
        //   url: `https://www.zohoapis.com/crm/v2.1/Portal_Users/${credentials.record_id}/photo`,
        // });

        return {
          name: credentials.name,
          email: credentials.email,
          remember: credentials.remember,
          record_id: credentials.record_id,
        };
      },
    }),
  ],
//   secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    // jwt: true,
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // // Seconds - Throttle how frequently to write to database to extend a session.
    // // Use it to limit write operations. Set to 0 to always update the database.
    // // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  // callbacks: {
  //   async redirect(url, baseUrl) {
  //     // console.log("REDIRECT", url, baseUrl);
  //     return baseUrl;
  //   },
  //   async session(session, token) {
  
  //     console.log({ session, token });

  //     if (token) {
  //       session.exp = token.expire;
  //       // session.credentials = token.credentials
  //       session.user.id = token.id;
  //       // session.remember = token.remember;
  //     }
  //     // console.log("SESSION", session, "TOKEN", token);

  //     return session;
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
    
  //     // Initial sign in
  //     if (account && user) {
  //       if (user.remember == "false" && account.type == "credentials") {
  //         token.expire = Date.now() + 2 * 10000;
  //         // token.credentials = true
  //         token.remember = false;
  //         token.id = user.id;
  //       } else {
  //         token.remember = true;
  //         token.id = user.id;
  //       }
  //     }
  //     return {
  //       ...token,
  //       exp: token.expire ? token.expire : token.exp,
  //     };
  //   },
  // },
  callbacks: {
    async redirect(url, baseUrl) {
      // console.log("REDIRECT", url, baseUrl);
      return baseUrl;
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {

      console.log('### JWT CALLBACK ###')
      console.log('token: ', token)
      console.log('account: ', account)

      return token;
    },
  
    session: async ({ session, token, user }) => {
      console.log('### SESSION CALLBACK ###')
      console.log('session: ', session)
      console.log('user: ', token)
      console.log('user: ', user)

      return session;
    }
  },
  pages: {
    signIn: '/signin',
    signOut: '/signin',
    error: '/signin'
  }
})