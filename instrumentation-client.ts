import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  integrations: [
    Sentry.replayIntegration({
      sessionSampleRate: 0.1,
      errorSampleRate: 1.0,
    }),
  ],

  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});