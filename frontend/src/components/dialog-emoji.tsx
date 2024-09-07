import EmojiPicker, {
    EmojiStyle,
    SuggestionMode,
    Theme as ThemeEmoji,
} from "emoji-picker-react";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";
import { ReactNode } from "react";
import { Theme as AppTheme, useTheme } from "./theme-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface IDialogSelectEmojiProps {
    onSelect: MouseDownEvent;
    trigger: ReactNode;
}

export default function DialogSelectEmoji({
    onSelect,
    trigger,
}: IDialogSelectEmojiProps) {
    const { theme } = useTheme();

    const convertTheme = (theme: AppTheme): ThemeEmoji => {
        const obj: Record<AppTheme, ThemeEmoji> = {
            dark: ThemeEmoji.DARK,
            light: ThemeEmoji.LIGHT,
            system: ThemeEmoji.AUTO,
        };

        return obj[theme];
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                className="h-fit p-0 border-none max-tablet:w-full w-[500px]"
                align="end"
            >
                <EmojiPicker
                    emojiStyle={EmojiStyle.NATIVE}
                    previewConfig={{ showPreview: false }}
                    emojiVersion={"5.0"}
                    theme={convertTheme(theme)}
                    onEmojiClick={onSelect}
                    suggestedEmojisMode={SuggestionMode.FREQUENT}
                    className="!h-[400px] !w-full"
                    categories={[]}
                    lazyLoadEmojis
                    skinTonesDisabled
                    autoFocusSearch
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
