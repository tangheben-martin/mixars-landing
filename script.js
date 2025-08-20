const form = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    userType: document.getElementById('userType').value
    };

    try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyqcOFYlKpDFuH8Puo48-Zj77t_c2P_MjMGjVITtwzTmCamG1Dt-iRp5QRpWXILw-zQ/exec', {
        method: 'POST',
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        responseMessage.textContent = 'Thank you! Your message has been sent.';
        form.reset();
    } else {
        responseMessage.textContent = 'Error submitting the form. Please try again.';
    }
    } catch (error) {
    responseMessage.textContent = 'An error occurred. Please try again.';
    }
});