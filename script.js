document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    htmlElement.classList.add(savedTheme);
  } else {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
  
  // Update button icon based on current theme
  updateThemeToggleIcon();
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", function() {
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    updateThemeToggleIcon();
  });
  
  function updateThemeToggleIcon() {
    const isDarkMode = htmlElement.classList.contains("dark");
    const sunIcon = themeToggle.querySelector(".fa-sun");
    const moonIcon = themeToggle.querySelector(".fa-moon");
    
    if (isDarkMode) {
      sunIcon.style.opacity = "1";
      sunIcon.style.transform = "translateY(0)";
      moonIcon.style.opacity = "0";
      moonIcon.style.transform = "translateY(-20px)";
    } else {
      sunIcon.style.opacity = "0";
      sunIcon.style.transform = "translateY(20px)";
      moonIcon.style.opacity = "1";
      moonIcon.style.transform = "translateY(0)";
    }
  }

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
  const hoverElements = document.querySelectorAll("a, button, .btn, .project-card, .skill-item, .timeline-content, .theme-toggle");
  
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