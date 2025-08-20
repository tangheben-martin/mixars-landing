// Cookie helper functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Check if form was already submitted when page loads
window.addEventListener('DOMContentLoaded', function() {
    if (getCookie('form_submitted')) {
        // Hide form and show "already submitted" message
        document.getElementById('contact-form').style.display = 'none';
        
        const alreadySubmittedMessage = document.createElement('div');
        alreadySubmittedMessage.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 20px; border-radius: 5px; text-align: center;">
                <h3>Form Already Submitted</h3>
                <p>You've already submitted this form. Thank you!</p>
            </div>
        `;
        document.getElementById('contact-form').parentNode.insertBefore(alreadySubmittedMessage, document.getElementById('contact-form'));
        return;
    }
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check again if form was already submitted (double protection)
    if (getCookie('form_submitted')) {
        alert('You have already submitted this form!');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Send to Vercel API
    fetch('/api/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Set cookie for 30 days
        setCookie('form_submitted', 'true', 30);
        
        // Hide the form
        document.getElementById('contact-form').style.display = 'none';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 5px; text-align: center;">
                <h3>Thank you! Your message has been sent.</h3>
                <p>We'll get back to you soon.</p>
            </div>
        `;
        document.getElementById('contact-form').parentNode.insertBefore(successMessage, document.getElementById('contact-form'));
    })
    .catch(error => {
        // Reset button and show error
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Sorry, there was an error sending your message. Please try again.');
        console.error('Error:', error);
    });
});