import {
  Polygon,
  SliderHorizontal,
  ColorSwatch,
  I3Square,
  MouseCircle,
  DocumentSketch,
  Folder,
  BookSquare,
  Mobile,
  Apple,
} from "iconsax-reactjs"

export interface SidebarItem {
  id: string
  title: string
  icon: any
  href?: string
}

export interface SidebarSection {
  id: string
  title: string
  items: SidebarItem[]
}

export const sidebarData: SidebarSection[] = [
  {
    id: "web",
    title: "Web",
    items: [
      {
        id: "prototyping",
        title: "Prototyping",
        icon: Polygon,
        href: "/prototyping",
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design",
        icon: SliderHorizontal,
        href: "/ui-ux-design",
      },
      {
        id: "color-typography",
        title: "Color & Typography",
        icon: ColorSwatch,
        href: "/color-typography",
      },
      {
        id: "animation",
        title: "Animation",
        icon: I3Square,
        href: "/animation",
      },
      {
        id: "courses-tutorials",
        title: "Courses & Tutorials",
        icon: MouseCircle,
        href: "/courses-tutorials",
      },
      {
        id: "kits-templates",
        title: "Kits and Templates",
        icon: DocumentSketch,
        href: "/kits-templates",
      },
    ],
  },
  {
    id: "personal-collections",
    title: "Personal Collections",
    items: [
      {
        id: "animations",
        title: "Animations",
        icon: Folder,
        href: "/collections/animations",
      },
      {
        id: "branding",
        title: "Branding",
        icon: Folder,
        href: "/collections/branding",
      },
      {
        id: "cool-resources",
        title: "Cool Resources",
        icon: Folder,
        href: "/collections/cool-resources",
      },
    ],
  },
  {
    id: "related-platforms",
    title: "Related Platforms",
    items: [
      {
        id: "books",
        title: "Books",
        icon: BookSquare,
        href: "/platforms/books",
      },
      {
        id: "mobile",
        title: "Mobile",
        icon: Mobile,
        href: "/platforms/mobile",
      },
      {
        id: "mac-linux",
        title: "Mac & Linux",
        icon: Apple,
        href: "/platforms/mac-linux",
      },
    ],
  },
]
