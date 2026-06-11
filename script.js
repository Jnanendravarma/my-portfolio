// Portfolio JavaScript - Dark Theme Only
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== CREATE FLOATING PARTICLES =====
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('floating-particles');
  document.body.prepend(particlesContainer);
  
  // Create 30 floating particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particlesContainer.appendChild(particle);
  }
  
  // Initialize AOS (Animate On Scroll) with responsive settings
  if (typeof AOS !== 'undefined') {
    // Adjust animation duration based on screen size
    const isMobile = window.innerWidth < 768;
    
    AOS.init({
      duration: isMobile ? 600 : 800, // Faster animations on mobile
      easing: 'ease-in-out',
      once: true,
      offset: isMobile ? 50 : 100,
      disable: 'phone' // Disable on very small phones where it might cause performance issues
    });
    
    // Refresh AOS on window resize
    window.addEventListener('resize', () => {
      AOS.refresh();
    });
  }
  
  // Handle responsive behavior
  function handleResponsiveElements() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
    
    // Adjust elements based on screen size if needed
    document.documentElement.style.setProperty('--animation-speed', 
      isMobile ? '0.3s' : '0.5s');
  }
  
  // Call once on load
  handleResponsiveElements();
  
  // Update on resize
  window.addEventListener('resize', handleResponsiveElements);

  // Profile Card Animation Enhancement
  function initProfileAnimations() {
    const profileCards = document.querySelectorAll('.profile-card-animated, .profile-img-animated');
    
    // Ensure animations trigger properly
    profileCards.forEach((card, index) => {
      // Add slight stagger for multiple cards
      card.style.animationDelay = `${0.3 + (index * 0.2)}s`;
      
      // Reset animation on visibility change for better UX
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animationPlayState = 'running';
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(card);
      }
    });
  }
  
  // Initialize profile animations
  initProfileAnimations();

  // Education Section Visibility Fix
// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTopButton() {
  if (backToTopButton && window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else if (backToTopButton) {
    backToTopButton.classList.remove('visible');
  }
}

// Only add event listener if the button exists
if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Only add scroll listener if button exists
  window.addEventListener('scroll', toggleBackToTopButton);
}

// Education Section Visibility Fix
const educationSection = document.getElementById('education');
  if (educationSection) {
    // Ensure education section is visible
    educationSection.style.display = 'block';
    educationSection.style.visibility = 'visible';
    educationSection.style.opacity = '1';
    
    // Initialize timeline animations manually if AOS fails
    const timelineItems = educationSection.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.style.opacity = '1';
      item.style.visibility = 'visible';
      item.style.transform = 'translateX(0)';
      item.style.display = 'block';
    });
  }

  // View Resume button opens VARMAB.RESUME.docx in a new tab
  const viewResumeBtn = document.getElementById('view-resume-btn');
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', (e) => {
      // Use the href attribute of the link instead of hardcoding
      const resumeUrl = viewResumeBtn.getAttribute('href');
      window.open(resumeUrl, '_blank');
      e.preventDefault(); // Prevent default link behavior
    });
  }

  // Enhanced Hamburger menu toggle with smooth transitions
  const hamburger = document.getElementById('hamburger-menu');
  const navCenter = document.querySelector('.nav-center');
  const header = document.querySelector('header');
  
  if (hamburger && navCenter) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
      navCenter.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu on link click (better mobile UX)
    navCenter.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navCenter.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navCenter.classList.contains('active') && 
        !navCenter.contains(e.target) && 
        !hamburger.contains(e.target)
      ) {
        navCenter.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
    
    // Add scroll event for sticky header with class change
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

// Skills Marquee Scroll Parallax linkage
const marqueeContents = document.querySelectorAll('.marquee-content');
let scrollTimeout;
let lastScrollY = window.scrollY;

if (marqueeContents.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollDiff = Math.abs(window.scrollY - lastScrollY);
    const acceleration = Math.min(12, scrollDiff * 0.25); // cap speed increase
    
    marqueeContents.forEach(content => {
      const baseDuration = 25; // seconds
      const newDuration = Math.max(8, baseDuration - acceleration);
      content.style.animationDuration = `${newDuration}s`;
    });
    
    lastScrollY = window.scrollY;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      marqueeContents.forEach(content => {
        content.style.animationDuration = '25s';
      });
    }, 200);
  });
}

// Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const projectCards = document.querySelectorAll('.project-card');

// Project data
const projects = [
  {
    id: 0,
    title: "EventHub - Event Platform",
    description: "A comprehensive event hosting and discovery platform designed for campus activities. Users can create events, browse upcoming schedules, register/RSVP, track attendees, and view interactive event venues. Integrated with MongoDB for robust data storage and React for dynamic interface updates.",
    image: "certificates/projects/eventhub project.png",
    tech: ["Node.js", "Express.js", "MongoDB", "React", "Tailwind CSS"],
    demo: "https://event-hub-college.vercel.app",
    code: "https://github.com/Jnanendravarma/EventHub"
  },
  {
    id: 1,
    title: "CampusCare - College Portal",
    description: "A smart campus administration and student support portal. Streamlines student grievance lodging, hostel administration, administrative approvals, and notifications dispatch. Developed to optimize communication and service workflows across college departments.",
    image: "certificates/projects/campuscare project.png",
    tech: ["Java", "Spring Boot", "SQL", "Bootstrap", "Hibernate"],
    demo: "https://campus-care-smoky.vercel.app",
    code: "https://github.com/Jnanendravarma/CampusCare"
  },
  {
    id: 2,
    title: "WeatherSphere Analytics",
    description: "A responsive meteorological dashboard delivering live weather forecasts, search histories, climate analytics, and geolocation tracking. Incorporates API integration to stream accurate global weather reports and visually maps regional temperature gradients.",
    image: "certificates/projects/weathershpere project.png",
    tech: ["HTML5", "CSS3", "JavaScript", "OpenWeather API", "Chart.js"],
    demo: "https://weatherapplication-ptpm.vercel.app",
    code: "https://github.com/Jnanendravarma/weatherapplication"
  },
  {
    id: 3,
    title: "Interactive Tech Portfolio",
    description: "A modern developer portfolio designed with an immersive dark cyberpunk theme. Employs hardware-accelerated CSS marquee scroll tracks, dynamic floating background code parallax, smooth custom cursor interactions, and responsive 3D card tilt effects.",
    image: "certificates/projects/portfolio-mockup.png",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "AOS"],
    demo: "https://my-portfolio-xi-eight-51.vercel.app",
    code: "https://github.com/Jnanendravarma/my-portfolio"
  }
];

let currentProjectIndex = 0;

// Open modal when project card is clicked
projectCards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    // Don't open modal if clicking on buttons
    if (e.target.closest('.demo-btn') || e.target.closest('.view-btn')) {
      return;
    }
    
    currentProjectIndex = index;
    openModal(currentProjectIndex);
  });
});

// Close modal
function closeModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Open modal
function openModal(index) {
  const project = projects[index];
  
  // Update modal content
  document.getElementById('modalImage').src = project.image;
  document.getElementById('modalImage').alt = project.title;
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;
  document.getElementById('modalDemo').href = project.demo;
  document.getElementById('modalCode').href = project.code;
  
  // Update tech tags
  const modalTech = document.getElementById('modalTech');
  modalTech.innerHTML = '';
  project.tech.forEach(tech => {
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.textContent = tech;
    modalTech.appendChild(tag);
  });
  
  // Show modal
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Update navigation buttons
  updateNavigationButtons();
}

// Navigate to previous project
function prevProject() {
  currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  openModal(currentProjectIndex);
}

// Navigate to next project
function nextProject() {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  openModal(currentProjectIndex);
}

// Update navigation buttons visibility
function updateNavigationButtons() {
  prevBtn.style.display = projects.length > 1 ? 'flex' : 'none';
  nextBtn.style.display = projects.length > 1 ? 'flex' : 'none';
}

// Event listeners
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
prevBtn.addEventListener('click', prevProject);
nextBtn.addEventListener('click', nextProject);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!projectModal.classList.contains('active')) return;
  
  switch(e.key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowLeft':
      prevProject();
      break;
    case 'ArrowRight':
      nextProject();
      break;
  }
});

// Prevent modal from closing when clicking inside modal content
document.querySelector('.modal-content').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Initialize navigation buttons
updateNavigationButtons();

// Timeline Animation with alternating directions
const timelineItems = document.querySelectorAll('.timeline-item');

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight * 0.8 && rect.bottom >= 0;
}

// Function to animate timeline items
function animateTimelineItems() {
  timelineItems.forEach((item, index) => {
    if (isInViewport(item) && !item.classList.contains('animate')) {
      // Add delay for staggered animation
      setTimeout(() => {
        item.classList.add('animate');
      }, index * 300); // 300ms delay between each item
    }
  });
}

// Initial check for timeline items in viewport
animateTimelineItems();

// Scroll-based animations for all sections
function handleScrollAnimations() {
  // Timeline animations
  animateTimelineItems();
  
  // Generic fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('visible');
    }
  });
  
  // Slide-in animations
  const slideLeftElements = document.querySelectorAll('.slide-in-left');
  slideLeftElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('visible');
    }
  });
  
  const slideRightElements = document.querySelectorAll('.slide-in-right');
  slideRightElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

// Listen for scroll events
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('resize', handleScrollAnimations);

// Initial check
handleScrollAnimations();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
}

// Contact form handling with EmailJS integration
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Initialize EmailJS with your public key (EmailJS v3 syntax)
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('EqGMMt2a3K12Kixhe');
    console.log('EmailJS initialized successfully');
  } else {
    console.error('EmailJS not loaded');
  }
})();

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    // Simple form validation
    const name = this.querySelector('input[name="from_name"]').value.trim();
    const email = this.querySelector('input[name="from_email"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();
    
    console.log('Form data:', { name, email, message });
    
    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
      showFormMessage('Email service is not available. Please try again later.', 'error');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }
    
    // Send email using EmailJS v3 syntax
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_name: 'Jnanendra Varma',
      reply_to: email
    };
    
    console.log('Sending email with params:', templateParams);
    
    emailjs.send('service_a62qxdy', 'template_w49d4to', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showFormMessage('✅ Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      })
      .catch(function(error) {
        console.error('FAILED...', error);
        let errorMessage = '❌ Sorry, there was an error sending your message.';
        if (error && error.text) {
          console.error('Error details:', error.text);
          errorMessage += ` Please check your internet connection and try again.`;
        }
        showFormMessage(errorMessage, 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
} else {
  console.error('Contact form not found');
}

function showFormMessage(message, type) {
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
}

// Certificate Modal Functionality
const certificateModal = document.getElementById('certificateModal');
const certificateImage = document.getElementById('certificateImage');
const certificateCards = document.querySelectorAll('.certification-card');
const viewCertificateBtns = document.querySelectorAll('.view-certificate-btn');

// Open certificate modal
viewCertificateBtns.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.certification-card');
    const certificateSrc = card.getAttribute('data-certificate');
    
    if (certificateSrc) {
      certificateImage.src = certificateSrc;
      certificateModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
});

// Also allow clicking the card itself
certificateCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't open if clicking the button
    if (e.target.closest('.view-certificate-btn')) return;
    
    const certificateSrc = card.getAttribute('data-certificate');
    if (certificateSrc) {
      certificateImage.src = certificateSrc;
      certificateModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close certificate modal
if (certificateModal) {
  const closeBtn = certificateModal.querySelector('.modal-close');
  const overlay = certificateModal.querySelector('.modal-overlay');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      certificateModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', () => {
      certificateModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certificateModal.style.display === 'flex') {
      certificateModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

}); // Close main DOMContentLoaded function

// ===== CUSTOM CURSOR - STICKY & INTERACTIVE =====
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let cursorX = 0;
let cursorY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function animateCursor() {
  // Smooth easing effect
  currentX += (cursorX - currentX) * 0.15;
  currentY += (cursorY - currentY) * 0.15;
  
  cursor.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Interactive cursor on hover
const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .certification-card, .resume-btn, .demo-btn, .view-btn');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    
    // Set cursor text based on element
    if (el.classList.contains('demo-btn')) {
      cursor.setAttribute('data-text', 'DEMO');
    } else if (el.classList.contains('view-btn')) {
      cursor.setAttribute('data-text', 'VIEW');
    } else if (el.classList.contains('resume-btn') || el.classList.contains('download-resume-nav')) {
      cursor.setAttribute('data-text', 'OPEN');
    } else if (el.classList.contains('project-card')) {
      cursor.setAttribute('data-text', 'CLICK');
    } else if (el.classList.contains('certification-card')) {
      cursor.setAttribute('data-text', 'VIEW');
    } else {
      cursor.setAttribute('data-text', 'CLICK');
    }
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursor.removeAttribute('data-text');
  });
});

// ===== 3D TILT EFFECT FOR CARDS =====
function add3DTilt(selector) {
  const cards = document.querySelectorAll(selector);
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
}

// Apply 3D tilt to cards
add3DTilt('.project-card');
add3DTilt('.skill-item');
add3DTilt('.certification-card');
add3DTilt('.soft-skill-card');
add3DTilt('.about-content');

// ===== FLOATING ANIMATION FOR NAME =====
const nameLetters = document.querySelectorAll('.name-letter');
nameLetters.forEach((letter, index) => {
  letter.style.display = 'inline-block';
  letter.style.animation = `float 3s ease-in-out infinite`;
  letter.style.animationDelay = `${index * 0.1}s`;
});

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll reveal
const revealElements = document.querySelectorAll('.project-card, .skill-item, .certification-card, .timeline-item, .soft-skill-card');
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== PARALLAX SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  requestAnimationFrame(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(el => {
      if (window.innerWidth >= 768) {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      } else {
        el.style.transform = 'none';
      }
    });
  });
});