import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-center">Register</h1>
        <RegisterForm />
      </div>
    </>
  );
}
