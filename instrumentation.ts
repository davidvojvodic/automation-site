export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server instrumentation
    const { init } = await import('@sentry/nextjs');
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    const { init } = await import('@sentry/nextjs');
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: false,
    });
  }
}

export async function onRequestError(
  err: unknown,
  request: {
    path: string;
  },
  context: {
    routerKind: string;
    routePath: string;
  },
) {
  const { captureRequestError } = await import('@sentry/nextjs');
  captureRequestError(err, request, context);
}