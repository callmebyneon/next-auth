import { githubLogin, login } from "@/libs/action";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <form
        action={login}
        className="flex flex-col gap-2 justify-start w-80 mt-4"
      >
        <input type="email" name="email" placeholder="YourEmail@example.com" />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
        />
        <button>Log In</button>
      </form>
      <form
        action={githubLogin}
        className="flex flex-col gap-2 justify-start w-80"
      >
        <button className="bg-black text-white">Github Log In</button>
      </form>
      <Link
        href="/register"
        className="no-underline mt-4 p-2 rounded-md bg-blue-500 text-white"
      >
        <div className=" block text-center">Go To Register</div>
      </Link>
    </>
  );
}
