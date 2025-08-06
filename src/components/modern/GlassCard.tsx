import React from 'react';
import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 20,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px 0 rgba(31, 38, 135, 0.5)',
  }
}));

interface GlassCardProps extends CardProps {
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, ...props }) => {
  return (
    <StyledGlassCard {...props}>
      {children}
    </StyledGlassCard>
  );
};

export default GlassCard;
