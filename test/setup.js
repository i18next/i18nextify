// Single source of truth for the i18next mock used across every test file.
// Vitest scopes `vi.mock` to the file it is called in (unlike Jest's global
// behavior), so registering it here via `setupFiles` makes the mock apply
// uniformly to all specs without each one having to repeat the call.
import { vi } from 'vitest'

vi.mock('i18next', async () => await import('./__mocks__/i18next.js'))
