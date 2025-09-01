// Płynne przewijanie do sekcji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

const scrollContainer = document.querySelector('.horizontal-scroll');
const dots = document.querySelectorAll('.dot');
const leftArrow = document.querySelector('.scroll-arrow.left');
const rightArrow = document.querySelector('.scroll-arrow.right');
const sections = document.querySelectorAll('.section-box');

const accHeaders = document.querySelectorAll('.accordion-header');

// Accordeon
accHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;

    // zamknij wszystkie inne
    document.querySelectorAll('.accordion-content').forEach(c => {
      if(c !== content) c.classList.remove('active');
    });

    // otwórz/zamknij aktualny
    content.classList.toggle('active');
  });
});


// Scroll
function updateActiveDot() {
  const scrollLeft = scrollContainer.scrollLeft;
  const containerWidth = scrollContainer.clientWidth;
  sections.forEach((section, index) => {
    const sectionLeft = section.offsetLeft;
    const sectionRight = sectionLeft + section.offsetWidth;
    if (scrollLeft + containerWidth / 2 >= sectionLeft && scrollLeft + containerWidth / 2 < sectionRight) {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
  });
}

scrollContainer.addEventListener('scroll', updateActiveDot);

// Kliknięcie na kropki
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    scrollContainer.scrollTo({
      left: sections[index].offsetLeft,
      behavior: 'smooth'
    });
  });
});

// Strzałki
leftArrow.addEventListener('click', () => {
  const activeIndex = [...dots].findIndex(dot => dot.classList.contains('active'));
  if (activeIndex > 0) {
    scrollContainer.scrollTo({
      left: sections[activeIndex - 1].offsetLeft,
      behavior: 'smooth'
    });
  }
});

rightArrow.addEventListener('click', () => {
  const activeIndex = [...dots].findIndex(dot => dot.classList.contains('active'));
  if (activeIndex < sections.length - 1) {
    scrollContainer.scrollTo({
      left: sections[activeIndex + 1].offsetLeft,
      behavior: 'smooth'
    });
  }
});

// Inicjalizacja
updateActiveDot();

