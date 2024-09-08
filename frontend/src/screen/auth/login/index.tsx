import { login } from "@/api/action/auth";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUser from "@/hook/userUser";
import { setLocalStorage } from "@/lib/str";
import { LoginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function LoginSceen() {
    const { setIsAuth } = useUser();
    const [show, SetShow] = useState<boolean>(false);

    const toggleShow = () => {
        SetShow((s) => !s);
    };

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const submitForm = async () => {
        const { username, password } = form.getValues();

        const loginCall = await login({ username, password });

        if (loginCall.success && loginCall.result) {
            const { accessToken } = loginCall.result;
            setLocalStorage(accessToken);

            toast({
                title: "Thành công",
                description: "Đăng nhập thành công",
            });

            setIsAuth(true);
        } else {
            toast({
                title: "Có lỗi xảy ra",
                description: loginCall.message,
            });
        }
    };

    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle className="text-center">Đăng nhập</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)}>
                        <div className="flex flex-col gap-2 w-full">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên đăng nhập</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Tên đăng nhập"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Nếu chưa có tài khoản, sẽ tự động
                                            tạo mới.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu</FormLabel>

                                        <FormControl>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Mật khẩu"
                                                    className="flex-1"
                                                    type={
                                                        show
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    {...field}
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="text-foreground aspect-square"
                                                    onClick={toggleShow}
                                                    type="button"
                                                >
                                                    {!show ? (
                                                        <EyeIcon size={15} />
                                                    ) : (
                                                        <EyeOffIcon size={15} />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-5">
                            <Button
                                type="submit"
                                className="w-full text-center"
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
