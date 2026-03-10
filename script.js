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

