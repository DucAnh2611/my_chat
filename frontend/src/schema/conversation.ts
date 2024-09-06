import { z } from "zod";

export const createConversationSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Tên có ít nhất 1 ký tự" })
        .max(20, { message: "Tên không thể dài hơn 20 ký tự." }),
});
