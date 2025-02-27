"use client";
import React, { useEffect, useState } from "react";
import { deleteNote, updateNote, updateNoteDesc } from "../actions/noteAction";
import Note from "./pageComponents/Note";
import { client } from "../appwrite";

export default function GetNote(props) {
  const [note, setNote] = useState(props.getnote);

  const handleDelete = async (noteId) => {
    await deleteNote(noteId);
  };
  const handleUpdate = async (noteId, content) => {
    await updateNote(noteId, content);
    setNote((prevNotes) =>
      prevNotes.map((note) =>
        note.$id === noteId ? { ...note, content: content } : note
      )
    );
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
      };
      if (response.events[0].includes("create")) {
        setNote((prevNotes) => [...prevNotes, changednote]);
      }
      if (response.events[0].includes("delete")) {
        setNote((prevNotes) =>
          prevNotes.filter((note) => note.$id !== changednote.$id)
        );
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 justify-items-center text-center w-full">
        {note &&
          note.map((data) => {
            return (
              <Note
                key={data.$id}
                id={data.$id}
                data={data}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                className="col-start-2 w-full"
              />
            );
          })}
      </div>
    </>
  );
}
