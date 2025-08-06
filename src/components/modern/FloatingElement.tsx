import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const StyledFloatingElement = styled(Box)<{ delay?: number }>(({ theme, delay = 0 }) => ({
  animation: `${float} 6s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  position: 'absolute',
  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
}));

interface FloatingElementProps extends BoxProps {
  size?: number;
  delay?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  size = 100, 
  delay = 0, 
  top,
  left,
  right,
  bottom,
  ...props 
}) => {
  return (
    <StyledFloatingElement
      delay={delay}
      sx={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        ...props.sx
      }}
      {...props}
    />
  );
};

export default FloatingElement;
