'use client';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState, type ReactElement } from 'react';

import AuthenticationButtons from '@/components/AuthenticationButtons/AuthenticationButtons';
import { usePathnameIntl } from '@/navigation';
import LangDropdown from '@/ui/LangDropdown/LangDropdown';
import ThemTogler from '@/ui/ThemTogler/ThemTogler';

const Header = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathnameIntl();

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      position="sticky"
      className={`z-50 transition-all duration-300 ${isScrolled ? 'bg-white/30 shadow-lg' : 'bg-transparent'}`}
    >
      <NavbarContent>
        <Link href="/">
          <Image src="/images/logo.png" width={48} height={48} alt="logo" />
        </Link>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center"></NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>
          <LangDropdown />
        </NavbarItem>
        <NavbarItem>
          <ThemTogler />
        </NavbarItem>
        <NavbarItem>
          <AuthenticationButtons />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <AuthenticationButtons />
        </NavbarMenuItem>
        <NavbarMenuItem className="flex align-middle">
          <LangDropdown />
          <ThemTogler />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
