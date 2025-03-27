import type { CanMatchFn } from '@angular/router';

export const authGuard: CanMatchFn = (route, segments) => {
  return true;
};
