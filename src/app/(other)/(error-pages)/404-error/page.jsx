import React from 'react';
import Error404 from './components/Error404';
export const metadata = {
  title: 'Page Not Found'
};
const page = () => {
  return <Error404 />;
};
export default page;