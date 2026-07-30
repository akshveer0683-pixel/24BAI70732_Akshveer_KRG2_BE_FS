import React, { useState, useEffect } from 'react';
import './App.css';

// ==========================================
// 1. BRAND SVG ICONS (Local Definitions)
// ==========================================
const TwitterIcon = () => (
  <svg className="platform-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="platform-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="platform-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="platform-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// ==========================================
// 2. PLATFORM CONFIGURATION & CONSTRAINTS
// ==========================================
const PLATFORMS_CONFIG = [
  { id: 'twitter', name: 'Twitter / X', icon: TwitterIcon, color: '#1DA1F2', maxChars: 280 },
  { id: 'facebook', name: 'Facebook', icon: FacebookIcon, color: '#1877F2', maxChars: 2000 },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: '#E1306C', maxChars: 2200 },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedinIcon, color: '#0A66C2', maxChars: 3000 },
];

export default function App() {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter']);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previewTab, setPreviewTab] = useState('twitter');
  const [validationStates, setValidationStates] = useState({});
  const [publishStatus, setPublishStatus] = useState('');

  // Synchronize the active preview tab with selection
  useEffect(() => {
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(previewTab)) {
      setPreviewTab(selectedPlatforms[0]);
    }
  }, [selectedPlatforms, previewTab]);

  // Real-time Validation Engine
  useEffect(() => {
    const states = {};
    const hashtags = (content.match(/#[a-zA-Z0-9_]+/g) || []);
    const hashtagCount = hashtags.length;

    PLATFORMS_CONFIG.forEach((platform) => {
      const errors = [];
      const warnings = [];

      // Constraint logic per platform
      if (content.length > platform.maxChars) {
        errors.push(`Character limit exceeded (${content.length}/${platform.maxChars}).`);
      } else if (platform.maxChars - content.length <= 30 && platform.maxChars - content.length > 0) {
        warnings.push(`Close to limit! Only ${platform.maxChars - content.length} characters left.`);
      }

      if (platform.id === 'twitter') {
        if (mediaFiles.length > 4) {
          errors.push('Twitter / X allows a maximum of 4 media attachments.');
        }
      }

      if (platform.id === 'instagram') {
        if (mediaFiles.length === 0) {
          errors.push('Instagram is a visual platform and requires at least 1 image/video.');
        }
        if (hashtagCount > 30) {
          errors.push('Instagram only supports up to 30 hashtags.');
        }
      }

      if (platform.id === 'linkedin') {
        if (hashtagCount === 0) {
          warnings.push('Add some hashtags (#coding) to improve visibility.');
        }
      }

      states[platform.id] = {
        errors,
        warnings,
        isValid: errors.length === 0,
      };
    });

    setValidationStates(states);
  }, [content, mediaFiles]);

  // Handle media uploads
  const handleMediaUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'video',
      }));
      setMediaFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeMedia = (id) => {
    setMediaFiles((prev) => {
      const item = prev.find((m) => m.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((m) => m.id !== id);
    });
  };

  // Toggle platform selection
  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Run publishing mock simulation
  const handlePublish = (e) => {
    e.preventDefault();
    setPublishStatus('Publishing post...');
    setTimeout(() => {
      setPublishStatus('Post successfully published to all target platforms!');
      setContent('');
      setMediaFiles([]);
    }, 1500);
  };

  const activeErrorsCount = selectedPlatforms.reduce(
    (acc, pId) => acc + (validationStates[pId]?.errors.length || 0),
    0
  );

  return (
    <div className="composer-container">
      <h1 className="title">Multi-Platform Post Composer</h1>
      <p className="subtitle">Draft your post, check platform limitations, and see feed mocks in real-time.</p>

      <div className="composer-grid">
        {/* Left Side: Form Controls */}
        <div className="composer-form">
          {/* Platform Selection */}
          <div className="form-card">
            <h3>1. Target Platforms</h3>
            <div className="platforms-row">
              {PLATFORMS_CONFIG.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                const IconComponent = platform.icon;
                return (
                  <button
                    key={platform.id}
                    type="button"
                    className={`platform-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => togglePlatform(platform.id)}
                    style={{ '--brand-color': platform.color }}
                  >
                    <IconComponent />
                    <span>{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Input Area */}
          <div className="form-card">
            <h3>2. Post Content</h3>
            <textarea
              className="text-input"
              rows="5"
              placeholder="Type your content, add #hashtags, and links..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* Quick Character Progression Fill Bars */}
            <div className="counters-row">
              {selectedPlatforms.map((pId) => {
                const config = PLATFORMS_CONFIG.find((p) => p.id === pId);
                const charCount = content.length;
                const ratio = Math.min(100, (charCount / config.maxChars) * 100);
                const isExceeded = charCount > config.maxChars;

                return (
                  <div key={pId} className="counter-fill-item">
                    <div className="counter-fill-info">
                      <span>{config.name}</span>
                      <span className={isExceeded ? 'exceeded-text' : ''}>
                        {charCount} / {config.maxChars}
                      </span>
                    </div>
                    <div className="progress-bg">
                      <div
                        className={`progress-fill ${isExceeded ? 'error-bg' : ''}`}
                        style={{ width: `${ratio}%`, backgroundColor: config.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Media Attachments */}
          <div className="form-card">
            <h3>3. Media Attachments</h3>
            <div className="file-input-wrapper">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="upload-label">
                Attach Images or Videos
              </label>
            </div>

            {mediaFiles.length > 0 && (
              <div className="media-preview-row">
                {mediaFiles.map((media) => (
                  <div key={media.id} className="media-preview-box">
                    {media.type === 'image' ? (
                      <img src={media.url} alt="upload preview" />
                    ) : (
                      <video src={media.url} />
                    )}
                    <button type="button" className="delete-media" onClick={() => removeMedia(media.id)}>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Trigger */}
          <div className="submit-row">
            <button
              type="button"
              className="publish-btn"
              disabled={selectedPlatforms.length === 0 || activeErrorsCount > 0 || publishStatus.startsWith('Publishing')}
              onClick={handlePublish}
            >
              Publish Post
            </button>
            {publishStatus && <p className="publish-feedback">{publishStatus}</p>}
          </div>
        </div>

        {/* Right Side: Validation & Feed Previews */}
        <div className="composer-sidebar">
          {/* Validation Feedback */}
          <div className="form-card">
            <h3>Real-Time Validation</h3>
            {selectedPlatforms.length === 0 ? (
              <p className="no-data">Select at least one platform to activate validation.</p>
            ) : (
              <div className="validation-container">
                {selectedPlatforms.map((pId) => {
                  const state = validationStates[pId];
                  const hasIssues = state?.errors.length > 0 || state?.warnings.length > 0;

                  return (
                    <div key={pId} className="validation-item">
                      <h4 className="validation-platform-title">
                        {PLATFORMS_CONFIG.find((p) => p.id === pId).name}
                      </h4>
                      {state?.errors.map((err, idx) => (
                        <p key={idx} className="status-message error-message">
                          ❌ {err}
                        </p>
                      ))}
                      {state?.warnings.map((warn, idx) => (
                        <p key={idx} className="status-message warning-message">
                          ⚠️ {warn}
                        </p>
                      ))}
                      {!hasIssues && <p className="status-message success-message">✅ Ready to post!</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Platform Post Preview */}
          <div className="form-card">
            <h3>Live Feed Preview</h3>
            {selectedPlatforms.length === 0 ? (
              <p className="no-data">No platforms selected for preview.</p>
            ) : (
              <div>
                <div className="preview-tabs">
                  {selectedPlatforms.map((pId) => (
                    <button
                      key={pId}
                      type="button"
                      className={`tab-link ${previewTab === pId ? 'active' : ''}`}
                      onClick={() => setPreviewTab(pId)}
                    >
                      {PLATFORMS_CONFIG.find((p) => p.id === pId).name}
                    </button>
                  ))}
                </div>

                {/* Mock feeds rendering */}
                <div className="mock-post-card">
                  <div className="mock-post-header">
                    <div className="mock-user-avatar">U</div>
                    <div>
                      <h5 className="mock-user-name">Your Social Channel</h5>
                      <span className="mock-post-time">Just now</span>
                    </div>
                  </div>

                  <p className="mock-post-text">{content || <span className="placeholder">Write content to preview...</span>}</p>

                  {mediaFiles.length > 0 && (
                    <div className="mock-media-layout">
                      {mediaFiles[0].type === 'image' ? (
                        <img src={mediaFiles[0].url} alt="preview attachment" />
                      ) : (
                        <video src={mediaFiles[0].url} controls />
                      )}
                      {mediaFiles.length > 1 && (
                        <div className="mock-media-badge">+{mediaFiles.length - 1} more items</div>
                      )}
                    </div>
                  )}

                  <div className="mock-footer-row">
                    <span>👍 Like</span>
                    <span>💬 Comment</span>
                    <span>🔄 Share</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
