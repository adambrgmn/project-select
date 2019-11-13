enum SuspenderState {
  suspended,
  resolved,
  rejected,
}

export function createResource<T, I>(fn: (...input: I[]) => Promise<T>) {
  return (...input: I[]) => {
    const suspender = fn(...input);
    let state = SuspenderState.suspended;
    let result: T;
    let error: Error;

    suspender.then(
      r => {
        result = r;
        state = SuspenderState.resolved;
      },
      (e: Error) => {
        error = e;
        state = SuspenderState.rejected;
      },
    );

    return {
      read: () => {
        switch (state) {
          case SuspenderState.suspended:
            throw suspender;
          case SuspenderState.rejected:
            throw error;
          case SuspenderState.resolved:
            return result;
        }
      },
    };
  };
}
