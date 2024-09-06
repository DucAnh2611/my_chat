import { ChangeEvent, forwardRef } from "react";
import { Textarea, TextareaProps } from "./ui/textarea";

interface IDynamicTextareaProps extends TextareaProps {
    maxLines: number;
    lineHeight: number;
}

const DynamicTextarea = forwardRef<HTMLTextAreaElement, IDynamicTextareaProps>(
    ({ maxLines, lineHeight, onChange, ...props }, ref) => {
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

        return (
            <Textarea
                ref={ref}
                onChange={handleChange}
                style={{
                    height: props.value ? "" : "auto",
                    overflowY: props.value ? "scroll" : "hidden",
                }}
                {...props}
            />
        );
    }
);

export default DynamicTextarea;
