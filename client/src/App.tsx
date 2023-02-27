import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { NavLinkName } from './constants';
import { Themes, useThemeContext } from './context/ThemeContext';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { getLinkByNavLinkName } from './utils';

const App = () => {
  const { theme } = useThemeContext();

  return (
    <div className={theme === Themes.DARK ? 'dark' : ''}>
      <div className="relative sm:-8 p-4 bg-stone-100 dark:bg-stone-900 min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280] mx-auto sm:pr:5">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path={getLinkByNavLinkName(NavLinkName.Profile)}
              element={<Profile />}
            />
            <Route
              path={getLinkByNavLinkName(NavLinkName.Campaign)}
              element={<CreateCampaign />}
            />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
