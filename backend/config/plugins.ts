export default ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"), // Required
      },
      settings: {
        defaultFrom: "no-reply@dagadev.tech",
        defaultReplyTo: "no-reply@dagadev.tech",
      },
    },
  },
});
