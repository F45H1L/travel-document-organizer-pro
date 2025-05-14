
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

interface NavbarProps {
  onNewPassport: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewPassport }) => {
  return (
    <header className="passport-header sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded">
              <User className="h-6 w-6 text-passport-blue" />
            </div>
            <h1 className="text-white font-bold text-xl md:text-2xl">Passport Management System</h1>
          </div>
          <Button 
            className="bg-white text-passport-blue hover:bg-white/90" 
            onClick={onNewPassport}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
