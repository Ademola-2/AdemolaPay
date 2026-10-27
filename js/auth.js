const messageBox = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const signInForm = document.getElementById("signinForm");
const signUpForm = document.getElementById("signupForm");
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function showMessage(message, type = "error") {
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.className = "form-message show " + type;
}
function setBusy(isBusy, label) {
  if (!submitButton) return;
  submitButton.disabled = isBusy;
  submitButton.textContent = isBusy ? "Please wait..." : label;
}
function firebaseReady() {
  if (typeof firebase === "undefined" || !firebase.apps.length) {
    showMessage("Authentication is not configured yet. Please try again later.");
    return false;
  }
  const config = firebase.app().options;
  if (!config.apiKey || config.apiKey.includes("PASTE_YOUR") || !config.appId || config.appId.includes("PASTE_YOUR")) {
    showMessage("Firebase setup is almost done. The web app configuration still needs to be added.");
    return false;
  }
  return true;
}
function friendlyError(error) {
  const code = error && error.code ? error.code : "";
  const errors = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account was found with that email. Create an account first.",
    "auth/wrong-password": "The email or password is incorrect.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/email-already-in-use": "An account with this email already exists. Please sign in.",
    "auth/weak-password": "Choose a stronger password with at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please wait a little and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection and try again.",
    "auth/operation-not-allowed": "Email/password sign-in is not enabled in Firebase Authentication yet."
  };
  return errors[code] || "Something went wrong. Please try again.";
}
document.querySelectorAll("[data-toggle-password]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.togglePassword);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    button.textContent = input.type === "password" ? "Show" : "Hide";
  });
});

if (signInForm) {
  signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!firebaseReady()) return;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const label = "Sign in →";
    setBusy(true, label);
    try {
      const credential = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (document.getElementById("remember").checked) {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      } else {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }
      sessionStorage.setItem("ademolapayWelcome", credential.user.displayName || email);
      window.location.href = "dashboard.html";
    } catch (error) {
      showMessage(friendlyError(error));
    } finally {
      setBusy(false, label);
    }
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!firebaseReady()) return;
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (fullName.length < 2) return showMessage("Please enter your full name.");
    if (password !== confirmPassword) return showMessage("Your passwords do not match.");
    const label = "Create account →";
    setBusy(true, label);
    try {
      const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await credential.user.updateProfile({ displayName: fullName });
      sessionStorage.setItem("ademolapayWelcome", fullName);
      window.location.href = "dashboard.html";
    } catch (error) {
      showMessage(friendlyError(error));
    } finally {
      setBusy(false, label);
    }
  });
}

const forgotPassword = document.getElementById("forgotPassword");
if (forgotPassword) {
  forgotPassword.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!firebaseReady()) return;
    const email = document.getElementById("email").value.trim();
    if (!email) return showMessage("Enter your email address first, then tap Forgot password.");
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      showMessage("Password reset email sent. Check your inbox.", "success");
    } catch (error) {
      showMessage(friendlyError(error));
    }
  });
}