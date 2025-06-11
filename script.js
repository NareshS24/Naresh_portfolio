document.addEventListener('DOMContentLoaded', () => {
  console.log('Body classes on DOMContentLoaded:', document.body.classList); // Debug log
  // Show navbar after scrolling past hero section
  const navbar = document.getElementById('navbar');
  const hero = document.getElementById('hero');

  // Check if we're on mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  window.addEventListener('scroll', () => {
    // Don't show navbar on mobile
    if (isMobile()) {
      navbar.classList.add('hidden');
      return;
    }

    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom <= 0) {
      navbar.classList.remove('hidden');
    } else {
      navbar.classList.add('hidden');
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (isMobile()) {
      navbar.classList.add('hidden');
    }
  });

  // Initial check for mobile
  if (isMobile()) {
    navbar.classList.add('hidden');
  }

  // Prepare for galaxy view toggle (no implementation yet)
  const toggleGalaxyBtn = document.querySelector('.toggle-galaxy');
  toggleGalaxyBtn.addEventListener('click', () => {
    // To be implemented: transform grid to galaxy view
  });

  // Typing animation for 'HELLO;'
  const typedText = document.querySelector('.typed-text');
  const textToType = 'HELLO;';
  let charIndex = 0;

  function typeNextChar() {
    if (charIndex <= textToType.length) {
      typedText.textContent = textToType.slice(0, charIndex);
      charIndex++;
      setTimeout(typeNextChar, 180);
    }
  }
  typeNextChar();

  // Animated roles in next-section
  const roles = [
    'Designer',
    'Frontend Developer',
    'Web Developer',
    'Editor'
  ];
  const roleSpan = document.querySelector('.next-role-animated');
  let roleIndex = 0;

  function showNextRole() {
    if (!roleSpan) return;

    roleSpan.classList.add('fade-out');
    setTimeout(() => {
      roleSpan.textContent = roles[roleIndex];
      roleIndex = (roleIndex + 1) % roles.length;
      roleSpan.classList.remove('fade-out');
      roleSpan.classList.add('fade-in');
      setTimeout(() => {
        roleSpan.classList.remove('fade-in');
      }, 300);
    }, 300);

    setTimeout(showNextRole, 1800); // Total duration = fade-out (300) + display (1200) + fade-in (300) = 1800
  }

  if (roleSpan) showNextRole();

  // Highlight nav links based on section in view
  const sections = [
    { id: 'home', link: document.querySelector('.nav-link[href="#home"]') },
    { id: 'about', link: document.querySelector('.nav-link[href="#about"]') },
    { id: 'projects', link: document.querySelector('.nav-link[href="#projects"]') },
    { id: 'services', link: document.querySelector('.nav-link[href="#services"]') },
    { id: 'contact', link: document.querySelector('.nav-link[href="#contact"]') }
    // Add other sections here as you create them
  ];

  function onScrollHighlightNav() {
    let currentActive = null;
    sections.forEach(sectionData => {
      const section = document.getElementById(sectionData.id);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Check if section is mostly in view
      if (rect.top <= 80 && rect.bottom > 80) {
        currentActive = sectionData.link;
      }
    });

    sections.forEach(sectionData => {
      if (sectionData.link) {
        if (sectionData.link === currentActive) {
          sectionData.link.classList.add('active');
        } else {
          sectionData.link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', onScrollHighlightNav);
  // Call on load to set initial active link
  onScrollHighlightNav();

  // About section card interactions
  const aboutCards = document.querySelectorAll('.about-card');
  const backButton = document.querySelector('.back-button');
  const cardsContainer = document.querySelector('.cards-container');
  const sectionTitle = document.querySelector('.section-title');

  aboutCards.forEach(card => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('expanded')) {
        // Hide other cards
        aboutCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.add('hidden-card');
          }
        });
        
        // Hide scroll hints
        const scrollHints = document.querySelectorAll('.scroll-down-hint, .scroll-down-hintt');
        scrollHints.forEach(hint => {
          hint.style.display = 'none';
        });
        
        // Expand clicked card
        card.classList.add('expanded');
        backButton.classList.remove('hidden');
        backButton.classList.add('visible');
        document.body.classList.add('no-scroll');
        
        // Scroll to the expanded card
        card.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    });
  });

  backButton.addEventListener('click', () => {
    // Collapse expanded card
    const expandedCard = document.querySelector('.about-card.expanded');
    if (expandedCard) {
      expandedCard.classList.remove('expanded');
    }
    
    // Show all cards again
    aboutCards.forEach(card => {
      card.classList.remove('hidden-card');
    });
    
    // Show scroll hints again
    const scrollHints = document.querySelectorAll('.scroll-down-hint, .scroll-down-hintt');
    scrollHints.forEach(hint => {
      hint.style.display = 'block';
    });
    
    // Hide back button
    backButton.classList.remove('visible');
    backButton.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    
    // Scroll back to the cards container
    cardsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Projects section scroll reveal
  const projectsHeader = document.querySelector('.projects-header');
  const projectItems = document.querySelectorAll('.project-item');

  // Services section scroll reveal
  const servicesHeader = document.querySelector('.services-header');
  const serviceCards = document.querySelectorAll('.service-card');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, observerOptions);

  if (projectsHeader) {
    observer.observe(projectsHeader);
  }

  projectItems.forEach(item => {
    observer.observe(item);
  });

  if (servicesHeader) {
    observer.observe(servicesHeader);
  }

  serviceCards.forEach(card => {
    observer.observe(card);
  });

  // Contact section elements
  const contactSection = document.getElementById('contact');
  const scrollDownHint = document.querySelector('.scroll-down-hint');

  // Observe contact section for scroll hint visibility
  if (contactSection && scrollDownHint) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollDownHint.classList.add('hidden-hint');
        } else {
          scrollDownHint.classList.remove('hidden-hint');
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of contact section is visible

    contactObserver.observe(contactSection);
  }

  // Contact Form Submission Handling
  const contactForm = document.querySelector('.contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const message = contactForm.querySelector('#message').value;

      // Simple validation
      if (!name || !email || !message) {
        displayFormMessage('Fields are empty!', 'error');
        return;
      }

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          displayFormMessage('Message sent! Thank you.', 'success');
          contactForm.reset(); // Clear the form fields
        } else {
          const data = await response.json();
          if (Object.hasOwnProperty.call(data, 'errors')) {
            displayFormMessage(data["errors"].map(error => error["message"]).join(", "), 'error');
          } else {
            displayFormMessage('Oops! There was a problem submitting your form.', 'error');
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        displayFormMessage('Oops! There was a network error.', 'error');
      }
    });
  }

  function displayFormMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message show ${type}`;
    setTimeout(() => {
      formMessage.classList.remove('show');
      formMessage.classList.remove(type);
    }, 5000); // Hide message after 5 seconds
  }

  // Update copyright year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    });

    // Close mobile menu when a navigation link is clicked
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Function to handle section entrance animations
  function handleSectionEntrance(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'home') {
          entry.target.classList.add('animate-entrance');
        }
      }
    });
  }

  // Create intersection observer for section animations
  const sectionObserver = new IntersectionObserver(handleSectionEntrance, {
    threshold: 0.5
  });

  // Observe home section
  const homeSection = document.getElementById('home');
  if (homeSection) {
    sectionObserver.observe(homeSection);
  }
}); 