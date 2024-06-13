import { register } from "@/libs/action";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <>
      <form
        action={register}
        className="flex flex-col gap-2 justify-start w-80 my-4"
      >
        <input type="text" name="name" placeholder="Enter Your Name" />
        <input type="email" name="email" placeholder="Enter Your Email" />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
        />
        <button className="inline-block">Done</button>
      </form>
      <Link
        href="/login"
        className="no-underline mt-4 p-2 rounded-md bg-blue-500 text-white"
      >
        <div className=" block text-center">Go To Log In</div>
      </Link>
    </>
  );
}
