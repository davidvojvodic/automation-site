import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root domain to default locale
  redirect('/en');
}