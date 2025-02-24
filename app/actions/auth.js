"use server";
import { createAdminClient, createSessionClient } from "@/app/utils/server/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  const { account } = await createAdminClient();
  try {
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies();
    cookieStore.set({
      name: "my-custom-session",
      value: session.secret,
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return redirect("/account");
  } catch (error) {
    console.log(error);
  }
}

export async function loginWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { account } = await createAdminClient();

  const session = await account.createEmailPasswordSession(email, password);

  const cookieStore = await cookies();
  cookieStore.set({
    name: "my-custom-session",
    value: session.secret,
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/account");
}
export async function signOut() {
  const { account } = await createSessionClient();

  cookies().delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/auth");
}
