'use client';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ReactElement } from 'react';

import { usePathnameIntl } from '@/navigation';
import LangDropdown from '@/ui/LangDropdown/LangDropdown';
import ThemTogler from '@/ui/switch/Switch';

const Header = (): ReactElement => {
  const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathnameIntl();

  const menuItems = [
    { name: t('menuItems.home'), href: '/' },
    // { name: 'RestFull client', href: '/restfull-client' },
    // { name: 'GraphiQL client', href: '/graphiql-client' },
  ];

  const handleScroll = (): void => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      position="sticky"
      className={`z-50 transition-all duration-300 ${isScrolled ? 'bg-white/30 shadow-lg' : 'bg-transparent'}`}
    >
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link href={item.href} aria-current="page" color={pathname === item.href ? 'primary' : 'foreground'}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LangDropdown />
        </NavbarItem>
        <NavbarItem>
          <ThemTogler />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" onPress={() => console.log('sign In')}>
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathname === item.href ? 'primary' : 'foreground'}
              href={item.href}
              aria-current="page"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
