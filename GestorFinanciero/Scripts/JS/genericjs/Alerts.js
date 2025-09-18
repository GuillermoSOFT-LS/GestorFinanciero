// Alerts.js
function showAlert(message, type = 'success', duration = 3000) {
    const container = document.getElementById("alertContainer");
    if (!container) return;

    const alertDiv = document.createElement("div");
    alertDiv.className = "custom-alert";
    alertDiv.textContent = message;

    let bgColor = '';
    switch (type) {
        case 'success': bgColor = '#4caf50'; break; 
        case 'danger': bgColor = '#f44336'; break; 
        case 'warning': bgColor = '#ff9800'; break; 
        case 'info': bgColor = '#2196f3'; break; 
        default: bgColor = '#2196f3';
    }
    alertDiv.style.backgroundColor = bgColor;
    alertDiv.style.opacity = "0.8";
    alertDiv.style.color = "white";
    alertDiv.style.padding = "10px 15px";
    alertDiv.style.marginBottom = "10px";
    alertDiv.style.borderRadius = "4px";
    alertDiv.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
    alertDiv.style.position = "relative";
    alertDiv.style.transition = "opacity 0.5s";

    container.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.opacity = "0";
        setTimeout(() => alertDiv.remove(), 500);
    }, duration);
}
