"use client";
import React, { useState } from "react";
import { deleteNote } from "../actions/noteAction";


export default function GetNote(props) {
  const [note, setNote] = useState(props.getnote);

  const handleDelete = async (noteId) => {
    await deleteNote(noteId)
  }
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
    </>
  );
}
