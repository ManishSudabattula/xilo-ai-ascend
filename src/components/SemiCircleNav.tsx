
import React from 'react';
import { motion } from 'framer-motion';
import { Book, BeakerIcon, User, FolderKanban, Send } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  position: number;
  total: number;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, position, total, active }) => {
  const angle = (180 / (total + 1)) * (position + 1);
  const radius = 130; // Radius of the semi-circle
  
  // Convert angle to radians and calculate position
  const radians = (angle * Math.PI) / 180;
  const x = radius * Math.sin(radians);
  const y = radius * Math.cos(radians) * -1; // Inverted for CSS positioning
  
  return (
    <motion.div
      className={`absolute cursor-pointer flex flex-col items-center`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div className={`p-3 rounded-full ${active ? 'bg-frameworkx-accent text-white' : 'bg-frameworkx-dark text-frameworkx-text'} transition-colors`}>
        {icon}
      </div>
      <span className={`mt-1 text-xs ${active ? 'text-frameworkx-accent' : 'text-frameworkx-text'} transition-colors`}>
        {label}
      </span>
    </motion.div>
  );
};

const SemiCircleNav: React.FC = () => {
  const navItems = [
    { icon: <Book size={20} />, label: 'Learning', active: false },
    { icon: <BeakerIcon size={20} />, label: 'AI Lab', active: false },
    { icon: <User size={20} />, label: 'About', active: true },
    { icon: <FolderKanban size={20} />, label: 'Projects', active: false },
    { icon: <Send size={20} />, label: 'Connect', active: false },
  ];
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 w-full flex justify-center items-center"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
    >
      <div className="relative w-[300px] h-[150px] animate-semi-circle-float">
        <div className="semi-circle w-full bg-frameworkx-dark/30 backdrop-blur-sm border border-frameworkx-muted/20">
          {/* Logo */}
          <motion.div
            className="absolute bottom-6 left-6"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/lovable-uploads/e06d9947-6cae-45b5-837b-ab0b441638a2.png" 
              alt="Frameworkx Logo" 
              className="w-10 h-10 invert"
            />
          </motion.div>
          
          {/* Navigation items */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                position={index}
                total={navItems.length}
                active={item.active}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SemiCircleNav;
