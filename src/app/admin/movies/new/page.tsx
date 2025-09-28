
import MediaForm from "../media-form";
import { addMedia } from "../actions";

const initialState = {
  message: null,
}

export default function NewMoviePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Media</h1>
      <MediaForm 
        action={addMedia} 
        initialState={initialState} 
      />
    </div>
  );
}
