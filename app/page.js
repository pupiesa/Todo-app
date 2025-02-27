import { getLoggedInUser } from "./utils/server/appwrite";
import { redirect } from "next/navigation";
import NoteForm from "./components/NoteForm";
import GetNote from "./components/GetNote";
import { fetchNote } from "./actions/noteAction";

export default async function Home() {
  const user = await getLoggedInUser();
  if (!user) redirect("/auth");
    const getnote = await fetchNote();
    console.log(getnote);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <NoteForm />
        
      </div>
      <GetNote getnote={getnote} />
    </>
  );
}
