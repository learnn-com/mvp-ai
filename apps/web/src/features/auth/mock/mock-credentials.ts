/** Credenziali mock — allineare a `.pair/adoption/product/story/us-ep01-01-mock-credentials.md`. */
export const MOCK_VALID_EMAIL = 'abbone.test@learnn.local'
export const MOCK_VALID_PASSWORD = 'MockPassword123!'

export function isMockValidCredential(
  email: string,
  password: string,
): boolean {
  return (
    email.trim().toLowerCase() === MOCK_VALID_EMAIL.toLowerCase() &&
    password === MOCK_VALID_PASSWORD
  )
}
