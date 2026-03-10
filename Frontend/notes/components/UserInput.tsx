import { useState } from "react";

export default function UserInput() {
  const [note, setNote] = useState<string>("");  
  return (
    <div className="flex w-full items-center justify-center">
      <textarea 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
        className="w-full h-1/2 p-4 border rounded-md"         
        placeholder="Type your note here..." />
    </div>
  );
}