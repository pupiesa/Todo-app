'use client'
import React, { useState } from "react";
import { addNote } from "@/app/actions/noteAction";

export default function NoteForm() {
  const [content, setContent] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (content.trim() !== "") {
      await addNote(content);
      setContent("");
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here"
        ></input>
        <button type="submit">Add Note</button>
      </form>
    </>
  );
}
