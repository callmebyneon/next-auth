import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import connectDB from "./libs/db";
import { User } from "./libs/schema";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("이메일과 비밀번호를 모두 입력하세요.");
        }

        connectDB();
        const user = await User.findOne({ email }).select("+password +role");

        if (!user) {
          throw new CredentialsSignin("존재하지 않는 회원입니다.");
        }

        // 사용자가 입력한 비밀번호와 DB hash 값 일치하는지 확인
        const isMatched = await compare(String(password), user.password);
        if (!isMatched) {
          throw new CredentialsSignin("비밀번호가 일치하지 않습니다.");
        }

        // 유효한 사용자 정보 반환
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };

        // return null;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      console.log("signIn", user, account);
      if (account?.provider === "github") {
        const { id, name, email } = user;

        connectDB();
        const existingUser = await User.findOne({ authProviderId: id });

        if (!existingUser) {
          // 없는 사용자는 가입 처리
          await new User({
            name,
            email,
            authProviderId: id,
            role: "user",
          }).save();
        }

        const socialUser = await User.findOne({ authProviderId: id });
        console.log(socialUser);

        user.role = socialUser?.role || "user";
        user.id = socialUser?._id || null;

        return true;
      } else {
        return true;
      }
    },
    async jwt({ token, user }: { token: any; user: any }) {
      console.log("jwt", token, user);
      if (user) {
        token.role = user.role; // JWT 토큰에 사용자 권한 추가
        token.id = user.id; // JWT 토큰에 사용자 ID 추가
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.role) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
});
