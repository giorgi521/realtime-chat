import React from 'react';
import Button from '@/components/ui/Button';
import { db } from '@/lib/db';

const Home = async () => {
 await db.set('hello', 'world')
 
  return (
     <Button varaient="ghost">button</Button>
  );
};

export default Home;