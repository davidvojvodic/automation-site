import { redirect } from "next/navigation";

export default function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // This is an async component in Next.js 15
  return TeamPageAsync({ params });
}

async function TeamPageAsync({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/team/login`);
}
