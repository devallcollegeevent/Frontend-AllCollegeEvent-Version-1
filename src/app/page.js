// src/app/page.js
import { redirect } from 'next/navigation';
import { loginPage } from './routes';

export default function Page() {
  redirect(loginPage);
  return null;
}
