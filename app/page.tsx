import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root domain to default locale
  redirect('/en');
}

// This fixes the root layout warning
export const metadata = {
  title: 'Flowko'
};