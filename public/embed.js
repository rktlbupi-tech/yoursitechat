
(function() {
  const script = document.currentScript;
  const botId = script.getAttribute('data-bot-id');
  const host = new URL(script.src).origin;

  if (!botId) {
    console.error('YourSiteBot: data-bot-id attribute is missing.');
    return;
  }

  // Prevent recursion: Don't run if inside an iframe
  if (window.self !== window.top) {
    return;
  }

  // Check if container already exists to prevent duplicates
  if (document.getElementById('yoursitebot-container')) {
    return;
  }

  // Create container
  const container = document.createElement('div');
  container.id = 'yoursitebot-container';
  container.style.position = 'fixed';
  container.style.bottom = '24px';
  container.style.right = '24px';
  container.style.zIndex = '2147483647'; // Max z-index
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'flex-end';
  container.style.gap = '16px';
  container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

  // Create iframe for chat window
  const iframe = document.createElement('iframe');
  iframe.src = `${host}/widget/${botId}`;
  iframe.style.width = '350px'; // Smaller formal width
  iframe.style.height = '500px'; // Smaller formal height
  iframe.style.maxHeight = '70vh'; // Don't take up full screen
  iframe.style.maxWidth = '90vw';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px'; // Slightly less rounded for formal look
  iframe.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)'; // Softer shadow
  iframe.style.display = 'none'; // Hidden by default
  iframe.style.backgroundColor = '#fff';
  iframe.style.marginBottom = '8px';
  iframe.style.opacity = '0';
  iframe.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  iframe.style.transform = 'translateY(20px) scale(0.95)';

  // Create toggle button
  const button = document.createElement('button');
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  `;
  button.style.width = '64px';
  button.style.height = '64px';
  button.style.borderRadius = '32px';
  button.style.backgroundColor = '#2563eb'; // Blue-600
  button.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.3), 0 4px 12px rgba(37, 99, 235, 0.2)';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s';
  button.style.position = 'relative';
  
  // Hover effect
  button.onmouseenter = () => {
    button.style.transform = 'scale(1.05)';
    button.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.4), 0 6px 16px rgba(37, 99, 235, 0.3)';
  };
  button.onmouseleave = () => {
    button.style.transform = isOpen ? 'rotate(90deg)' : 'scale(1)';
    button.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.3), 0 4px 12px rgba(37, 99, 235, 0.2)';
  };

  let isOpen = false;

  button.onclick = () => {
    isOpen = !isOpen;
    if (isOpen) {
      iframe.style.display = 'block';
      // Trigger reflow
      iframe.offsetHeight;
      iframe.style.opacity = '1';
      iframe.style.transform = 'translateY(0) scale(1)';
      
      button.style.transform = 'rotate(90deg)';
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
    } else {
      iframe.style.opacity = '0';
      iframe.style.transform = 'translateY(20px) scale(0.95)';
      
      button.style.transform = 'rotate(0deg)';
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
      
      setTimeout(() => {
        iframe.style.display = 'none';
      }, 300);
    }
  };

  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);
})();
