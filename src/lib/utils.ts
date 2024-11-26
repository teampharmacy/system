import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useBreadcrumbs(): { name: string; href: string }[] {
  const pathname = usePathname() || "/"; // Fallback to root path if null
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const name = segment.replace(/-/g, " "); // Convert "slug-style" to "Slug Style"
    return { name: name.charAt(0).toUpperCase() + name.slice(1), href };
  });
}
