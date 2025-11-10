import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem = ({ title, children, defaultOpen = true }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50"
      >
        <div className="font-semibold text-gray-800 dark:text-white">{title}</div>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
    children: ReactNode;
}

const Accordion = ({ children }: AccordionProps) => {
    return (
        <div className="space-y-4">{children}</div>
    )
}

Accordion.Item = AccordionItem;

export default Accordion;