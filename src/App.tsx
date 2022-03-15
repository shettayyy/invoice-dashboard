import useTheme from './hooks/useTheme';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import BaseNavigation from './pages/BaseNavigation/BaseNavigation';

function App() {
  const [, , initTheme] = useTheme();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <main className="app">
      <Sidebar />
      <section className="routes">
        <BaseNavigation />
      </section>
    </main>
  );
}

export default App;
