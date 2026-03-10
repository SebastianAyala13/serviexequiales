// Año dinámico en el footer
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();

// Menú móvil
(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
    });
  });
})();

// Pequeña ayuda de conversión: al enviar el formulario, abrir WhatsApp con el mensaje prellenado
(function () {
  const form = document.getElementById("lead-form");
  if (!form) return;

  const messageContainer = document.createElement("p");
  messageContainer.className = "form-message";
  form.appendChild(messageContainer);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = (form.nombre && form.nombre.value.trim()) || "";
    const telefono = (form.telefono && form.telefono.value.trim()) || "";
    const ciudad = (form.ciudad && form.ciudad.value) || "";

    if (!nombre || !telefono || !ciudad || !form.acepto.checked) {
      messageContainer.textContent = "Por favor completa todos los campos y acepta ser contactado.";
      messageContainer.className = "form-message form-message--error";
      return;
    }

    const baseUrl = "https://wa.me/573001112233";
    const text = [
      "Hola, quiero información sobre el plan funerario que se paga con el recibo del agua.",
      "",
      `Nombre: ${nombre}`,
      `Celular: ${telefono}`,
      `Ciudad: ${ciudad}`,
    ].join("\n");

    const url = `${baseUrl}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    messageContainer.textContent = "Te estamos redirigiendo a WhatsApp para hablar con un asesor.";
    messageContainer.className = "form-message form-message--success";
  });
})();

// Animaciones de aparición al hacer scroll
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || typeof IntersectionObserver === "undefined") return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  items.forEach((el) => observer.observe(el));
})();

// Animaciones adicionales con GSAP si está disponible
(function () {
  if (typeof window.gsap === "undefined") return;

  const gsap = window.gsap;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  // Hero inicial
  gsap.from(".hero-content", {
    y: 24,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
  });

  gsap.from(".hero-panel", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.1,
    ease: "power2.out",
  });

  gsap.from(".hero-image .gallery-image-frame", {
    y: 40,
    opacity: 0,
    duration: 1.1,
    delay: 0.2,
    ease: "power2.out",
  });

  // Parallax suave del hero al hacer scroll
  if (window.ScrollTrigger) {
    gsap.to(".hero-image .gallery-image-frame", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Pequeño cambio de tamaño del header al bajar
    const header = document.querySelector(".site-header");
    if (header) {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: 99999,
        onUpdate(self) {
          const scrolled = self.scroll() > 10;
          header.style.boxShadow = scrolled ? "0 10px 25px rgba(15,23,42,0.18)" : "none";
          header.style.background = scrolled
            ? "rgba(15,23,42,0.95)"
            : "linear-gradient(to bottom, rgba(248,250,252,0.98), rgba(248,250,252,0.92))";
        },
      });
    }
  }
})();

