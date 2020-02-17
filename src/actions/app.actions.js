export function handleError(error) {
  return {
    type: "HANDLE_ERROR",
    error
  };
}

export function forceAuth() {
  return { type: "FORCE_AUTH" };
}
