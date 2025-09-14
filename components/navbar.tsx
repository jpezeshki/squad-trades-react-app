"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  NavbarBrand,
} from "@heroui/navbar";
import { User } from "@heroui/user";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import NextLink from "next/link";
import React from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  ArrowRightStartOnRectangle,
  Settings,
  CheckIcon,
  HomeIcon,
} from "@/components/icons";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <HeroUINavbar isBordered maxWidth="xl" position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start" >

        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="cursor-pointer" />

        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <div className="cursor-pointer">
              <HomeIcon />
            </div>
            <p className="font-bold text-inherit">Squad Trades</p>
          </NextLink>
        </NavbarBrand>

        {/* <Chip
          variant="flat"
          color="success"
          endContent={<CheckIcon size={18} />}
        >
          System status: Ok
        </Chip> */}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link href="/settings">
            <Settings className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <div className="flex h-10 items-center space-x-4 bg-black">
            <Divider orientation="vertical" />
          </div>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <User
            description="Membership status: Premium"
            name="Jane Doe"
            avatarProps={{
              name: "JD",
              isBordered: true,
              className: "bg-linear-to-tr from-blue-200 to-green-200 text-black"
            }}
          />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            endContent={<ArrowRightStartOnRectangle/>}
            variant="flat"
          >
            Log out
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="overflow-hidden">
        <div className="mx-4 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  usePathname() === item.href
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "secondary"
                      : "foreground"
                }
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
