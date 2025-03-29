// Main JavaScript file for René Gökmen's portfolio website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize the website
    initLoader();
    initCursor();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initParticles();
    initSkillBars();
    initExperienceFilter();
    initThemeToggle();
    initContactForm();
});

// Preloader animation
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');
    
    // Animate loader text
    gsap.to(loaderText, {
        opacity: 0,
        yPercent: -50,
        duration: 0.5,
        repeat: -1,
        yoyo: true
    });
    
    // Hide loader after all content is loaded
    window.addEventListener('load', () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = 'none';
                // Start hero animations after loader is hidden
                animateHero();
            }
        });
    });
}

// Custom cursor effect
function initCursor() {
    const cursor = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .btn, .nav-link, .theme-toggle, .menu-toggle');
    
    // Show custom cursor on desktop only
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        // Move cursor with mouse
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });
        
        // Enlarge cursor on hoverable elements
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgba(66, 133, 244, 0.3)',
                    duration: 0.3
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    width: 20,
                    height: 20,
                    backgroundColor: 'rgba(66, 133, 244, 0.5)',
                    duration: 0.3
                });
            });
        });
    }
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const sections = document.querySelectorAll('section');
    
    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animate mobile menu
        if (navList.classList.contains('active')) {
            gsap.fromTo(navList, 
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 0.3 }
            );
            
            gsap.fromTo('.nav-item', 
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }
            );
        }
    });
}

// Hero section animations
function initHeroAnimations() {
    // Prepare animations but don't play yet
    // They will be triggered after loader is hidden
}

function animateHero() {
    // Animate hero title lines
    gsap.to('.hero-title-line', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
    
    // Animate hero subtitle
    gsap.to('.hero-subtitle', {
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });
    
    // Animate hero CTA buttons
    gsap.to('.hero-cta', {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power3.out"
    });
    
    // Animate scroll indicator
    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power3.out"
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // About section animations
    gsap.fromTo('.about-image', 
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about-content',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
    
    gsap.fromTo('.about-text', 
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about-content',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
    
    // Interest items animation
    gsap.fromTo('.interest-item', 
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.interests-list',
                start: "top 90%",
                toggleActions: "play none none none"
            }
        }
    );
    
    // Timeline animations
    gsap.fromTo('.timeline::before', 
        { height: 0 },
        {
            height: '100%',
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.timeline',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
    
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const direction = i % 2 === 0 ? 50 : -50;
        
        gsap.fromTo(item.querySelector('.timeline-marker'), 
            { scale: 0 },
            {
                scale: 1,
                duration: 0.5,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
        
        gsap.fromTo(item.querySelector('.timeline-content'), 
            { opacity: 0, x: direction },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: i * 0.2 + 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Experience card animations
    gsap.utils.toArray('.experience-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Publication animations
    gsap.utils.toArray('.publication-item').forEach((item, i) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Contact section animations
    gsap.fromTo('.contact-info', 
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-content',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
    
    gsap.fromTo('.contact-form-container', 
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-content',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
}

// Particle animation for hero section
function initParticles() {
    const particleContainer = document.getElementById('particles');
    
    // Create particle system using canvas
    if (particleContainer) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        particleContainer.appendChild(canvas);
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = particleContainer.offsetWidth;
            canvas.height = particleContainer.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle properties
        const particlesArray = [];
        const numberOfParticles = 100;
        const colors = ['#4285F4', '#34A853', '#A142F4'];
        
        // Create particles
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Initialize particles
        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            
            // Connect particles with lines
            connectParticles();
            
            requestAnimationFrame(animate);
        }
        
        // Draw lines between nearby particles
        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = particlesArray[a].color;
                        ctx.globalAlpha = 0.1;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Start particle animation
        init();
        animate();
    }
}

// Animate skill bars
function initSkillBars() {
    gsap.utils.toArray('.skill-item').forEach((item, i) => {
        const progress = item.querySelector('.skill-progress');
        const progressValue = progress.getAttribute('data-progress');
        
        gsap.fromTo(progress, 
            { width: 0 },
            {
                width: `${progressValue}%`,
                duration: 1.5,
                delay: i * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

// Experience filter functionality
function initExperienceFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const experienceCards = document.querySelectorAll('.experience-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('ac<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>