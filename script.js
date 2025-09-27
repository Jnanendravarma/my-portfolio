// Portfolio JavaScript - Dark Theme Only
document.addEventListener('DOMContentLoaded', function() {
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
  const navbarLinks = document.getElementById('navbar-links');
  const header = document.querySelector('header');
  
  if (hamburger && navbarLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu on link click (better mobile UX)
    navbarLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navbarLinks.classList.contains('active') && 
        !navbarLinks.contains(e.target) && 
        !hamburger.contains(e.target)
      ) {
        navbarLinks.classList.remove('active');
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

// Skills Carousel Functionality - Auto-scroll every 2 seconds
const skillsCarousel = document.getElementById('skillsCarousel');
const carouselPrevBtn = document.getElementById('prevBtn');
const carouselNextBtn = document.getElementById('nextBtn');

if (skillsCarousel && carouselPrevBtn && carouselNextBtn) {
  let currentPosition = 0;
  const itemWidth = 200; // 180px + 20px gap
  let visibleItems = Math.floor(skillsCarousel.parentElement.offsetWidth / itemWidth);
  const totalItems = skillsCarousel.children.length;
  
  function calculateMaxPosition() {
    visibleItems = Math.floor(skillsCarousel.parentElement.offsetWidth / itemWidth);
    return Math.max(0, (totalItems - visibleItems) * itemWidth);
  }

  // Auto-scroll functionality
  let autoScrollInterval;
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      const maxPosition = calculateMaxPosition();
      if (currentPosition >= maxPosition) {
        currentPosition = 0;
      } else {
        currentPosition += itemWidth;
      }
      updateCarouselPosition();
    }, 2000); // Auto-scroll every 2 seconds
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function updateCarouselPosition() {
    const maxPosition = calculateMaxPosition();
    skillsCarousel.style.transform = `translateX(-${currentPosition}px)`;
    
    // Update button states
    carouselPrevBtn.disabled = currentPosition === 0;
    carouselNextBtn.disabled = currentPosition >= maxPosition;
  }

  carouselPrevBtn.addEventListener('click', () => {
    stopAutoScroll();
    if (currentPosition > 0) {
      currentPosition -= itemWidth;
      updateCarouselPosition();
    }
    setTimeout(startAutoScroll, 3000); // 3 seconds pause after manual interaction
  });

  carouselNextBtn.addEventListener('click', () => {
    stopAutoScroll();
    const maxPosition = calculateMaxPosition();
    if (currentPosition < maxPosition) {
      currentPosition += itemWidth;
      updateCarouselPosition();
    }
    setTimeout(startAutoScroll, 3000); // 3 seconds pause after manual interaction
  });

  // Initialize carousel
  updateCarouselPosition();
  startAutoScroll();

  // Pause auto-scroll on hover
  skillsCarousel.addEventListener('mouseenter', stopAutoScroll);
  skillsCarousel.addEventListener('mouseleave', startAutoScroll);

  // Handle window resize
  window.addEventListener('resize', () => {
    currentPosition = 0;
    updateCarouselPosition();
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
    title: "E-Commerce Web Application",
    description: "A full-stack e-commerce platform built with Node.js, Express.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration. The application provides a seamless shopping experience with real-time inventory updates, secure payment processing, and responsive design for all devices.",
    image: "https://via.placeholder.com/800x500/667eea/ffffff?text=E-Commerce+App",
    tech: ["Node.js", "Express.js", "MongoDB", "React", "Redux", "Stripe API"],
    demo: "#",
    code: "#"
  },
  {
    id: 1,
    title: "Task Management System",
    description: "A comprehensive task management application with real-time updates, team collaboration features, and progress tracking. Built with modern web technologies, it includes features like task assignment, deadline management, progress visualization, and team communication tools.",
    image: "https://via.placeholder.com/800x500/764ba2/ffffff?text=Task+Manager",
    tech: ["JavaScript", "Python", "SQL", "Bootstrap", "Django", "WebSocket"],
    demo: "#",
    code: "#"
  },
  {
    id: 2,
    title: "Weather Forecast App",
    description: "A responsive weather application that provides real-time weather data, 7-day forecasts, and location-based weather information using external APIs. Features include current weather conditions, hourly forecasts, weather maps, and customizable alerts for severe weather conditions.",
    image: "https://via.placeholder.com/800x500/667eea/ffffff?text=Weather+App",
    tech: ["HTML5", "CSS3", "JavaScript", "API", "Chart.js", "Geolocation"],
    demo: "#",
    code: "#"
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website showcasing skills, projects, and professional experience with smooth animations and interactive elements. Features include dynamic content loading, smooth scrolling navigation, contact forms, and social media integration.",
    image: "https://via.placeholder.com/800x500/764ba2/ffffff?text=Portfolio+Website",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive", "GSAP", "Formspree"],
    demo: "#",
    code: "#"
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

}); // Close main DOMContentLoaded function