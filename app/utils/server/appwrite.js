"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67bab98d00327ed1af1b");
  
  const cookieStore = await cookies();
  const session =  cookieStore.get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67bab98d00327ed1af1b")
      .setKey(
        "standard_fa5d67cb0dba24a061495b56431837128cee52218afde1e4593290258b160e6bd027f43d8258ac84a762abeb4b4a750b4de68fe6d0e078134f96a8c491a51e5400fddc0bfd90a578dea6a2706984760d31890cf94c610c32365fffb14a717d8ecbdbce33f6ba5e55341a58d7dd6057188dec77f99710fcc36c454e6fa22d8407"
      );

    return {
      get account() {
        return new Account(client);
      },
    };
  } catch (error) {
    alert(error);
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
