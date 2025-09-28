
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { updateMedia } from '@/app/admin/movies/actions' // We will create this next
import { Media } from '@/lib/movies'

const initialState = {
  message: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:bg-gray-400">
      {pending ? 'Updating...' : 'Update'}
    </button>
  )
}

export default function EditMovieForm({ movie }: { movie: Media & { _id: string } }) {
  // We need to bind the movie's id to the action
  const updateMediaWithId = updateMedia.bind(null, movie._id);
  const [state, formAction] = useFormState(updateMediaWithId, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700">Media Type</label>
        <select
          id="mediaType"
          name="mediaType"
          defaultValue={movie.mediaType}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={movie.title}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={movie.description}
          required
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
      {state?.message && <p className="text-red-500 mt-4">{state.message}</p>}
    </form>
  )
}
