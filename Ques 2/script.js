
        const form = document.getElementById('registrationForm');
        const messageDiv = document.getElementById('message');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            messageDiv.textContent = '';
            messageDiv.className = '';

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const password = form.password.value.trim();

            if (!name || !email || !password) {
                messageDiv.textContent = 'All fields are required.';
                messageDiv.className = 'error';
                return;
            }

            try {
                const response = await fetch('https://68208c34259dad2655ace1fd.mockapi.io/user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                if (response.ok) {
                    messageDiv.textContent = 'Registration successful!';
                    messageDiv.className = 'success';
                    form.reset();
                } else {
                    const errorData = await response.json();
                    messageDiv.textContent = errorData.message || 'Registration failed. Please try again.';
                    messageDiv.className = 'error';
                }
            } catch (err) {
                messageDiv.textContent = 'Network error. Please try again later.';
                messageDiv.className = 'error';
            }
        });
 