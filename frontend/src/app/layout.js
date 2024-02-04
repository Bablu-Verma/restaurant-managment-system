

import "./globals.css";

export const metadata = {
  title: "Restaurant Managment Ststem",
  description: "Restaurant Managment Ststem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        
          {children}
        
      </body>
    
    </html>
  );
}
