import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Promptopia 🚀🏔️',
  description: 'Discover & Share AI Prompts',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("Env Var:", process.env.ENV_VAR);
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
