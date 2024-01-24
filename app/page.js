import AllTours from '@/components/ui/Home/AllTours';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function HomePage() {

  const session = await getServerSession(authOptions);

  return (
    <AllTours reqUser={session?.user} />
  );
}
