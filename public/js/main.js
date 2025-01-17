// // Add smooth scrolling for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// // Add animation on scroll for event cards
// const observerOptions = {
//     threshold: 0.1
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = '1';
//             entry.target.style.transform = 'translateY(0)';
//         }
//     });
// }, observerOptions);

// document.querySelectorAll('.event-card').forEach(card => {
//     card.style.opacity = '0';
//     card.style.transform = 'translateY(20px)';
//     card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//     observer.observe(card);
// });

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
   