document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.brand-logos-container');
    const logos = document.querySelectorAll('.brand-logo');
    const heroVideo = document.getElementById('heroVideo'); // 👈 new: reference to your hero video

    // Clone logos for seamless scrolling
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        container.appendChild(clone);
    });

    // Pause animation on hover
    container.addEventListener('mouseenter', () => {
        container.style.animationPlayState = 'paused';
    });
    container.addEventListener('mouseleave', () => {
        container.style.animationPlayState = 'running';
    });

    // === THEME HANDLER ===
    function applyTheme() {
        const isDarkMode =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Update CSS variables
        document.documentElement.style.setProperty(
            '--bg-color',
            isDarkMode ? 'var(--dark-bg)' : 'var(--light-bg)'
        );
        document.documentElement.style.setProperty(
            '--text-color',
            isDarkMode ? 'var(--dark-text)' : 'var(--light-text)'
        );
        document.documentElement.style.setProperty(
            '--hero-text-color',
            isDarkMode ? 'var(--palette8)' : 'var(--herotexw)'
        );
        document.documentElement.style.setProperty(
            '--small-object',
            isDarkMode ? 'var(--palette1)' : 'var(--palette2)'
        );
        document.documentElement.style.setProperty(
            '--small-text',
            isDarkMode ? 'var(--palette1)' : 'var(--palette4)'
        );
        document.documentElement.style.setProperty(
            '--div',
            isDarkMode ? 'var(--palette5)' : 'var(--palette6)'
        );
        document.documentElement.style.setProperty(
            '--small-div',
            isDarkMode ? 'var(--palette7)' : 'var(--palette8)'
        );
        document.documentElement.style.setProperty(
            '--odometer',
            isDarkMode ? 'var(--palette9)' : 'var(--palette10)'
        );

        // === 👇 HERO VIDEO SWITCHING ===
        if (heroVideo) {
            const newSrc = isDarkMode
                ? './videos/medium.mp4' // dark theme video
                : './videos/original.mp4'; // light theme video

            // smooth transition effect
            heroVideo.style.opacity = '0';
            setTimeout(() => {
                heroVideo.querySelector('source').setAttribute('src', newSrc);
                heroVideo.load();
                heroVideo.play().catch(() => {}); // avoid autoplay error
                heroVideo.style.opacity = '1';
            }, 400);
        }
    }

    applyTheme();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', applyTheme);
});
