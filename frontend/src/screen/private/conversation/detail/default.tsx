import useUser from "@/hook/userUser";

export default function ConversationDetailDefaultScreen() {
    const { me } = useUser();

    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <p className="font-bold uppercase text-3xl">Hello!</p>
        </div>
    );
}
