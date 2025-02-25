"use client";
import { useState } from "react";
import { addNote } from "@/app/actions/noteAction";

export default function NoteForm() {
  const [content, setContent] = useState({
    header: "",
    description: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (content.header !== "") {
      await addNote(content);
      setContent({ ...content, header: "", description: "" });
    }
  };
  return (
    <>
      <form onSubmit={submitHandler} className="">
        <div className="w-full max-w-xs p-5 bg-slate-300 rounded-lg font-mono flex flex-col justify-center gap-y-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="heder"
          >
            Header
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            id="heder"
            type="text"
            value={content.header}
            onChange={(e) => setContent({ ...content, header: e.target.value })}
            placeholder="Write your note here"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            description
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            id="description"
            type="text"
            value={content.description}
            onChange={(e) =>
              setContent({ ...content, description: e.target.value })
            }
            placeholder="Write your note here"
          />
          <button type="submit" className="bg-background text-foreground">
            Add Note
          </button>
        </div>
      </form>
    </>
  );
}
