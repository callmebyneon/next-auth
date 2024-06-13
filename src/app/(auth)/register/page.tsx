import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-center">Register</h1>
        <div className="w-80 px-3 py-2 mt-2 text-sm bg-orange-100 text-orange-500 rounded-md border border-orange-500">
          <p>
            <b>Notice:</b> <br />
            If you register successful, move login page and the submitted data
            save to personal MongoBD. Be careful <em>NOT</em> to enter personal
            data.
          </p>
        </div>
        <RegisterForm />
      </div>
    </>
  );
}
