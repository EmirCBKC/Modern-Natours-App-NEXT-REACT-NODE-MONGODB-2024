import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Navbar from "./Navbar";

export default async function Header() {

    const session = await getServerSession(authOptions);

    return (
        <Navbar reqUser={session?.user} />
    )
}
