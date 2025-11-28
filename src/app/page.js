// src/app/page.js
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/user/login');
  return null;
}
