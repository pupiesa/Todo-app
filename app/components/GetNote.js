import React from "react";
import { fetchNote } from "../actions/noteAction";

export default async function GetNote() {
    const getnote = await fetchNote();
    console.log(getnote);
  return (
    <>
      <div className="flex justify-center">
        {getnote && getnote.map(data => {
            return (<div>{data.content}</div>);
        })}
      </div>
    </>
  );
}
