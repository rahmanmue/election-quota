import {
  // Tag,
  // Bookmark,
  // Settings,
  Users,
  Settings,
  Package,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuListAdmin(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        // {
        //   href: "",
        //   label: "Posts",
        //   active: pathname.includes("/posts"),
        //   icon: SquarePen,
        //   submenus: [
        //     {
        //       href: "/posts",
        //       label: "All Posts",
        //       active: pathname === "/posts",
        //     },
        //     {
        //       href: "/posts/new",
        //       label: "New Post",
        //       active: pathname === "/posts/new",
        //     },
        //   ],
        // },
        {
          href: "/partai-politik",
          label: "Partai Politik",
          active: pathname.includes("/partai-politik"),
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/daerah-pemilihan",
          label: "Daerah pemilihan",
          active: pathname.includes("/daerah-pemilihan"),
          icon: Package,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}

export function getMenuListUser(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/daerah-pemilihan",
          label: "Daerah pemilihan",
          active: pathname.includes("/daerah-pemilihan"),
          icon: Package,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}

interface NavbarList {
  href: string;
  label: string;
}

export const navbarList: NavbarList[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/sign-in",
    label: "Sign In",
  },
  {
    href: "/sign-up",
    label: "Sign Up",
  },
];
