import React, { ReactNode } from 'react';

// type SeoProps = {
//   title: string;
//   description: string;
//   image: string;
// };

type LayoutProps = {
  children: ReactNode;
  // categories: Category[];
  // seo: SeoProps;
};

const Layout: React.FC<LayoutProps> = ({ children }) => <>{children}</>;

export default Layout;
