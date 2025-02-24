import { getLoggedInUser } from "./utils/server/appwrite";
import { redirect } from "next/navigation";
import { fetchNote } from "./actions/noteAction";
import NoteForm from "./components/NoteForm";

export default async function Home() {
  const note = await fetchNote();


  // const user = await getLoggedInUser();

  // if (!user) redirect("/auth");

  return (
    <>
      <NoteForm/>
    </>
  );
}
