import React from 'react';
import './MessageBox.css';

const MessageBox = ({ value, onChange, onSend, placeholder, disabled, onFileSelect }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className={`messageBox ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="fileUploadWrapper">
                <label htmlFor="file">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                        <circle
                            strokeWidth="20"
                            stroke="currentColor"
                            fill="none"
                            r="158.5"
                            cy="168.5"
                            cx="168.5"
                        ></circle>
                        <path
                            strokeLinecap="round"
                            strokeWidth="25"
                            stroke="currentColor"
                            d="M167.759 79V259"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeWidth="25"
                            stroke="currentColor"
                            d="M79 167.138H259"
                        ></path>
                    </svg>
                    <span className="tooltip">Resim Ekle (Yakında)</span>
                </label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    disabled={disabled}
                    onChange={(e) => onFileSelect && onFileSelect(e.target.files[0])}
                />
            </div>
            <input
                required=""
                placeholder={placeholder || "Deneyimini buraya yaz..."}
                type="text"
                id="messageInput"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoComplete="off"
            />
            <button
                id="sendButton"
                onClick={onSend}
                disabled={disabled || !value.trim()}
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                    <path
                        fill="none"
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="33.67"
                        stroke="currentColor"
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default MessageBox;
