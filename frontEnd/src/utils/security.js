// Prevent DevTools opening
export const preventDevTools = () => {
  document.addEventListener('keydown', (e) => {
    // Prevent F12 key
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+Shift+I (Chrome DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+Shift+C (Chrome DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'U') {
      e.preventDefault();
      return false;
    }

    // Prevent PrintScreen
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      return false;
    }
  });
};

// Prevent right-click context menu
export const preventContextMenu = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};

// Prevent screenshots and screen capture
export const preventScreenCapture = () => {
  // Detect screen capture and screenshot attempts
  if (window.navigator && window.navigator.mediaDevices) {
    window.navigator.mediaDevices.getDisplayMedia = () => {
      return new Promise((_, reject) => {
        reject(new Error('Screen capture is not allowed'));
      });
    };
  }
};

// Prevent copy/paste
export const preventCopyPaste = () => {
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('paste', (e) => {
    e.preventDefault();
    return false;
  });
};

// Initialize all security measures
export const initializeSecurity = () => {
  preventDevTools();
  preventContextMenu();
  preventScreenCapture();
  preventCopyPaste();
  
  // Add warning message when trying to leave the page
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
  });
};
