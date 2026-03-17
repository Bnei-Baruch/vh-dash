// Utility functions for WebRTC streaming

export const randomString = (len) => {
  let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

// Simple error handler (replaces Sentry for vh-dash)
export const captureException = (error, data = {}) => {
  console.error('[WebRTC Error]', error.message, data);
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error details:', error, data);
  }
};
