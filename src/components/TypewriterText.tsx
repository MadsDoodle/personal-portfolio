
import { useTypewriter, Cursor } from 'react-simple-typewriter';

interface TypewriterTextProps {
  strings: string[];
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ strings, className }) => {
  const [text] = useTypewriter({
    words: strings,
    loop: true,
    delaySpeed: 2000,
    typeSpeed: 70,
    deleteSpeed: 50,
  });

  return (
    <div className={className}>
      <span>{text}</span>
      <Cursor cursorColor="hsl(var(--primary))" />
    </div>
  );
};

export default TypewriterText;
