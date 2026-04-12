function initContactForm() {
    const form = document.getElementById("contact-form");
    const success = document.getElementById("contact-success");
    const submitBtn = form?.querySelector("button[type='submit']");

    if (!form || !success || !submitBtn) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Prevent double submit
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";

        const full_name = document.querySelector("#contact-fullname").value.trim();
        const email = document.querySelector("#contact-email").value.trim();
        const subject = document.querySelector("#contact-subject").value;
        const message = document.querySelector("#contact-message").value.trim();

        // Basic email validation (extra layer beyond HTML)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }

        const data = {
            full_name,
            email,
            subject,
            message,
            is_read: false
        };

        try {
            const { data: result, error } = await window.supabaseClient
                .from("contact_submissions")
                .insert([data])
                .select();

            if (error) {
                console.error("Supabase error:", error);
                alert("Failed to send message. Please try again.");
                return;
            }

            console.log("INSERT SUCCESS:", result);

            // Reset form
            form.reset();

            // Success UI
            success.hidden = false;
            success.focus();

            // Optional: hide after 5 seconds
            setTimeout(() => {
                success.hidden = true;
            }, 5000);

        } catch (err) {
            console.error("Unexpected error:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            // Re-enable button always
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Initialize once
document.addEventListener("DOMContentLoaded", initContactForm);

console.log("CONTACT.JS LOADED");