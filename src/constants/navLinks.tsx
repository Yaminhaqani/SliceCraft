import { type ReactNode } from "react";
import { FaBookOpen, FaHome } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";

export interface NavLink {
  id: number;
  label: string;
  icon: ReactNode;
  to: string;
}

export const navLinks: NavLink[] = [
  { id: 1, label: "Home", icon: <FaHome />, to: "/" },
  { id: 2, label: "Menu", icon: <FaBookOpen />, to: "/menu" },
  { id: 3, label: "Contact", icon: <IoCallSharp />, to: "/contact" },
];
