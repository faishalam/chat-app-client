import HeaderForm from "@/components/pageComponents/AuthComponents/HeaderForm";
import LoginForm from "@/components/pageComponents/AuthComponents/LoginForm";

export default function LoginPage() {
  return (
    <>
      <HeaderForm
        title="Chatting Moments"
        description="Login to your account to continue"
      />
      <LoginForm />
    </>
  );
}
