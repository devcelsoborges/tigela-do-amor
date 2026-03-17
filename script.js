const pixKeyEl = document.getElementById("pixKey");
const copyBtn = document.getElementById("copyPix");
const feedback = document.getElementById("copyFeedback");

async function copyPixKey() {
  const key = pixKeyEl?.textContent?.trim();
  if (!key) return;

  try {
    await navigator.clipboard.writeText(key);
    feedback.textContent = "Chave Pix copiada com sucesso.";
  } catch (_) {
    feedback.textContent = "Não foi possível copiar automaticamente. Copie manualmente.";
  }
}

copyBtn?.addEventListener("click", copyPixKey);

function animateCounter(el) {
  const target = Number(el.getAttribute("data-target"));
  if (!target) return;

  const duration = 1200;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    if (target >= 1000) {
      el.textContent = new Intl.NumberFormat("pt-BR").format(value);
    } else {
      el.textContent = String(value);
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      if (entry.target.classList.contains("counter")) {
        animateCounter(entry.target);
      }

      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.25 }
);

const fadeElements = document.querySelectorAll(".section h2, .section p, .card, .details article, .donate__box");
fadeElements.forEach((el) => {
  el.classList.add("fade-up");
  observer.observe(el);
});

document.querySelectorAll(".counter").forEach((counter) => observer.observe(counter));
