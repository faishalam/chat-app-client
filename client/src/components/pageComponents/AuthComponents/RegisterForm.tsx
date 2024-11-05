"use client";
import {
  InputsRegister,
  useAuthContext,
} from "@/providers/authProviders/AuthProviders";
import InputFormAuth from "./InputFormAuth";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import ButtonSubmit from "@/components/button/ButtonSubmit";

export default function RegisterForm() {
  const {
    registerRegister,
    handleSubmitRegister,
    errorsRegister,
    isLoadingRegister,
    mutateRegister,
  } = useAuthContext();

  const onSubmit: SubmitHandler<InputsRegister> = (data) => {
    const { email, password, username } = data;
    const payload = {
      email,
      password,
      username,
    };
    mutateRegister(payload);
  };

  return (
    <>
      <form
        onSubmit={handleSubmitRegister(onSubmit)}
        className="mx-auto mb-0 mt-4 max-w-full md:max-w-md w-full space-y-3 px-10 lg:px-0"
      >
        <InputFormAuth
          type="text"
          label="Username"
          placeholder="Enter Username"
          register={registerRegister("username", {
            required: "Username wajib diisi",
          })}
          name="username"
          errors={errorsRegister.username?.message}
        />
        <InputFormAuth
          type="email"
          label="Email"
          placeholder="Enter email"
          register={registerRegister("email", {
            required: "Email wajib diisi",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          errors={errorsRegister.email?.message}
          name="email"
        />
        <InputFormAuth
          type="password"
          label="Passowrd"
          placeholder="Enter password"
          register={registerRegister("password", {
            required: "Password wajib diisi",
          })}
          name="password"
          errors={errorsRegister.password?.message}
        />

       

        <div className="flex flex-col space-y-4">
          <ButtonSubmit
            type={"submit"}
            classname={
              "w-fulll max-w-full rounded-lg bg-[#164427] text-white hover:bg-green-700 p-2"
            }
            btnText="Register "
            btnLoading={isLoadingRegister}
          />
          <p className="text-sm text-gray-500">
            No account?
            <Link href={"/login"} className="underline">
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
