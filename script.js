document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    const enBtn = document.getElementById('en-btn');
    const esBtn = document.getElementById('es-btn');
    
    // Set default language
    let currentLang = 'en';
    
    // Function to switch language
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update active button
        if (lang === 'en') {
            enBtn.classList.add('active');
            esBtn.classList.remove('active');
        } else {
            esBtn.classList.add('active');
            enBtn.classList.remove('active');
        }
        
        // Update all elements with data-en and data-es attributes
        const elements = document.querySelectorAll('[data-en][data-es]');
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }
    
    // Event listeners for language buttons
    enBtn.addEventListener('click', () => switchLanguage('en'));
    esBtn.addEventListener('click', () => switchLanguage('es'));
    
    // Dark mode toggle functionality
    const themeBtn = document.getElementById('theme-btn');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle dark mode
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navbarLinks = document.getElementById('navbar-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (navbarLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarLinks.classList.contains('active')) {
                navbarLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.getElementById('scroll-down');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Smooth scrolling for navigation with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.padding = '1rem 0';
        }
    });
    
    // Section reveal animation on scroll
    const revealSections = document.querySelectorAll('.section-reveal');
    
    function checkSections() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('active');
            }
        });
    }
    
    // Check sections on initial load
    checkSections();
    
    // Check sections on scroll
    window.addEventListener('scroll', checkSections);
    
    // Animate skill bars when they come into view
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-level');
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.transition = 'width 1.5s ease-in-out';
                level.style.width = width;
                level.classList.add('animate');
            }, 300);
        });
    }
    
    // Use Intersection Observer for skill bars animation
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // Add hover effects for service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.2) rotateY(360deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1) rotateY(0)';
        });
    });
    
    // Add interactive effects for contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.contact-icon');
            icon.style.backgroundColor = 'var(--primary-color)';
            icon.style.color = 'white';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.contact-icon');
            icon.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
            icon.style.color = 'var(--primary-color)';
        });
    });
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Skill Learn More Button Functionality
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const skillPopupOverlay = document.getElementById('skillPopupOverlay');
    const skillPopups = document.querySelectorAll('.skill-popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');
    
    // Open popup when Learn More button is clicked
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const skill = btn.getAttribute('data-skill');
            const popup = document.getElementById(`${skill}Popup`);
            
            if (popup) {
                skillPopupOverlay.classList.add('active');
                popup.classList.add('active');
                
                // Prevent body scrolling when popup is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close popup when close button is clicked
    closePopupBtns.forEach(btn => {
        btn.addEventListener('click', closePopup);
    });
    
    // Close popup when clicking outside the popup
    skillPopupOverlay.addEventListener('click', (e) => {
        if (e.target === skillPopupOverlay) {
            closePopup();
        }
    });
    
    // Close popup when ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && skillPopupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    function closePopup() {
        skillPopupOverlay.classList.remove('active');
        skillPopups.forEach(popup => {
            popup.classList.remove('active');
        });
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
    }
    
    // Enhanced Dark Mode Toggle Animation
    // Remove the second declaration of themeBtn and just use the existing one
    themeBtn.addEventListener('mouseenter', () => {
        themeBtn.style.transform = 'translateY(-3px) rotate(15deg)';
    });
    
    themeBtn.addEventListener('mouseleave', () => {
        themeBtn.style.transform = '';
    });
    
    // Pricing toggle functionality
    const pricingToggle = document.getElementById('pricing-toggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.price-monthly');
            const yearlyPrices = document.querySelectorAll('.price-yearly');
            
            if (this.checked) {
                // Show yearly prices
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'block');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => price.style.display = 'block');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
    
    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(c => c.classList.remove('highlighted'));
            card.classList.add('highlighted');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('highlighted');
        });
    });
    
    // Additional services accordion
    const additionalServicesToggle = document.getElementById('additional-services-toggle');
    const additionalServicesList = document.getElementById('additional-services-list');
    
    if (additionalServicesToggle && additionalServicesList) {
        additionalServicesToggle.addEventListener('click', () => {
            additionalServicesList.classList.toggle('expanded');
            const icon = additionalServicesToggle.querySelector('i');
            
            if (additionalServicesList.classList.contains('expanded')) {
                additionalServicesList.style.maxHeight = additionalServicesList.scrollHeight + 'px';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                additionalServicesList.style.maxHeight = '0';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    }
    
    // Special packages accordion
    const specialPackagesToggle = document.getElementById('special-packages-toggle');
    const specialPackagesList = document.getElementById('special-packages-list');
    
    if (specialPackagesToggle && specialPackagesList) {
        specialPackagesToggle.addEventListener('click', () => {
            specialPackagesList.classList.toggle('expanded');
            const icon = specialPackagesToggle.querySelector('i');
            
            if (specialPackagesList.classList.contains('expanded')) {
                specialPackagesList.style.maxHeight = specialPackagesList.scrollHeight + 'px';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                specialPackagesList.style.maxHeight = '0';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    }
});