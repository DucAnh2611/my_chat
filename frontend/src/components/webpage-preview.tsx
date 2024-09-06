import { useEffect, useState } from "react";

const fetchPreviewData = async (url: string) => {
    const response = await fetch(`https://api.microlink.io/?url=${url}`);
    const data = await response.json();

    return data;
};

const WebpagePreview = ({ url = "" }: { url: string }) => {
    const [previewData, setPreviewData] = useState<any>(null);

    const checkUrl = async (url: string) => {
        const foundUrl = url.match(/https?:\/\/[^\s]+/);
        if (foundUrl) {
            const data = await fetchPreviewData(foundUrl[0]);
            console.log(data);
            setPreviewData(data);
        }
    };

    useEffect(() => {
        checkUrl(url);
    }, [url]);

    return (
        <div className="w-full h-auto">
            {previewData && (
                <div className="rounded-md overflow-hidden borderbox-border">
                    <div className="bg-muted box-border px-2 py-2">
                        <p>{previewData.data.publisher}</p>
                        <p>
                            {previewData.data.description ||
                                previewData.data.url}
                        </p>
                    </div>
                    <div className="bg-primary w-full h-auto flex items-center justify-center">
                        {previewData.data.image && (
                            <img
                                src={previewData.data.image.url}
                                alt="preview"
                                style={{ maxWidth: "100%" }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebpagePreview;
