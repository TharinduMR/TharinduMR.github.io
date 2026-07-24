// chatbot-backend/mediaParser.js

function parseMediaPayload(message, fileData, fileName, fileType, isTextFile) {
    let finalMessage = message || '';
    let geminiPayload = finalMessage;
    let zhipuPayload = finalMessage;
    let zhipuModelOverride = null;

    if (fileData) {
        if (isTextFile) {
            // Both Gemini and Zhipu can process text files by appending content to the prompt
            const fileContent = `\n\n--- Attached File: ${fileName || 'document'} ---\n${fileData}\n--- End of File ---\n`;
            finalMessage += fileContent;
            geminiPayload = finalMessage;
            zhipuPayload = finalMessage;
        } else {
            // For Gemini (Images, PDFs)
            geminiPayload = [
                { text: finalMessage },
                {
                    inlineData: {
                        data: fileData,
                        mimeType: fileType || 'application/octet-stream'
                    }
                }
            ];

            // For Zhipu (GLM-4V for Images)
            if (fileType && fileType.startsWith('image/')) {
                zhipuModelOverride = 'glm-4v';
                // Note: fileData from frontend is raw base64, GLM-4v expects Data URL
                const dataUrl = `data:${fileType};base64,${fileData}`;
                zhipuPayload = [
                    { type: 'text', text: finalMessage },
                    { type: 'image_url', image_url: { url: dataUrl } }
                ];
            } else {
                // If it's a PDF and Zhipu doesn't support base64 PDFs natively in glm-4
                // We just send the text and inform the model that a file was attached
                finalMessage += `\n\n[System Note: User attached a ${fileType} file named ${fileName}, but this fallback model version cannot process it directly.]`;
                zhipuPayload = finalMessage;
            }
        }
    }

    return {
        geminiPayload,
        zhipuPayload,
        zhipuModelOverride,
        finalMessage // Fallback text message
    };
}

module.exports = {
    parseMediaPayload
};
