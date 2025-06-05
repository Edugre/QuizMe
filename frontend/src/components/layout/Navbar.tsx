import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Menu, X, Home, Settings, Mail, Info, DoorOpen } from 'lucide-react';
import logo from '@/assets/branding/Logo.svg';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#', icon: Home},
        { name: 'About', href: '#', icon: Info},
        { name: 'Contact', href: '#', icon: Mail},
        { name: 'Settings', href: '#', icon: Settings},
        { name: 'Log Out', href: '#', icon: DoorOpen}
    ];

    return (
        <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <div className='flex-shrink-0 flex items-center justify-center'>
                        <a href='#'>
                            <div className='flex items-center space-x-2'>
                                {/* Logo Icon */}
                                <div className='h-10 w-10 flex items-center justify-center'>
                                    <img src={ logo } alt='QuizForge' className='h-full w-auto'></img>
                                </div>
                                {/* Logo Text */}
                                <span className='text-xl font-bold text-gray-900'>QuizForge</span>
                            </div>
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className='hidden md:block'>
                        <div className='ml-10 flex items-baseline space-x-4'>
                            {navLinks.map((navItem) => (
                                <a
                                    key={navItem.name}
                                    href={navItem.href}
                                    className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
                                >
                                    {navItem.name}
                                </a>
                            ))}
                        </div> 
                    </div>

                    {/* Desktop CTA Button */}
                    <div className='hidden md:block'>
                        <Button>Forge a Quiz Now!</Button>
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className='md:hidden'>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                    <Menu className='h-6! w-6!' />
                                    <span className='sr-only'>Open Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                                <SheetHeader>
                                    <SheetTitle className='flex items-center space-x-2'>
                                        <div className='w-10 h-10 flex items-center justify-center'>
                                            <img src={ logo } alt='QuizForge' className='h-full w-auto'></img>
                                        </div>
                                        <span>QuizForge</span>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className='flex flex-col space-y-4 mt-8'>
                                    {navLinks.map((link, index) => {
                                        const IconComponent = link.icon;
                                        return (
                                            <div key={link.name}>
                                                <a 
                                                href={link.href}
                                                className='flex items-center space-x-3 text-gray-600 hover:text-gray-900 py-3 px-2 rounded-md transition-colors duration-200'
                                                onClick={() => setIsOpen(false)}
                                                >
                                                    <IconComponent className='h-5 w-5' />
                                                    <span className='text-lx'>{link.name}</span>
                                                </a>
                                                {index < navLinks.length - 1 && <Separator className='my-2' />}
                                            </div>
                                        );
                                    })}

                                    <div className='pt-4 px-4'>
                                        <Button className='w-full' onClick={() => setIsOpen(false)}>
                                            Forge a Quiz Now!
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )

}