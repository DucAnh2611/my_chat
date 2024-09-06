import { z } from "zod";

export const LoginSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Tên tài khoản có ít nhất 1 ký tự" })
        .max(20, { message: "Tên tài khoản không thể dài hơn 20 ký tự." })
        .regex(/^[a-zA-Z0-9]+$/, {
            message: "Tên tài khoản chỉ bao gồm chữ cái và số.",
        }),
    password: z.string().min(1, { message: "Mật khẩu có ít nhất 1 ký tự." }),
});
