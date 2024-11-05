import HeaderForm from "@/components/pageComponents/AuthComponents/HeaderForm";
import RegisterForm from "@/components/pageComponents/AuthComponents/RegisterForm";
import { AuthProviders } from "@/providers/authProviders/AuthProviders";

export default function RegisterPage() {
  return (
    <>
      <AuthProviders>
        <HeaderForm
          title="Chatting Moments"
          description="Login to your account to continue"
        />
        <RegisterForm />
      </AuthProviders>
    </>
  );
}
