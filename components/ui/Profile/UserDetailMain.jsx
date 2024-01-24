import { getMyBookings } from "@/services/apiBookings";
import { getMyLikes } from "@/services/apiLikes";
import { getMyReviews } from "@/services/apiReviews";
import DetailContainer from "./includes/DetailContainer";
import Style from "./user-detail.module.css";

export default async function UserDetailMain({ reqUser }) {

    const reqUserBookings = await getMyBookings(reqUser.id);

    const reqUserReviews = await getMyReviews(reqUser.id);

    const reqUserLikes = await getMyLikes(reqUser.id);

    return (
        <main className={Style.main}>
            <DetailContainer
                reqUser={reqUser}
                reqUserBookings={reqUserBookings}
                reqUserReviews={reqUserReviews}
                reqUserLikes={reqUserLikes} />
        </main>
    )
}
