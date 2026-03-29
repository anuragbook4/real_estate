document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.menu');
  const navLinks = document.querySelectorAll('.menu a');

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    // Change hamburger to X
    hamburger.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Animations
  const scrollers = document.querySelectorAll('.scroll-reveal');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Option to stop observing once revealed
        // scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  scrollers.forEach(el => scrollObserver.observe(el));

  // Property Image Slider Logic
  const sliders = document.querySelectorAll('.slider-container');
  sliders.forEach(slider => {
    const wrapper = slider.querySelector('.slider-wrapper');
    const dots = slider.querySelectorAll('.dot');
    
    // Update active dot on scroll
    wrapper.addEventListener('scroll', () => {
      const scrollLeft = wrapper.scrollLeft;
      const width = wrapper.clientWidth;
      const activeIndex = Math.round(scrollLeft / width);
      
      dots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });

    // Handle dot click to scroll
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const width = wrapper.clientWidth;
        wrapper.scrollTo({
          left: width * index,
          behavior: 'smooth'
        });
      });
    });
  });

  // Properties Grid Scroll Arrow Logic
  const propertiesGrid = document.getElementById('properties-grid');
  const scrollArrow = document.getElementById('scroll-arrow');

  if(propertiesGrid && scrollArrow) {
    // Hide arrow if we reach the end of scroll
    propertiesGrid.addEventListener('scroll', () => {
      const isScrollEnd = propertiesGrid.scrollLeft + propertiesGrid.clientWidth >= propertiesGrid.scrollWidth - 10;
      if (isScrollEnd) {
        scrollArrow.classList.add('hidden');
      } else {
        scrollArrow.classList.remove('hidden');
      }
    });

    // Handle click to scroll right
    scrollArrow.addEventListener('click', () => {
      // Find the width of one card (including gap if possible, approx safe amount is just clientWidth/2 to guarantee movement)
      const scrollAmount = propertiesGrid.clientWidth > 768 ? propertiesGrid.clientWidth * 0.33 : propertiesGrid.clientWidth * 0.5;
      propertiesGrid.scrollBy({ left: scrollAmount + 30, behavior: 'smooth' });
    });
    
    // Initial check
    setTimeout(() => {
      if (propertiesGrid.scrollWidth <= propertiesGrid.clientWidth) {
         scrollArrow.classList.add('hidden');
      }
    }, 500);
  }

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        // Back to Sun icon (Dark Mode)
        themeToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 01-1.06 1.06l-1.59-1.591a.75.75 0 111.061-1.06l1.59 1.591zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 6.166a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path></svg>';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        // Moon icon (Light Mode)
        themeToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>';
      }
    });
  }

  // Modal Logic
  const modal = document.getElementById('inquiryModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalPropertyName = document.getElementById('modal-property-name');

  window.openInquiryModal = function(propertyName) {
    if (modal && modalPropertyName) {
      modalPropertyName.textContent = 'Inquiring about: ' + propertyName;
      modal.classList.add('active');
    }
  };

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    // Close on outside click
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Back to Top & Scroll Progress Logic
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Calculate Scroll Progress
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }

    // Back to top visibility (show after scrolling down 300px)
    if (backToTop) {
      if (scrollTop > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
