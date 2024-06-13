import { login } from "@/libs/action";

export default function LoginForm() {
  return (
    <>
      <form
        action={login}
        className="flex flex-col gap-2 justify-start w-80 p-4"
      >
        <input type="email" name="email" placeholder="YourEmail@example.com" />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
        />
        <button>Log In</button>
      </form>
    </>
  );
}
