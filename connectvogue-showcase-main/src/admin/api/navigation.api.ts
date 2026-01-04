export interface NavigationItem {
  _id: string;
  label: string;
  href: string;
}

export const fetchNavigation = async (): Promise<NavigationItem[]> => {
  const res = await fetch("http://localhost:5000/api/navigation");
  return res.json();
};
