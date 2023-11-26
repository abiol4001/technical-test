import React, { useEffect, useState } from 'react';

// UI Components
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

// Sidebar contents 
import Sidebar from './Sidebar';

// Component props
type Props = {};

const MobileSidebar = (props: Props) => {

    return (
        // Sheet wrapper 
        <Sheet>

            {/* Button to trigger sidebar */}
            <SheetTrigger>
                <Button variant="ghost" size="icon" className='md:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>

            {/* Sidebar contents */}
            <SheetContent side="right" className='p-0'>
                <Sidebar />
            </SheetContent>

        </Sheet>
    );
}

export default MobileSidebar;