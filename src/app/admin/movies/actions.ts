
'use server'
 
import clientPromise from '@/lib/mongodb'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ObjectId } from 'mongodb';

const dbName = process.env.MONGODB_DB || 'test';
 
// We will expand this to include the new fields
type MediaDocument = {
  title: string;
  description: string;
  thumbnail: string;
  mediaType: 'movie' | 'series';
  genres: string[];
  releaseYear: number;
  cast: string[];
  seasons?: any[]; // Keep this for series
}

export async function addMedia(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const mediaType = formData.get('mediaType') as 'movie' | 'series'
  const thumbnail = formData.get('thumbnail') as string
  const genres = (formData.get('genres') as string).split(',').map(g => g.trim()) // Split and trim
  const releaseYear = Number(formData.get('releaseYear'))
  const cast = (formData.get('cast') as string).split(',').map(c => c.trim()) // Split and trim
 
  if (!title || !description || !mediaType || !thumbnail || !releaseYear) {
    return { message: 'All fields except genres and cast are required.' }
  }

  try {
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('movies')

    const newMedia: MediaDocument = {
        title,
        description,
        thumbnail,
        mediaType,
        genres,
        releaseYear,
        cast,
    }

    if(mediaType === 'series') {
        newMedia.seasons = []
    }

    await collection.insertOne(newMedia);

  } catch (e) {
    console.error(e)
    return { message: 'Failed to create media.' }
  }
 
  revalidatePath('/admin/movies')
  redirect('/admin/movies')
}

export async function deleteMedia(formData: FormData) {
    const id = formData.get('id') as string;

    try {
        const client = await clientPromise;
        const db = client.db(dbName);
        const collection = db.collection('movies');

        await collection.deleteOne({ _id: new ObjectId(id) });

    } catch (e) {
        console.error(e);
        return { message: 'Failed to delete media.' }
    }

    revalidatePath('/admin/movies');
}

export async function updateMedia(id: string, prevState: any, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const mediaType = formData.get('mediaType') as 'movie' | 'series'
    const thumbnail = formData.get('thumbnail') as string
    const genres = (formData.get('genres') as string).split(',').map(g => g.trim())
    const releaseYear = Number(formData.get('releaseYear'))
    const cast = (formData.get('cast') as string).split(',').map(c => c.trim())

  if (!title || !description || !mediaType || !thumbnail || !releaseYear) {
    return { message: 'All fields except genres and cast are required.' }
  }

  try {
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('movies')

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          mediaType,
          thumbnail,
          genres,
          releaseYear,
          cast,
        },
      }
    );

  } catch (e) {
    console.error(e)
    return { message: 'Failed to update media.' }
  }

  revalidatePath('/admin/movies')
  redirect('/admin/movies')
}
