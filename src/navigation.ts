import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { locales } from './i18n';

export const {
  Link: LinkIntl,
  redirect: redirectIntl,
  usePathname: usePathnameIntl,
  useRouter: useRouterIntl,
} = createSharedPathnamesNavigation({
  locales,
});
