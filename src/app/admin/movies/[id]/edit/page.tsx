
import { notFound } from 'next/navigation';
import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

import MediaForm from "../../media-form";
import { updateMedia } from "../../actions";
import { Media } from "@/lib/movies";

const dbName = process.env.MONGODB_DB || 'test';

async function getMovie(id: string): Promise<(Media & { _id: string }) | null> {
    try {
        const client = await clientPromise;
        const db = client.db(dbName);
        const collection = db.collection("movies");

        const movie = await collection.findOne({ _id: new ObjectId(id) });

        if (!movie) {
            return null;
        }

        // The raw object from MongoDB is not directly serializable for the client component,
        // so we need to convert it to a plain object.
        return JSON.parse(JSON.stringify(movie));
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function EditMoviePage({ params }: { params: { id: string } }) {
    const movie = await getMovie(params.id);

    if (!movie) {
        notFound();
    }

    // The updateMedia action needs the ID, so we bind it to the action
    const updateMediaWithId = updateMedia.bind(null, movie._id);

    const initialState = {
      message: null,
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit: {movie.title}</h1>
            <MediaForm 
                action={updateMediaWithId} 
                initialState={initialState}
                media={movie}
            />
        </div>
    );
}
