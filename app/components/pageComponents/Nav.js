"use client";
import { signOut } from "@/app/actions/auth";
import { FaSignOutAlt } from "react-icons/fa";
import React from "react";
import Link from "next/link";

function Nav() {
  return (
    <div className="top-0 bg-slate-400">
      <Link href="/">Home</Link>
      <button onClick={signOut}>
        <FaSignOutAlt />
      </button>
    </div>
  );
}

export default Nav;
