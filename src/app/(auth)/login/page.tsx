import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Login() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-center">Login</h1>
        <LoginForm />
      </div>
    </>
  );
}
