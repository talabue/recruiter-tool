import { bootstrapApp } from './bootstrap';

bootstrapApp().catch((err: unknown) => console.error(err)); // ✅ Fixes "err implicitly has an 'any' type"
