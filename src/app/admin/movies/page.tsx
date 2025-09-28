
import clientPromise from "@/lib/mongodb";
import { Media } from "@/lib/movies";
import Link from "next/link";
import { deleteMedia } from "@/app/admin/movies/actions";

const dbName = process.env.MONGODB_DB || 'test';

async function getMovies() {
    try {
        const client = await clientPromise;
        const db = client.db(dbName);
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ _id: -1 })
            .toArray();
        return JSON.parse(JSON.stringify(movies));
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function AdminMoviesPage() {
  const movies: (Media & { _id: string })[] = await getMovies();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Movies & Series</h1>
        <Link href="/admin/movies/new" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
            Add New
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-4 font-semibold">Title</th>
              <th className="text-left p-4 font-semibold">Type</th>
              <th className="text-left p-4 font-semibold">Release Year</th>
              <th className="text-left p-4 font-semibold">Genres</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((media) => (
              <tr key={media._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{media.title}</td>
                <td className="p-4 capitalize">{media.mediaType}</td>
                <td className="p-4">{media.releaseYear}</td>
                <td className="p-4">{media.genres?.join(', ')}</td>
                <td className="p-4 flex items-center gap-2">
                    <Link href={`/admin/movies/${media._id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                    <form action={deleteMedia}>
                        <input type="hidden" name="id" value={media._id} />
                        <button type="submit" className="text-red-500 hover:underline">Delete</button>
                    </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
