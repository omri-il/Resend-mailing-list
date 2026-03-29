/* ===== Cheat Code Live — Script =====
   To reuse for a new event, update:
   - EVENT_DATE: the event date/time
   - GOOGLE_SCRIPT_URL: Apps Script URL for the new Google Sheet
   - WHATSAPP_GROUP_URL: the WhatsApp group invitation link
   ===================================== */

// ===== CONFIGURATION =====
const EVENT_DATE = new Date("2026-03-30T20:00:00+03:00");

// TODO: Replace with new Apps Script URL after creating the Google Sheet
// Steps: Duplicate GEMS Sheet → Tools → Apps Script → Deploy → Copy URL
const GOOGLE_SCRIPT_URL = "REPLACE_WITH_APPS_SCRIPT_URL";

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;
  const container = document.getElementById("countdown");
  if (!container) return;

  if (diff <= 0) {
    container.innerHTML = '<div class="countdown-expired">השידור החי כבר התחיל!</div>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  container.innerHTML =
    '<div class="countdown-item"><span class="number">' + String(seconds).padStart(2,'0') + '</span><span class="label">שניות</span></div>' +
    '<div class="countdown-item"><span class="number">' + String(minutes).padStart(2,'0') + '</span><span class="label">דקות</span></div>' +
    '<div class="countdown-item"><span class="number">' + String(hours).padStart(2,'0')   + '</span><span class="label">שעות</span></div>' +
    '<div class="countdown-item"><span class="number">' + String(days).padStart(2,'0')    + '</span><span class="label">ימים</span></div>';
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== TRACKING =====
function trackEvent(name) {
  if (window.clarity) clarity("set", "funnel_step", name);
  console.log("Track:", name);
}

// ===== SURVEY POPUP =====
// Called when user clicks the main CTA — validates form first
function openSurvey() {
  const name  = document.getElementById("name");
  const email = document.getElementById("email");

  if (!name || !name.value.trim())  { if (name) name.focus(); return; }
  if (!email || !email.value.trim() || !email.validity.valid) { if (email) email.focus(); return; }

  trackEvent("survey_opened");
  document.getElementById("survey-overlay").classList.add("open");
}

// Called when user clicks "Continue" in the popup
async function completeSurvey() {
  const selected = document.querySelector('input[name="ai_level"]:checked');
  if (!selected) {
    alert("נא לבחור אפשרות אחת לפני שממשיכים");
    return;
  }

  const btn = document.getElementById("survey-submit-btn");
  btn.disabled = true;
  btn.textContent = "שולח...";

  const name  = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const ai_level = selected.value;
  const workshop_name = document.getElementById("workshop_name").value;

  const formData = {
    name:          name,
    email:         email,
    ai_level:      ai_level,
    workshop_name: workshop_name,
    timestamp:     new Date().toLocaleString("he-IL"),
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method:  "POST",
      mode:    "no-cors",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(formData),
    });

    trackEvent("signup_complete");
    window.location.href =
      "./thank-you.html?name="  + encodeURIComponent(name) +
      "&email=" + encodeURIComponent(email) +
      "&level=" + encodeURIComponent(ai_level);

  } catch (err) {
    alert("שגיאה בשליחה. נסו שוב.");
    btn.disabled = false;
    btn.textContent = "המשך לשלב האחרון >>";
  }
}

// Close popup when clicking backdrop (optional UX)
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("survey-overlay");
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  }
});
