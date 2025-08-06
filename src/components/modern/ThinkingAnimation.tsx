import React from 'react';
import { Box, Typography, Stack, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Lottie from 'lottie-react';

const ThinkingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  animation: 'fadeIn 0.3s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  }
}));

const ThinkingCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 24,
  padding: theme.spacing(6),
  textAlign: 'center',
  maxWidth: 400,
  width: '90%',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  animation: 'slideUp 0.5s ease-out',
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(50px) scale(0.9)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  }
}));

const BrainAnimation = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto 24px',
  position: 'relative',
  '& .brain-pulse': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'pulse 2s ease-in-out infinite',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #6366f1, #ec4899, #06b6d4)',
      zIndex: -1,
      animation: 'rotate 3s linear infinite',
    }
  },
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  }
}));

const ThinkingDots = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& .dot': {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
    animation: 'bounce 1.4s ease-in-out infinite both',
    '&:nth-of-type(1)': {
      animationDelay: '-0.32s',
    },
    '&:nth-of-type(2)': {
      animationDelay: '-0.16s',
    },
    '&:nth-of-type(3)': {
      animationDelay: '0s',
    },
  },
  '@keyframes bounce': {
    '0%, 80%, 100%': {
      transform: 'scale(0)',
    },
    '40%': {
      transform: 'scale(1)',
    },
  }
}));

interface ThinkingAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const ThinkingAnimation: React.FC<ThinkingAnimationProps> = ({ 
  isVisible, 
  onComplete 
}) => {
  const [animationData, setAnimationData] = React.useState(null);
  const [messages, setMessages] = React.useState([
    "Setting up your workspace...",
    "Configuring asset tracking...", 
    "Initializing AI insights...",
    "Almost ready..."
  ]);
  const [currentMessage, setCurrentMessage] = React.useState(0);

  // Load Lottie animation
  React.useEffect(() => {
    fetch('/thinking-animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(() => {
        // Fallback if Lottie file fails to load
        console.log('Using fallback animation');
      });
  }, []);

  // Message cycling
  React.useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        const next = (prev + 1) % messages.length;
        if (next === messages.length - 1) {
          // On last message, complete after showing it
          setTimeout(() => {
            onComplete?.();
          }, 1500);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible, messages.length, onComplete]);

  if (!isVisible) return null;

  return (
    <ThinkingContainer>
      <ThinkingCard>
        <Stack spacing={3} alignItems="center">
          {/* Animation Section */}
          {animationData ? (
            <Box sx={{ width: 120, height: 120 }}>
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          ) : (
            <BrainAnimation>
              <Box className="brain-pulse">
                <Typography sx={{ fontSize: '2.5rem' }}>🧠</Typography>
              </Box>
            </BrainAnimation>
          )}

          {/* Thinking dots */}
          <ThinkingDots>
            <Box className="dot" />
            <Box className="dot" />
            <Box className="dot" />
          </ThinkingDots>

          {/* Dynamic message */}
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'center',
              minHeight: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {messages[currentMessage]}
          </Typography>

          {/* Progress indicator */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={(currentMessage + 1) / messages.length * 100}
              size={40}
              thickness={3}
              sx={{
                color: 'primary.main',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {Math.round((currentMessage + 1) / messages.length * 100)}%
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            This will only take a moment...
          </Typography>
        </Stack>
      </ThinkingCard>
    </ThinkingContainer>
  );
};

export default ThinkingAnimation;
