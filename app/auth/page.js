import { getLoggedInUser } from "../utils/server/appwrite";
import { redirect } from "next/navigation";
import Form from "../components/AuthForm";
import { signUpWithEmail, loginWithEmail } from "../actions/auth";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/account");

  return (
    <>
      <Form signIn={signUpWithEmail} login={loginWithEmail} />
    </>
  );
}
