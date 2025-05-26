import axios from "axios";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const backendUrl =
            process.env.NEXTAUTH_BACKEND_URL || "http://localhost:5004";
          const res = await axios.post(`${backendUrl}/auth/login`, {
            identifier: credentials.identifier,
            password: credentials.password,
          });
          if (res.data && res.data.success && res.data.user && res.data.token) {
            return {
              id: res.data.user._id,
              name: res.data.user.name,
              email: res.data.user.email,
              image: res.data.user.image,
              idToken: res.data.token, // Pass JWT to session
            };
          }
          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.id_token) {
        token.idToken = account.id_token;
      }
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        if (user.idToken) token.idToken = user.idToken; // Ensure idToken is set for credentials login
      }
      return token;
    },
    async session({ session, token }) {
      session.idToken = token.idToken;
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      if (token.image) session.user.image = token.image;
      // Only fetch from backend if token.idToken is a JWT (not a Google id_token)
      if (token.idToken && token.idToken.split('.').length === 3) {
        try {
          const backendUrl =
            process.env.NEXTAUTH_BACKEND_URL || "http://localhost:5004";
          const res = await axios.get(`${backendUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${token.idToken}` },
          });
          if (res.data?.success && res.data.data) {
            session.user.name = res.data.data.name;
            session.user.email = res.data.data.email;
            session.user.image = res.data.data.image;
          }
        } catch (e) {
          // fallback: keep session.user as is
        }
      }
      return session;
    },
    async redirect({ url, baseUrl, account, profile }) {
      if (account?.provider === "google") {
        console.log("Redirect path: Google login, redirecting to dashboard-user", { url, baseUrl, account, profile });
        // Always redirect to dashboard-user after Google login
        return `${baseUrl}/dashboard-user`;
      }
      // Always use absolute URLs for safety
      if (url.startsWith("/")) {
        console.log("Redirect path: Relative URL, redirecting to", `${baseUrl}${url}`, { url, baseUrl });
        return `${baseUrl}${url}`;
      }
      if (url.startsWith(baseUrl)) {
        console.log("Redirect path: Absolute URL within baseUrl, redirecting to", url, { url, baseUrl });
        return url;
      }
      console.log("Redirect path: Default, redirecting to baseUrl", { url, baseUrl });
      return baseUrl;
    },
  },
});
