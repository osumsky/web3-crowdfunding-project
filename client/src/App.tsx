import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { NavLinkName } from './constants';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { getLinkByNavLinkName } from './utils';

const App = () => {
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
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
            <Route path="/campaing-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
