import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Phone, Mail } from "lucide-react";
import logo from '@/assets/branding/Logo.svg'; 
import { hrtime } from "process";


export const Footer = () => {
    
    const currentYear = new Date().getFullYear();

    const footerSections = [
    {
        title: "Navigation",
        links: [
            { name: 'Home', href: '#'},
            { name: 'Upload Quiz', href: '#'},
            { name: 'FAQ', href: '#'},
            { name: 'About', href: '#'},
            { name: 'Contact', href: '#'}
        ]
    }
    ];

    const socialLinks = [
        { name: 'LinkedIn', href: '#'},
        { name: 'Instagram', href: '#'},
        { name: 'Twitter', href: '#'},
        { name: 'GitHub', href: '#'}
    ];

    const additionalLinks = [
        { name: 'Privacy', href: '#'},
        { name: 'Terms', href: '#'},
        { name: 'Cookies', href: '#'}
    ];

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company info */}
                    <div className="lg:col-span-1">
                        {/* Brand */}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <img src={ logo } alt="QuizForge"></img>
                            </div>
                            <span className="text-xl font-bold">QuizForge</span>
                        </div>
                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">AI-powered quiz creation.</p>

                        {/* Contact info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-3 text-sm text-gray-300">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <span>eduardogoncalvez00@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-300">
                                <Phone className="h-4 w-4 text-blue-400" />
                                <span>(305) 927-6084</span>
                            </div>
                        </div>

                        {/* Navigation */}
                        {footerSections.map((section => (
                            <div key={section.title}> 
                                <h4 className="font-semibold mb-4">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href} className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )))}
                    </div>
                </div>

                <Separator className="bg-gray-700 mt-6" />

                { /* Bottom footer */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-gray-400 text-sm">
                            © {currentYear} QuizForge. Built with ❤️ by Eduardo Goncalvez.
                        </div>
                        
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                return (
                                    <a key={social.name} href={social.href} className="text-gray-400 hover:text-white transition-colors duration-200" aria-label={social.name}>
                                        {social.name}
                                    </a>
                                );
                            })}
                        </div>

                        {/* Additional Links */}
                        <div className="flex space-x-6">
                            {additionalLinks.map((link) => {
                                return (
                                    <a key={link.name} href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                                        {link.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}