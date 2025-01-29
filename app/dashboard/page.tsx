import { auth } from "@/auth/auth";

export default async function Dashboard() {
  const session = await auth();
  console.log(session);
  if (!session?.user) return null;

  return (
    <div>
      <h1>{session.user?.name}</h1>
      <h1>{session.user?.email}</h1>
    </div>
  );
}
