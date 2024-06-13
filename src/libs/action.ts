"use server";

import { redirect } from "next/navigation";
import connectDB from "./db";
import { User } from "./schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

// Github 로그인
export async function githubLogin() {
  await signIn("github", { callbackUrl: "/" });
}

//로그인
export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "" || password === "") {
    console.error("입력값을 모두 입력해주세요.");
    return;
  }

  try {
    // auth.js 연동
    console.log("try", email, password);
    // authorize로 email, password를 전달
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }

  redirect("/");
}

// 회원가입
export async function register(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (name === "" || email === "" || password === "") {
    console.error("입력값을 모두 입력해주세요.");
    return;
  }

  connectDB();

  // 1. 있는 회원인지 조회
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.error("이미 있는 회원입니다.");
  }

  // 2. 없는 회원이면 DB에 넣기
  const hashedPassword = await hash(String(password), 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  redirect("/login");
}
