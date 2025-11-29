import { redirect } from "next/navigation";

export default function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return TeamPageAsync({ params });
}

async function TeamPageAsync({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/team/dashboard`);
}
