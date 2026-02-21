const projects = [
    {
        title: "AI Vision Dashboard",
        description: "A real-time computer vision analytics platform with intuitive data visualization.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        tags: ["React", "Python", "TensorFlow"]
    },
    {
        title: "EcoSphere Mobile App",
        description: "Sustainability tracking app helping users reduce their carbon footprint through gamification.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tags: ["Flutter", "Firebase", "Node.js"]
    },
    {
        title: "Lumina Studio Website",
        description: "An award-winning photography portfolio site featuring high-performance image loading.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        tags: ["Vite", "GSAP", "Three.js"]
    }
];

function renderProjects() {
    const container = document.querySelector('.project-grid');
    if (!container) return;

    container.innerHTML = projects.map((p, index) => `
    <div class="project-card fade-in" style="animation-delay: ${0.2 * index}s">
      <img src="${p.image}" alt="${p.title}" class="project-img" />
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Interactivity
function init() {
    renderProjects();

    // Mouse Spotlight Effect
    const app = document.getElementById('app');
    app.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;

        document.querySelector('.blob-1').style.left = `${x}%`;
        document.querySelector('.blob-1').style.top = `${y}%`;
    });

    // Intersection Observer for Section Visibility
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Skills Animation
    function animateSkills() {
        document.querySelectorAll('.skill-tag').forEach((tag, i) => {
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#00d2ff';
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Set hero image
    document.getElementById('hero-img').src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800";
}

document.addEventListener('DOMContentLoaded', init);
