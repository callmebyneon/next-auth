import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
  ],
});
