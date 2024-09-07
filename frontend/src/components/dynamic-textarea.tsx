import { ChangeEvent, forwardRef, useEffect } from "react";
import { Textarea, TextareaProps } from "./ui/textarea";

interface IDynamicTextareaProps extends TextareaProps {
    maxLines: number;
    lineHeight: number;
    value: string;
}

const DynamicTextarea = forwardRef<HTMLTextAreaElement, IDynamicTextareaProps>(
    ({ maxLines, lineHeight, onChange, value, ...props }, ref) => {
        const handleDynamicHeight = (str: string) => {
            if (ref && typeof ref === "object" && ref.current) {
                const textarea = ref.current;

                textarea.style.height = "auto";
                const scrollHeight = textarea.scrollHeight;

                const maxHeight = lineHeight * maxLines;

                if (scrollHeight > maxHeight) {
                    textarea.style.height = `${maxHeight}px`;
                    textarea.style.overflowY = "scroll";
                } else {
                    textarea.style.height = `${scrollHeight}px`;
                    textarea.style.overflowY = "hidden";
                }
            }
        };

        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            if (ref && typeof ref === "object" && ref.current) {
                const textarea = ref.current;

                textarea.style.height = "auto";
                const scrollHeight = textarea.scrollHeight;

                const maxHeight = lineHeight * maxLines;

                if (scrollHeight > maxHeight) {
                    textarea.style.height = `${maxHeight}px`;
                    textarea.style.overflowY = "scroll";
                } else {
                    textarea.style.height = `${scrollHeight}px`;
                    textarea.style.overflowY = "hidden";
                }
                if (onChange) {
                    onChange(e);
                }
            }
        };

        useEffect(() => {
            handleDynamicHeight(value);
        }, [value]);

        return (
            <Textarea
                ref={ref}
                onChange={handleChange}
                style={{
                    height: value ? "" : "auto",
                    overflowY: value ? "scroll" : "hidden",
                }}
                value={value}
                {...props}
            />
        );
    }
);

export default DynamicTextarea;
