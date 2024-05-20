import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import CampaignsSection from './CampaignsSection/CampaignsSection';

const ViewCampaignsPage = () => {
    return (
        <>
            <div className="w-full max-w-screen-desktop px-6 mobile:px-24">
                <HeroSection/>
                <CampaignsSection/>
            </div>
        </>
    );
};

export default ViewCampaignsPage;