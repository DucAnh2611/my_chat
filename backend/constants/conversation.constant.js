const CONVERTSATION_CONSTANT = {
    TYPE: {
        GROUP: "GROUP",
        PERSONAL: "PERSONAL",
    },
    DEFAULT_CONFIG: {
        theme: {
            sender: {
                primary: "#1a73e8", // Default primary color for the sender's message bubble (e.g., blue)
                secondary: "#e8f0fe", // Default secondary color (e.g., lighter blue for gradients or shadows)
                border: "#1a73e8", // Default border color (same as primary)
                text: "#ffffff", // Default text color (white)
                textSize: "14px", // Default text size (14px)
                font: "Arial, sans-serif", // Default font family (Arial or a similar sans-serif)
                bubbleRadius: "16px", // Default border radius for message bubble (16px)
            },
            receiver: {
                primary: "#f1f3f4", // Default primary color for the receiver's message bubble (light gray)
                secondary: "#ffffff", // Default secondary color (white for gradients or shadows)
                border: "#e0e0e0", // Default border color (slightly darker gray)
                text: "#202124", // Default text color (dark gray/black)
                textSize: "14px", // Default text size (14px)
                font: "Arial, sans-serif", // Default font family (Arial or a similar sans-serif)
                bubbleRadius: "16px", // Default border radius for message bubble (16px)
            },
            background: {
                color: "#ffffff", // Default background color (white)
                image: "", // Default background image (none)
                opacity: "1", // Default opacity (fully opaque)
                gradient: "", // Default gradient (none)
            },
            icon: "",
            timestamp: {
                color: "#5f6368", // Default timestamp color (gray)
                font: "Arial, sans-serif", // Default font family (Arial or a similar sans-serif)
                textSize: "12px", // Default text size (12px)
            },
            input: {
                background: "#ffffff", // Default input background color (white)
                text: "#202124", // Default input text color (dark gray/black)
                textSize: "14px", // Default input text size (14px)
                font: "Arial, sans-serif", // Default input font family (Arial or a similar sans-serif)
                border: "#e0e0e0", // Default input border color (light gray)
                borderRadius: "8px", // Default input border radius (8px)
                placeholderColor: "#5f6368", // Default placeholder text color (gray)
            },
            notifications: {
                messageAlertColor: "#ff0000", // Default color for new message alerts (red)
                sound: "default.mp3", // Default sound file for notifications
            },
        },
    },
};

module.exports = CONVERTSATION_CONSTANT;
