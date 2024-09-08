import { logout } from "@/api/action/auth";
import useUser from "@/hook/userUser";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

export default function DialogLogout() {
    const { setIsAuth } = useUser();
    const onLogout = async () => {
        const isLogout = await logout();
        if (isLogout.success) {
            setIsAuth(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full flex-1"
                    size="sm"
                    variant="destructive"
                >
                    Đăng xuất
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">Đăng xuất</DialogTitle>
                    <DialogDescription className="text-left">
                        Xác nhận đăng xuất?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={onLogout}
                        className="w-full"
                    >
                        Đăng xuất
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
