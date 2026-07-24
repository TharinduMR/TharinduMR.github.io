// js/mediaHandler.js

const MediaHandler = {
    currentFile: null,
    fileData: null,
    fileType: null,
    fileName: null,
    isTextFile: false,

    init() {
        this.fileInput = document.getElementById('chat-file-input');
        this.previewContainer = document.getElementById('chat-file-preview');
        this.previewText = document.getElementById('chat-file-text');
        this.removeBtn = document.getElementById('chat-remove-file');
        this.previewIcon = document.getElementById('chat-file-icon');

        if (!this.fileInput) return;

        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        this.removeBtn.addEventListener('click', this.clearFile.bind(this));
    },

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.currentFile = file;
        this.fileName = file.name;
        this.fileType = file.type || this.getMimeTypeFromName(this.fileName);
        
        // Determine if it's a text file
        const textExtensions = ['.txt', '.md', '.csv', '.json', '.js', '.html', '.css'];
        const isTextMime = this.fileType.startsWith('text/') || this.fileType === 'application/json';
        const hasTextExt = textExtensions.some(ext => this.fileName.toLowerCase().endsWith(ext));
        
        this.isTextFile = isTextMime || hasTextExt;

        // Show preview
        this.previewText.textContent = this.fileName;
        this.previewContainer.classList.add('active');

        // Update icon based on type
        if (this.fileType.startsWith('image/')) {
            this.previewIcon.className = 'fa-solid fa-image';
        } else if (this.fileType === 'application/pdf') {
            this.previewIcon.className = 'fa-solid fa-file-pdf';
        } else if (this.isTextFile) {
            this.previewIcon.className = 'fa-solid fa-file-lines';
        } else {
            this.previewIcon.className = 'fa-solid fa-file';
        }

        // Read file contents
        const reader = new FileReader();
        reader.onload = (e) => {
            this.fileData = e.target.result;
            // Strip the Data URL prefix if it's base64, so it's ready for Gemini API
            if (!this.isTextFile && typeof this.fileData === 'string' && this.fileData.includes('base64,')) {
                this.fileData = this.fileData.split('base64,')[1];
            }
        };

        if (this.isTextFile) {
            reader.readAsText(file);
        } else {
            reader.readAsDataURL(file);
        }
    },

    clearFile() {
        this.currentFile = null;
        this.fileData = null;
        this.fileType = null;
        this.fileName = null;
        this.isTextFile = false;
        
        if (this.fileInput) this.fileInput.value = '';
        if (this.previewContainer) this.previewContainer.classList.remove('active');
    },
    
    getFilePayload() {
        if (!this.currentFile || !this.fileData) return null;
        
        return {
            fileData: this.fileData,
            fileName: this.fileName,
            fileType: this.fileType,
            isTextFile: this.isTextFile
        };
    },

    getMimeTypeFromName(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const mimeTypes = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'pdf': 'application/pdf',
            'txt': 'text/plain',
            'md': 'text/markdown',
            'csv': 'text/csv',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        };
        return mimeTypes[ext] || 'application/octet-stream';
    }
};

// Make it available globally
window.MediaHandler = MediaHandler;

document.addEventListener('DOMContentLoaded', () => {
    MediaHandler.init();
});
