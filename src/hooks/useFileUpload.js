// hooks/useFileUpload.js
import { useRef, useState } from 'react';

const useFileUpload = (initialFiles = [], maxFiles = 1, fileType = 'image', defaultPreview = null) => {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState(initialFiles);
    const [previewUrls, setPreviewUrls] = useState(
        initialFiles.length > 0 ? initialFiles.map(file => URL.createObjectURL(file)) : (defaultPreview ? [defaultPreview] : [])
    );

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);

            // maxFiles가 1일 경우 하나의 파일만 유지
            const updatedFiles = maxFiles === 1
                ? [selectedFiles[selectedFiles.length - 1]]
                : [...files, ...selectedFiles].slice(0, maxFiles);

            setFiles(updatedFiles);
            setPreviewUrls(updatedFiles.map(file => URL.createObjectURL(file)));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        const updatedPreviews = previewUrls.filter((_, i) => i !== index);

        setFiles(updatedFiles);
        setPreviewUrls(updatedPreviews);
    };

    const acceptType = fileType === 'image' ? 'image/*' : 'video/*';

    return {
        files,
        previewUrls,
        handleFileChange,
        triggerFileInput,
        fileInputRef,
        acceptType,
        removeFile
    };
};

export default useFileUpload;
