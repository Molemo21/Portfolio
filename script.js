document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.querySelector(".nav-links");

  menuIcon.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links li a");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", function(e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    setTimeout(function() {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 100);
  });

  // Cursor effects on hover
  const hoverElements = document.querySelectorAll("a, button, .btn, .project-card, .skill-item, .timeline-content");
  
  hoverElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
    });
    
    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });

  // Typing animation for the role text
  const roles = ["Web Developer", "Front-End Developer", "JavaScript Developer", "React Developer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 200;
  let erasingDelay = 100;
  let newTextDelay = 2000;

  function typeText() {
    const typingElement = document.querySelector(".typing-text");
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 200;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(typeText, typingDelay);
  }
  
  // Start the typing animation
  setTimeout(typeText, newTextDelay);

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top");
  
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });
  
  scrollTopBtn.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .contact-item');
  
  function checkScroll() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Set initial state for animated elements
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-in-out';
  });
  
  // Check elements on load
  window.addEventListener('load', checkScroll);
  
  // Check elements on scroll
  window.addEventListener('scroll', checkScroll);
});