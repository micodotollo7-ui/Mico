/**
 * Ultimate Portfolio Script
 * Features: Custom Cursor, Mobile Menu, Scroll Progress, Typing Effect,
 * Scroll Reveal, Skill Animations, Stats Counter, Form Submit, Back to Top.
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================================
  // 1. CUSTOM CURSOR (Desktop Only)
  // ============================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      // Instant dot
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      // Smooth outline with requestAnimationFrame
      requestAnimationFrame(() => {
        cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 300, fill: "forwards" });
      });
    }, { passive: true });
    
    // Hover effects for links and buttons
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .glass-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
      });
    });
  }
  
  // ============================================================
  // 2. NAVBAR & SCROLL PROGRESS
  // ============================================================
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Scroll Progress Bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
    
    // Back to Top Visibility
    if (scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }, { passive: true });
  
  // Back to Top Click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // ============================================================
  // 3. MOBILE MENU
  // ============================================================
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // ============================================================
  // 4. TYPING EFFECT (Hero Section)
  // ============================================================
  const typingText = document.getElementById('typing-text');
  const words = ["Grade 8 Student", "Beginner Developer", "Web Enthusiast", "Python Learner"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Faster deleting
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150; // Normal typing
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before new word
    }
    
    setTimeout(type, typeSpeed);
  }
  
  if (typingText) {
    setTimeout(type, 1000); // Start typing after 1 second
  }
  
  // ============================================================
  // 5. SCROLL REVEAL ANIMATIONS
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // ============================================================
  // 6. SKILLS PROGRESS BARS & STATS COUNTER
  // ============================================================
  let skillsAnimated = false;
  let statsAnimated = false;
  
  const skillsSection = document.getElementById('skills');
  const aboutSection = document.getElementById('about');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
      }, 300);
    }
  }, { threshold: 0.2 });
  
  if (skillsSection) skillsObserver.observe(skillsSection);
  
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      const counters = document.querySelectorAll('.counter');
      
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 50; // Adjust for speed
        
        const updateCounter = () => {
          const current = +counter.innerText;
          if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 30);
          } else {
            counter.innerText = target;
          }
        };
        
        updateCounter();
      });
    }
  }, { threshold: 0.5 });
  
  if (aboutSection) statsObserver.observe(aboutSection);
  
  // ============================================================
  // 7. CONTACT FORM SUBMISSION (Fake)
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerText;
      
      submitBtn.innerText = 'Sending... ✉️';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      submitBtn.disabled = true;
      
      // Simulate network request
      setTimeout(() => {
        submitBtn.innerText = 'Message Sent! ✅';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
  
});