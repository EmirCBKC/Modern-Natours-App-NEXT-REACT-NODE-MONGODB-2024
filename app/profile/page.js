import UserDetailMain from "@/components/ui/Profile/UserDetailMain";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {

    const session = await getServerSession(authOptions);

    return (
        <UserDetailMain reqUser={session?.user} />
    )
}
