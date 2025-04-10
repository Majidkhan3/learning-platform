'use client';

import { useSearchParams } from 'next/navigation';
const useQueryParams = () => {
  const searchParams = useSearchParams();
  return Object.fromEntries([...searchParams]);
};
export default useQueryParams;