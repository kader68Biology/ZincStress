// Main JavaScript for embryonic development course website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation
                updateActiveNav(this);
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.chapitre');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`#nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    updateActiveNav(activeLink);
                }
            }
        });
    });
    
    function updateActiveNav(activeLink) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        activeLink.classList.add('active');
    }
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all chapters
    document.querySelectorAll('.chapitre').forEach(section => {
        observer.observe(section);
    });
    
    // Add loading states for buttons
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            const originalText = button.textContent;
            
            // Add loading state
            button.classList.add('loading');
            button.disabled = true;
            
            // Simulate loading (remove after actual functionality is implemented)
            setTimeout(() => {
                button.classList.remove('loading');
                button.disabled = false;
            }, 2000);
        }
    });
    
    // Console welcome message
    console.log(`
    🧬 Bienvenue sur le site du cours de Développement embryonnaire!
    
    Ce site contient:
    - 3 chapitres sur l'embryogenèse
    - Un système de visioconférence
    - Un quiz interactif
    
    Développé pour le Master L3 Biologie - Université XYZ
    `);
    
    // Error handling for missing images/videos
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '<span style="color: #666;">Image non disponible</span>';
        });
    });
    
    videos.forEach(video => {
        video.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 200px;
                background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                color: #666;
                font-size: 1.1rem;
            `;
            placeholder.textContent = 'Vidéo non disponible';
            this.parentNode.replaceChild(placeholder, this);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const sections = Array.from(document.querySelectorAll('.chapitre'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                let nextIndex;
                
                if (e.key === 'ArrowDown') {
                    nextIndex = Math.min(currentIndex + 1, sections.length - 1);
                } else {
                    nextIndex = Math.max(currentIndex - 1, 0);
                }
                
                sections[nextIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});