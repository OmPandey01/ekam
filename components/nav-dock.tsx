"use client"
import Dock from './Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import ComingSoonDialog from './ComingSoonDialog';
import { useState } from 'react';

export default function NavDock() {
    const [open, setOpen] = useState(false);

    const items = [
        { icon: <VscHome size={18} />, label: 'Home', onClick: () => setOpen(true) },
        { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => setOpen(true) },
        { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => setOpen(true) },
        { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => setOpen(true) },
    ];

    return (
        <>
            <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            />
            <ComingSoonDialog open={open} onOpenChange={setOpen} />
        </>
    );
}