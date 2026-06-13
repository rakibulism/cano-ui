"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"

export default function NavigationMenuDemo() {
  return (
    <div className="flex min-h-[260px] w-full justify-center pt-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[360px] gap-1 p-2 md:grid-cols-2">
                {[
                  ["Components", "45+ design-led building blocks"],
                  ["CLI", "Install from your terminal"],
                  ["Registry", "shadcn-compatible source"],
                  ["Themes", "Light, dark, and system"],
                ].map(([title, desc]) => (
                  <li key={title}>
                    <NavigationMenuLink href="#">
                      <div className="text-sm font-medium">{title}</div>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[240px] gap-1 p-2">
                {["Introduction", "Installation", "Using components"].map(
                  (item) => (
                    <li key={item}>
                      <NavigationMenuLink href="#">{item}</NavigationMenuLink>
                    </li>
                  )
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              className={navigationMenuTriggerStyle()}
            >
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
