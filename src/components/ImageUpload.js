// src/components/ImageUpload.js

import React from 'react';
import { useState } from 'react';
import { uploadImage } from '../services/imageService';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        setUploading(true);
        uploadImage(selectedFile)
            .then(response => {
                console.log('Image uploaded successfully:', response);
                setUploadSuccess(true);
                setUploading(false);
                setSelectedFile(null);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                setUploadError(error.message || 'Failed to upload image.');
                setUploading(false);
            });
    };

    return (
        <div className="container">
            <h2>Image Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadSuccess && <p>Image uploaded successfully!</p>}
            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
        </div>
    );
}

export default ImageUpload;
