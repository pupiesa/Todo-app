"use client";
import React, { useEffect, useState } from "react";
import { deleteNote } from "../actions/noteAction";
import Note from "./pageComponents/Note";
import { client } from "../appwrite";

export default function GetNote(props) {
  const [note, setNote] = useState(props.getnote);

  const handleDelete = async (noteId) => {
    await deleteNote(noteId);
  };
  useEffect(() => {
    const channel = "databases.noteApp.collections.note.documents";

    const unsubscribe = client.subscribe(channel, (response) => {
      console.log(response);
      console.log("payload :", response.payload);
      const changednote = {
            content: response.payload.content,
            description: response.payload.description,
            $id: response.payload.$id,
          }
      if (response.events[0].includes("create")) {
        setNote((prevNotes) => [
          ...prevNotes,
          changednote,
        ]);
      }
      if (response.events[0].includes("delete")) {
        setNote((prevNotes) => prevNotes.filter((note) => note.$id !== changednote.$id))
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="flex flex-col text-center">
        {note &&
          note.map((data) => {
            return (
              <div key={data.$id} id={data.$id}>
                <p
                  onClick={() => {
                    handleDelete(data.$id);
                  }}
                >
                  {data.content}
                </p>
                {data.description && <p>{data.description}</p>}
              </div>
            );
          })}
      </div>
      <Note />
    </>
  );
}
