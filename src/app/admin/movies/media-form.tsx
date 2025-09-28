
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { type Media } from "@/lib/movies";

// This component will be used for both creating and editing
type MediaFormProps = {
    // The action is the function that will be called when the form is submitted
    // It can be either the addMedia or updateMedia server action
    action: (prevState: any, formData: FormData) => Promise<{ message: string; } | undefined>;
    // The initial state for the useFormState hook
    initialState: { message: null };
    // The default values for the form fields (used for editing)
    media?: Media & { _id: string }; 
}

function SubmitButton({ isNew } : { isNew: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:bg-gray-400">
        {pending ? (isNew ? 'Creating...' : 'Updating...') : (isNew ? 'Create Media' : 'Update Media')}
    </button>
  )
}

export default function MediaForm({ action, initialState, media }: MediaFormProps) {
  const [state, formAction] = useFormState(action, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={media?.title}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={media?.description}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        ></textarea>
      </div>
      <div>
        <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="mediaType"
          name="mediaType"
          required
          defaultValue={media?.mediaType}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
        <input
          type="text"
          id="thumbnail"
          name="thumbnail"
          required
          defaultValue={media?.thumbnail}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">Release Year</label>
        <input
          type="number"
          id="releaseYear"
          name="releaseYear"
          required
          defaultValue={media?.releaseYear}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="genres" className="block text-sm font-medium text-gray-700">Genres (comma-separated)</label>
        <input
          type="text"
          id="genres"
          name="genres"
          defaultValue={media?.genres?.join(', ')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="cast" className="block text-sm font-medium text-gray-700">Cast (comma-separated)</label>
        <input
          type="text"
          id="cast"
          name="cast"
          defaultValue={media?.cast?.join(', ')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="flex flex-col items-center justify-between">
        <SubmitButton isNew={!media} />
        {state?.message && <p className="text-red-500 mt-4">{state.message}</p>}
      </div>
    </form>
  )
}
