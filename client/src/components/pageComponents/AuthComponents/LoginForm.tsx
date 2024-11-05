'use client';
import { InputsLogin, useAuthContext } from "@/providers/authProviders/AuthProviders";
import InputFormAuth from "./InputFormAuth";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import ButtonSubmit from "@/components/button/ButtonSubmit";

export default function LoginForm() {
  const { registerLogin, handleSubmitLogin, errorsLogin, isLoadingLogin, mutateLogin } = useAuthContext();

  const onSubmit: SubmitHandler<InputsLogin> = (data) => {
    const { email, password } = data;
    const payload = {
      email,
      password,
    };
    mutateLogin(payload);
  };

  return (
    <>
      <form
        onSubmit={handleSubmitLogin(onSubmit)}
        className="mx-auto mb-0 mt-4 max-w-full md:max-w-md w-full space-y-3 px-10 lg:px-0"
      >
        <InputFormAuth
          type="email"
          label="Email"
          placeholder="Enter email"
          register={registerLogin("email", {
            required: "Email wajib diisi",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          errors={errorsLogin.email?.message}
          name="email"
        />
        <InputFormAuth
          type="password"
          label="Passowrd"
          placeholder="Enter password"
          register={registerLogin("password", {
            required: "Password wajib diisi",
          })}
          name="password"
          errors={errorsLogin.password?.message}
        />

        <div className="flex items-center justify-between max-w-md w-full">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm leading-6 text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm leading-6">
            <Link
              href={""}
              className="font-medium text-blue-500 hover:text-green-600 transition cursor-not-allowed"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <ButtonSubmit
            type={"submit"}
            classname={
              "w-fulll max-w-full rounded-lg bg-neutral-800 text-white transition-all hover:bg-neutral-700 p-2"
            }
            btnText="Login"
            btnLoading={isLoadingLogin}
          />
          <p className="text-sm text-gray-500">
            No account?
            <Link href={"/register"} className="underline">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
        {/* <ContinueWithSection /> */}
      </form>
    </>
  );
}
