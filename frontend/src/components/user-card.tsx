import { joinApiUrl } from "@/constant/api";
import { IUser } from "@/interface/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

interface IUserCard {
    user: IUser;
}

export default function UserCard({ user }: IUserCard) {
    return (
        <Card className="w-full h-fit p-4 box-border">
            <div className="flex gap-3">
                <div className="relative">
                    <Avatar className="w-12 h-12">
                        <AvatarImage
                            src={joinApiUrl("media", user.avatar || "")}
                        />
                        <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                    <p className="text-sm font-medium w-full text-left overflow-hidden">
                        {user.name}
                    </p>
                    <div className="flex w-full gap-2 items-center">
                        <p className="text-xs  w-full overflow-hidden text-foreground">
                            {user.status || "Trạng thái"}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
