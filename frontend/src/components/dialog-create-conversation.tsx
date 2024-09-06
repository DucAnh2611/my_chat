import { createConversation } from "@/api/action/conversation";
import { listUser } from "@/api/action/user";
import { joinApiUrl } from "@/constant/api";
import useDebounce from "@/hook/useDebounce";
import { IUser } from "@/interface/user";
import { createConversationSchema } from "@/schema/conversation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderIcon } from "lucide-react";
import { ChangeEvent, UIEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function DialogCreateConversation() {
    const [users, SetUsers] = useState<IUser[]>([]);
    const [members, SetMembers] = useState<IUser[]>([]);
    const [loading, SetLoading] = useState<boolean>(false);
    const [skip, SetSkip] = useState<number>(0);
    const [canScroll, SetCanScroll] = useState<boolean>(true);
    const [username, SetUsername] = useState<string>("");
    const [open, SetOpen] = useState<boolean>(false);
    const debouncedUsername = useDebounce<string>(username);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        SetUsername(e.target.value);

        if (e.target.value !== debouncedUsername) {
            SetUsers([]);
        }

        if (!loading && canScroll) {
            SetLoading(true);
        }
    };

    const reset = () => {
        SetSkip(0);
        SetUsername("");
        SetLoading(false);
        SetCanScroll(true);
        SetMembers([]);
        SetUsers([]);
        SetOpen(true);
        form.reset();
    };

    const findUser = async (username: string, skip: number) => {
        const call = await listUser(username, skip);
        if (call.success && call.result) {
            const users = call.result;

            if (members.length + users.length >= skip) {
                SetUsers((ms) => [...ms, ...users]);
                SetSkip(skip);
            } else {
                SetCanScroll(false);
            }
        }

        SetLoading(false);
    };

    const focusUser = () => {
        SetUsers([]);
    };

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (target.scrollTop === 0 && !loading && canScroll) {
            SetSkip(members.length);
        }
    };

    const onSelectUser = (user: IUser) => () => {
        SetMembers((m) =>
            m.find((e) => e._id === user._id)
                ? m.filter((e) => e._id !== user._id)
                : [...m, user]
        );
    };

    const create = async () => {
        const { name } = form.getValues();

        const call = await createConversation({
            name,
            memberIds: members.map((m) => m._id),
            type: "PERSONAL",
        });

        if (call.success) {
            SetOpen(false);
        }
    };

    const form = useForm<z.infer<typeof createConversationSchema>>({
        resolver: zodResolver(createConversationSchema),
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (debouncedUsername) findUser(debouncedUsername, skip);
    }, [debouncedUsername, skip]);

    return (
        <Dialog open={open} onOpenChange={SetOpen}>
            <DialogTrigger asChild>
                <Button className="w-full flex-1" size="sm" onClick={reset}>
                    Tạo
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Tạo mới cuộc trò chuyện
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Chia sẻ những câu chuyện thú vị
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(create)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tên"
                                            className=" focus-visible:ring-transparent"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FormLabel>Thành viên</FormLabel>
                            <div className="w-full h-fit relative">
                                <Input
                                    placeholder="Tên tài khoản"
                                    onChange={handleOnChange}
                                    value={username}
                                    className=" focus-visible:ring-transparent"
                                    onFocus={focusUser}
                                />

                                {members.length !== 0 && (
                                    <div
                                        className="w-full bg-background border rounded box-border p-3 overflow-auto h-fit max-h-[200px] gap-1 mt-1"
                                        onScroll={handleScroll}
                                    >
                                        {members.map((mem) => (
                                            <div key={mem._id}>
                                                <Button
                                                    onClick={onSelectUser(mem)}
                                                    className="w-full flex justify-start items-center gap-2 py-2"
                                                    variant="ghost"
                                                    type="button"
                                                >
                                                    <div className="w-10 h-10">
                                                        <Avatar>
                                                            <Avatar className="w-full h-full">
                                                                <AvatarImage
                                                                    src={joinApiUrl(
                                                                        "media",
                                                                        mem.avatar ||
                                                                            ""
                                                                    )}
                                                                />
                                                                <AvatarFallback>
                                                                    {mem.name.charAt(
                                                                        0
                                                                    ) || "G"}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </Avatar>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium">
                                                            {mem.username}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {mem.name}
                                                        </p>
                                                    </div>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {username && (
                                    <div
                                        className="absolute -bottom-2 left-0 translate-y-full w-full bg-background border rounded box-border p-3 overflow-auto h-fit max-h-[200px] gap-1 z-1"
                                        onScroll={handleScroll}
                                    >
                                        {loading && canScroll && (
                                            <div className="flex items-center justify-center w-full h-fit py-3">
                                                <div className="flex gap-1 h-fit items-center">
                                                    <LoaderIcon className="animate-spin w-4 h-4" />
                                                    <p className="text-sm">
                                                        Đang tải thêm
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {users.map((user) => (
                                            <div key={user._id}>
                                                <Button
                                                    onClick={onSelectUser(user)}
                                                    className="w-full h-fit flex justify-start items-center gap-2 py-2"
                                                    variant="ghost"
                                                    type="button"
                                                >
                                                    <div className="w-10 h-10">
                                                        <Avatar>
                                                            <Avatar className="w-full h-full">
                                                                <AvatarImage
                                                                    src={joinApiUrl(
                                                                        "media",
                                                                        user.avatar ||
                                                                            ""
                                                                    )}
                                                                />
                                                                <AvatarFallback>
                                                                    {user.name.charAt(
                                                                        0
                                                                    ) || "G"}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </Avatar>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-medium w-full text-left">
                                                            {user.username}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground w-full text-left">
                                                            {user.name}
                                                        </p>
                                                    </div>
                                                    {members.find(
                                                        (m) =>
                                                            m._id === user._id
                                                    ) && <Check size={15} />}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <FormMessage />
                        </FormItem>
                        <DialogFooter>
                            <div className="w-full flex justify-end gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => SetOpen(false)}
                                >
                                    Hủy
                                </Button>
                                <Button variant="default" type="submit">
                                    Tạo
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
