// config/duitku-configuration.js - Next.js 15 Configuration
const duitkuConfig = {
  merchantCode: process.env.DUITKU_MERCHANT_CODE || "DXXXX",
  apiKey: process.env.DUITKU_API_KEY || "XXXc6XXX31829bXXX74cd5XXXXX869XX",
  passport: process.env.DUITKU_ENVIRONMENT === "production", // true for production, false for sandbox
  callbackUrl:
    process.env.DUITKU_CALLBACK_URL ||
    `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/duitku/callback`,
  returnUrl:
    process.env.DUITKU_RETURN_URL ||
    `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
  accountLinkReturnUrl:
    process.env.DUITKU_ACCOUNT_LINK_URL ||
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  expiryPeriod: parseInt(process.env.DUITKU_EXPIRY_PERIOD || "1440"), // 24 hours in minutes

  // Validation function
  validate() {
    const required = ["merchantCode", "apiKey"];
    const missing = required.filter(
      (key) => !this[key] || this[key].startsWith("X"),
    );

    if (missing.length > 0) {
      throw new Error(`Missing DuitKu configuration: ${missing.join(", ")}`);
    }

    return true;
  },

  // Get script URL based on environment
  getScriptUrl() {
    return this.passport
      ? "https://app-prod.duitku.com/lib/js/duitku.js"
      : "https://app-sandbox.duitku.com/lib/js/duitku.js";
  },
};

module.exports = duitkuConfig;
