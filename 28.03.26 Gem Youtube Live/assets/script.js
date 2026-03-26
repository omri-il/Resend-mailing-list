/* ===== GEMS Webinar Script =====
   To reuse for a new event, update:
   - EVENT_DATE: the event date/time
   - GOOGLE_SCRIPT_URL: the Apps Script URL for the new Google Sheet
   ================================ */

// ===== CONFIGURATION (CHANGE THESE FOR NEW EVENTS) =====
const EVENT_DATE = new Date("2026-03-29T20:00:00+03:00");
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwB7JaxpULgTMvIMsJxk5vP3FH91FFs-Q4LuPch_wdQtPl9kOPgKBzredZUX2IEM7IJRg/exec";

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;
  const container = document.getElementById("countdown");

  if (diff <= 0) {
    container.innerHTML = '<div class="countdown-expired">השידור החי כבר התחיל!</div>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  container.innerHTML = `
    <div class="countdown-item"><span class="number">${String(seconds).padStart(2, '0')}</span><span class="label">שניות</span></div>
    <div class="countdown-item"><span class="number">${String(minutes).padStart(2, '0')}</span><span class="label">דקות</span></div>
    <div class="countdown-item"><span class="number">${String(hours).padStart(2, '0')}</span><span class="label">שעות</span></div>
    <div class="countdown-item"><span class="number">${String(days).padStart(2, '0')}</span><span class="label">ימים</span></div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== A/B TESTING =====
// Assign variant once, persist in localStorage
let variant = localStorage.getItem("gems_variant");
if (!variant) {
  variant = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem("gems_variant", variant);
}

// ===== CONVERSION TRACKING =====
// Track funnel steps via Clarity custom tags
if (window.clarity) {
  clarity("set", "page", "gems-webinar");
  clarity("set", "variant", variant);
}

function trackEvent(eventName) {
  // Microsoft Clarity
  if (window.clarity) {
    clarity("set", "funnel_step", eventName);
  }
  // Google Analytics (if loaded)
  if (window.gtag) {
    gtag("event", eventName, { event_category: "gems_webinar" });
  }
  console.log("Track:", eventName);
}

// Apply variant differences
function applyVariant() {
  if (variant === "B") {
    // Variant B: consent unchecked by default
    document.getElementById("consent").checked = false;
  }
  // Variant A: consent checked (already default in HTML)
}
document.addEventListener("DOMContentLoaded", applyVariant);

// ===== SIGNUP FORM =====
async function submitForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const consent = document.getElementById("consent");
  const submitBtn = document.getElementById("submit-btn");

  // Validate
  if (!name.value.trim()) { name.focus(); return; }
  if (!email.value.trim() || !email.validity.valid) { email.focus(); return; }
  if (!phone.value.trim()) { phone.focus(); return; }
  if (!consent.checked) { consent.focus(); return; }

  submitBtn.disabled = true;
  submitBtn.textContent = "שולח...";

  const formData = {
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    consent: true,
    workshop_name: document.getElementById("workshop_name").value,
    timestamp: new Date().toLocaleString("he-IL"),
    variant: variant,
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    trackEvent("signup_complete");
    window.location.href = "./thank-you.html?name=" + encodeURIComponent(formData.name) + "&email=" + encodeURIComponent(formData.email);
  } catch (err) {
    alert("שגיאה בשליחה. נסו שוב.");
    submitBtn.disabled = false;
    submitBtn.textContent = "אני רוצה להשתתף! →";
  }
}
