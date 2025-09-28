import { Suspense } from 'react';
import { SearchContent } from '../components/SearchContent';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}