/* =========================================================
   TypeWithFun
   auth.js

   Authentication Layer
   ---------------------------------------------------------
   Features:
   - Sign Up
   - Login
   - Logout
   - Session Persistence
   - Password Hashing
   - Auth Modal Control
   - Navbar User Rendering
   - Form Validation
   - Toast Notifications
   ========================================================= */

"use strict";

/* =========================================================
   AUTH STATE
   ========================================================= */

const Auth = {

    isSignupMode: false,

    /* =====================================================
       INITIALIZE
       ===================================================== */

    initialize() {

        this.renderNavbar();

        this.setupModal();

        this.attachEvents();
    },

    /* =====================================================
       HASH PASSWORD
       ===================================================== */

    hashPassword(password) {

        let hash = 0;

        for (let i = 0; i < password.length; i++) {

            const char =
                password.charCodeAt(i);

            hash =
                ((hash << 5) - hash) + char;

            hash |= 0;
        }

        return btoa(hash.toString());
    },

    /* =====================================================
       VALIDATE EMAIL
       ===================================================== */

    validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);
    },

    /* =====================================================
       VALIDATE USERNAME
       ===================================================== */

    validateUsername(username) {

        return username &&
            username.length >= 3;
    },

    /* =====================================================
       VALIDATE PASSWORD
       ===================================================== */

    validatePassword(password) {

        return password &&
            password.length >= 6;
    },

    /* =====================================================
       SIGN UP
       ===================================================== */

    signup({
        username,
        email,
        password
    }) {

        if (!this.validateUsername(username)) {

            showToast(
                "Username must be at least 3 characters.",
                "error"
            );

            return false;
        }

        if (!this.validateEmail(email)) {

            showToast(
                "Invalid email address.",
                "error"
            );

            return false;
        }

        if (!this.validatePassword(password)) {

            showToast(
                "Password must be at least 6 characters.",
                "error"
            );

            return false;
        }

        if (
            UserStorage.findByEmail(email)
        ) {

            showToast(
                "Email already registered.",
                "error"
            );

            return false;
        }

        if (
            UserStorage.findByUsername(username)
        ) {

            showToast(
                "Username already taken.",
                "error"
            );

            return false;
        }

        const passwordHash =
            this.hashPassword(password);

        const user =
            UserStorage.createUser({
                email,
                username,
                passwordHash
            });

        SessionStorage.setCurrentUser(
            user.id
        );

        this.renderNavbar();

        this.closeModal();

        showToast(
            "Account created successfully!",
            "success"
        );

        return true;
    },

    /* =====================================================
       LOGIN
       ===================================================== */

    login({
        email,
        password
    }) {

        const user =
            UserStorage.findByEmail(email);

        if (!user) {

            showToast(
                "Account not found.",
                "error"
            );

            return false;
        }

        const passwordHash =
            this.hashPassword(password);

        if (
            passwordHash !==
            user.passwordHash
        ) {

            showToast(
                "Incorrect password.",
                "error"
            );

            return false;
        }

        SessionStorage.setCurrentUser(
            user.id
        );

        this.renderNavbar();

        this.closeModal();

        showToast(
            `Welcome back, ${user.username}!`,
            "success"
        );

        return true;
    },

    /* =====================================================
       LOGOUT
       ===================================================== */

    logout() {

        SessionStorage.clearSession();

        this.renderNavbar();

        showToast(
            "Logged out successfully.",
            "success"
        );
    },

    /* =====================================================
       CURRENT USER
       ===================================================== */

    currentUser() {

        return SessionStorage.getCurrentUser();
    },

    /* =====================================================
       NAVBAR RENDER
       ===================================================== */

    renderNavbar() {

        const authArea =
            document.getElementById(
                "authArea"
            );

        if (!authArea) return;

        const user =
            this.currentUser();

        if (!user) {

            authArea.innerHTML = `
                <button
                    class="btn btn-primary"
                    id="loginButton">
                    Login / Sign Up
                </button>
            `;

            const button =
                document.getElementById(
                    "loginButton"
                );

            button?.addEventListener(
                "click",
                () => this.openModal()
            );

            return;
        }

        authArea.innerHTML = `
            <div class="user-panel">

                <img
                    src="${user.avatar}"
                    alt="${user.username}"
                    class="user-avatar"
                >

                <span class="username-display">
                    ${user.username}
                </span>

                <button
                    id="logoutButton"
                    class="btn btn-secondary">
                    Logout
                </button>

            </div>
        `;

        document
            .getElementById("logoutButton")
            ?.addEventListener(
                "click",
                () => this.logout()
            );
    },

    /* =====================================================
       MODAL CONTROL
       ===================================================== */

    openModal() {

        const modal =
            document.getElementById(
                "authModal"
            );

        if (!modal) return;

        modal.classList.remove("hidden");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );
    },

    closeModal() {

        const modal =
            document.getElementById(
                "authModal"
            );

        if (!modal) return;

        modal.classList.add("hidden");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );
    },

    /* =====================================================
       MODE SWITCH
       ===================================================== */

    toggleMode() {

        this.isSignupMode =
            !this.isSignupMode;

        const title =
            document.getElementById(
                "authTitle"
            );

        const username =
            document.getElementById(
                "username"
            );

        const email =
            document.getElementById(
                "email"
            );

        const switchText =
            document.getElementById(
                "authSwitchText"
            );

        const switchButton =
            document.getElementById(
                "switchAuthMode"
            );

        if (
            !title ||
            !username ||
            !email ||
            !switchText ||
            !switchButton
        ) {
            return;
        }

        if (this.isSignupMode) {

            title.textContent =
                "Create Account";

            username.style.display =
                "block";

            email.style.display =
                "block";

            switchText.textContent =
                "Already have an account?";

            switchButton.textContent =
                "Login";

        } else {

            title.textContent =
                "Login";

            username.style.display =
                "none";

            email.style.display =
                "block";

            switchText.textContent =
                "Don't have an account?";

            switchButton.textContent =
                "Sign Up";
        }
    },

    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    handleSubmit(event) {

        event.preventDefault();

        const username =
            document.getElementById(
                "username"
            )?.value.trim();

        const email =
            document.getElementById(
                "email"
            )?.value.trim();

        const password =
            document.getElementById(
                "password"
            )?.value;

        if (this.isSignupMode) {

            this.signup({
                username,
                email,
                password
            });

        } else {

            this.login({
                email,
                password
            });
        }
    },

    /* =====================================================
       SETUP MODAL
       ===================================================== */

    setupModal() {

        if (
            document.getElementById(
                "username"
            )
        ) {

            document.getElementById(
                "username"
            ).style.display = "none";
        }
    },

    /* =====================================================
       EVENTS
       ===================================================== */

    attachEvents() {

        document
            .getElementById(
                "closeAuthModal"
            )
            ?.addEventListener(
                "click",
                () => this.closeModal()
            );

        document
            .getElementById(
                "switchAuthMode"
            )
            ?.addEventListener(
                "click",
                () => this.toggleMode()
            );

        document
            .getElementById(
                "authForm"
            )
            ?.addEventListener(
                "submit",
                (event) =>
                    this.handleSubmit(event)
            );

        window.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    this.closeModal();
                }
            }
        );
    }
};

/* =========================================================
   TOAST SYSTEM
   ========================================================= */

function showToast(
    message,
    type = "success"
) {

    let container =
        document.querySelector(
            ".toast-container"
        );

    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "toast-container";

        document.body.appendChild(
            container
        );
    }

    const toast =
        document.createElement("div");

    toast.className =
        `toast toast-${type}`;

    toast.textContent =
        message;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3500);
}

/* =========================================================
   HELPER
   ========================================================= */

function getCurrentUser() {

    return Auth.currentUser();
}

/* =========================================================
   GLOBAL EXPORTS
   ========================================================= */

window.Auth = Auth;
window.showToast = showToast;
window.getCurrentUser = getCurrentUser;

/* =========================================================
   AUTO INIT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Auth.initialize();
    }
);
