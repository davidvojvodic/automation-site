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
    method?: string;
    headers?: Record<string, string>;
  },
  context: {
    routerKind: string;
    routePath: string;
  },
) {
  const { captureException } = await import('@sentry/nextjs');
  captureException(err, {
    tags: {
      path: request.path,
      routerKind: context.routerKind,
      routePath: context.routePath,
    },
  });
}