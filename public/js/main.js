

        // JavaScript for popup functionality
        const enquiryBtn = document.getElementById('enquiry-btn');
        const popup = document.getElementById('popup');
        const closeBtn = document.getElementById('close-btn');

        enquiryBtn.addEventListener('click', () => {
            popup.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
   