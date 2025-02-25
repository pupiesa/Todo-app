import { databases } from "@/app/appwrite";
import { ID, Query } from "appwrite";
import { getLoggedInUser } from "../utils/server/appwrite";

export async function addNote(content) {
  const user = await getLoggedInUser();
  let newNote = {
    content: content.header,
    description: content.description,
    userId: user.$id,
  };
  try {
    const response = await databases.createDocument(
      "noteApp", // Database ID
      "note", // Collection ID
      ID.unique(), // Document ID
      newNote // Data to be stored in the document
    );
    const note = {
      $id: response.$id,
      $createdAt: response.$createdAt,
      content: response.content,
      content: response.description,
      userID: response.userId,
    };
    return note;
  } catch (error) {
    console.error("Failed to add note:", error);
  }
}

export async function fetchNote() {
  try {
    const user = await getLoggedInUser();
    const response = await databases.listDocuments("noteApp", "note", [
      Query.equal("userId", user.$id),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
  }
}

export async function deleteNote(documentId) {
  try {
    const response = await databases.deleteDocument(
      "noteApp", // Database ID
      "note", // Collection ID
      documentId // documentId
    );
    return response;
  } catch (error) {
    console.log("Error deleting document: ", error);
  }
}
