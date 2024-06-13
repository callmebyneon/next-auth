import { register } from "@/libs/action";

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
    </>
  );
}
