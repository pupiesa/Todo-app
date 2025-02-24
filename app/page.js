import { getLoggedInUser } from "./utils/server/appwrite";
import { redirect } from "next/navigation";
import NoteForm from "./components/NoteForm";
import GetNote from "./components/GetNote";

export default async function Home() {
  const user = await getLoggedInUser();
  if (!user) redirect("/auth");

  return (
    <>
      <GetNote />
      <NoteForm />
    </>
  );
}
