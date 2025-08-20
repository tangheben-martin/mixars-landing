document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // This prevents the page refresh
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        userType: document.getElementById('userType').value
    };
    
    // Send to YOUR Vercel API (not Google directly)
    fetch('/api/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Hide the form
        document.getElementById('contact-form').style.display = 'none';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 5px; text-align: center;">
                <h3>Thank you! You've been registered!'.</h3>
                <p>You'll hear news from us soon. Check your email (and spam folder just in case)</p>
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