  
        const apiUrl = 'https://68208c34259dad2655ace1fd.mockapi.io/user'; 
        const usersUl = document.getElementById('users');
        const userForm = document.getElementById('userForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageDiv = document.getElementById('message');
        let users = [];

        // Fetch and display users
        async function fetchUsers() {
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) throw new Error('Failed to fetch users');
                users = await res.json();
                renderUsers();
            } catch (err) {
                usersUl.innerHTML = '<li class="error">Error loading users.</li>';
            }
        }

        function renderUsers() {
            usersUl.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                usersUl.appendChild(li);
            });
        }

        // Prevent duplicate entries
        function isDuplicate(name, email) {
            return users.some(
                user =>
                    user.name.trim().toLowerCase() === name.trim().toLowerCase() ||
                    user.email.trim().toLowerCase() === email.trim().toLowerCase()
            );
        }

        userForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            messageDiv.textContent = '';
            messageDiv.className = '';
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (isDuplicate(name, email)) {
                messageDiv.textContent = 'Duplicate name or email!';
                messageDiv.className = 'error';
                return;
            }

            try {
                const res = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email })
                });
                if (!res.ok) throw new Error('Failed to add user');
                const newUser = await res.json();
                users.push(newUser);
                renderUsers();
                messageDiv.textContent = 'User added successfully!';
                messageDiv.className = 'success';
                userForm.reset();
            } catch (err) {
                messageDiv.textContent = 'Error adding user.';
                messageDiv.className = 'error';
            }
        });

        fetchUsers();
    