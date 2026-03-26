/* ===== GEMS Webinar Script =====
   To reuse for a new event, update:
   - EVENT_DATE: the event date/time
   - GOOGLE_SCRIPT_URL: the Apps Script URL for the new Google Sheet
   ================================ */

// ===== CONFIGURATION (CHANGE THESE FOR NEW EVENTS) =====
const EVENT_DATE = new Date("2026-03-28T20:30:00+03:00");
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

// ===== MULTI-STEP FORM =====
let formData = {};

function goToStep2() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const consent = document.getElementById("consent");

  // Validate step 1
  if (!name.value.trim()) { name.focus(); return; }
  if (!email.value.trim() || !email.validity.valid) { email.focus(); return; }
  if (!phone.value.trim()) { phone.focus(); return; }
  if (!consent.checked) { consent.focus(); return; }

  trackEvent("step1_complete");

  // Store data
  formData.name = name.value.trim();
  formData.email = email.value.trim();
  formData.phone = phone.value.trim();
  formData.consent = true;

  // Switch to step 2
  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");
  document.getElementById("step-2").style.display = "block";
  document.getElementById("dot-1").classList.remove("active");
  document.getElementById("dot-1").classList.add("completed");
  document.getElementById("dot-2").classList.add("active");
}

async function submitForm() {
  const gemsExperience = document.getElementById("gems_experience");
  const learningGoal = document.getElementById("learning_goal");

  // Validate step 2
  if (!gemsExperience.value) { gemsExperience.focus(); return; }

  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "שולח...";

  // Complete data
  formData.gems_experience = gemsExperience.value;
  formData.learning_goal = learningGoal.value || "";
  formData.timestamp = new Date().toLocaleString("he-IL");
  formData.variant = variant;

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    trackEvent("signup_complete");

    // Switch to step 3 (confirmation)
    document.getElementById("step-2").classList.remove("active");
    document.getElementById("step-2").style.display = "none";
    document.getElementById("step-3").style.display = "block";
    document.getElementById("dot-2").classList.remove("active");
    document.getElementById("dot-2").classList.add("completed");
    document.getElementById("dot-3").classList.add("active");

    // Hide step indicators
    document.querySelector(".step-indicators").style.display = "none";
  } catch (err) {
    alert("שגיאה בשליחה. נסו שוב.");
    submitBtn.disabled = false;
    submitBtn.textContent = "הרשמה! 🚀";
  }
}
