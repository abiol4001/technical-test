import { ArrowRight } from 'lucide-react'; // icon
import Image from 'next/image';
import React from 'react';

import MobileSidebar from './MobileSidebar'; // mobile menu

type Props = {};

const Navbar = (props: Props) => {

  return (
    // Flex container for layout 
    <div className='h-[90px] px-5 flex justify-between items-center border-b-[2px] border-b-[#4E5058]'>

      {/* // Left side - logo and heading */}
      <div className='flex items-center gap-1'>
        <div className='relative'>
          {/* // App logo image */}
          <Image src="note.svg" alt='' width={40} height={40} />
        </div>
        <h2 className='font-bold text-xl md:text-2xl'>
          Classnotes
        </h2>
      </div>

      {/* // Right side - user details and menu */}
      <div className='flex items-center gap-2'>

        {/* // User profile image */}
        <div className='relative'>
          <Image
            src="/Dp.png"
            alt='profile-image'
            width={40}
            height={40}
            className='rounded-[16px] border-[2px] border-black cursor-pointer'
          />
        </div>

         {/* Hidden on mobile */}
        <p className='hidden md:block'>Joshua</p>
        <ArrowRight className='hidden md:block cursor-pointer' />

        {/* // Mobile menu */}
        <MobileSidebar />

      </div>

    </div>
  );
}

export default Navbar;