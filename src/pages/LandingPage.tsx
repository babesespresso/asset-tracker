import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  CardContent,
  Stack,
  Chip,
  Avatar,
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import GlassCard from '../components/modern/GlassCard';
import FloatingElement from '../components/modern/FloatingElement';
import AnimatedCounter from '../components/modern/AnimatedCounter';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `
    linear-gradient(135deg, 
      rgba(99, 102, 241, 0.1) 0%, 
      rgba(236, 72, 153, 0.1) 50%,
      rgba(6, 182, 212, 0.1) 100%
    ),
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
  `,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%236366f1\' fill-opacity=\'0.05\'%3E%3Cpath d=\'m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
    opacity: 0.3,
  }
}));

const ProductShowcase = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& img': {
    borderRadius: 24,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-10px) rotateX(5deg)',
      boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.35)',
    }
  }
}));

const FeatureGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '2fr 1fr 1fr',
    gridTemplateRows: 'repeat(2, 1fr)',
    '& > :first-of-type': {
      gridRow: 'span 2',
    },
  }
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 24,
  padding: theme.spacing(6),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1, #ec4899, #06b6d4)',
  }
}));

const TestimonialCard = styled(GlassCard)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance standards protect your valuable asset data with real-time threat monitoring.',
      highlight: true
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'AI-Powered Analytics',
      description: 'Machine learning insights optimize asset utilization and predict maintenance needs.'
    },
    {
      icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Mobile-First Design',
      description: 'Native iOS and Android apps with offline capabilities and real-time sync.'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'White-Glove Support',
      description: 'Dedicated success managers and 24/7 technical support for enterprise clients.'
    }
  ];

  const stats = [
    { label: 'Assets Tracked', value: 2500000, suffix: '+' },
    { label: 'Enterprise Clients', value: 15000, suffix: '+' },
    { label: 'Cost Savings', value: 40, suffix: '%' },
    { label: 'Uptime SLA', value: 99.9, suffix: '%' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO, TechCorp',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'Asset Tracker transformed our operations. We reduced equipment loss by 95% and improved efficiency dramatically.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Operations Director',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      text: 'The ROI was immediate. We recovered the investment cost within 3 months through better asset utilization.'
    },
    {
      name: 'Emily Johnson',
      role: 'Facility Manager',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'Intuitive interface and powerful features. Our team adopted it instantly without any training issues.'
    }
  ];

  return (
    <Box>
      {/* Floating Elements */}
      <FloatingElement size={120} top="10%" left="5%" delay={0} />
      <FloatingElement size={80} top="20%" right="10%" delay={1} />
      <FloatingElement size={100} bottom="30%" left="8%" delay={2} />
      <FloatingElement size={60} bottom="10%" right="15%" delay={3} />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            {/* Text Content - Clean Overlay */}
            <Stack 
              spacing={6} 
              sx={{ 
                position: { lg: 'absolute' },
                left: { lg: 0 },
                top: { lg: '50%' },
                transform: { lg: 'translateY(-50%)' },
                zIndex: 2,
                maxWidth: { xs: '100%', lg: '600px' },
                mb: { xs: 6, lg: 0 }
              }}
            >
              <Stack spacing={3}>
                <Chip 
                  label="🚀 Now with AI-powered insights" 
                  sx={{ 
                    alignSelf: 'flex-start',
                    bgcolor: 'rgba(99, 102, 241, 0.25)',
                    color: 'primary.main',
                    border: '2px solid rgba(99, 102, 241, 0.5)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      bgcolor: 'rgba(99, 102, 241, 0.3)',
                    }
                  }} 
                />
                <Typography 
                  variant="h1" 
                  component="h1"
                  sx={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #6366f1 50%, #ec4899 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '3rem', md: '4.5rem', lg: '4rem' },
                    fontWeight: 800,
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Track Every Asset.
                  <br />
                  Maximize Every Dollar.
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.25rem' },
                    lineHeight: 1.6,
                    maxWidth: '500px'
                  }}
                >
                  The most advanced asset tracking platform trusted by 15,000+ enterprises. 
                  Reduce losses by 95%, increase efficiency by 40%.
                </Typography>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    color: 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
                    '&:hover': { 
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 35px rgba(99, 102, 241, 0.4)'
                    }
                  }}
                  onClick={() => navigate('/signup')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderWidth: 2,
                    '&:hover': { 
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px rgba(99, 102, 241, 0.2)'
                    }
                  }}
                  onClick={() => navigate('/demo')}
                >
                  Watch Demo
                </Button>
              </Stack>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip 
                  icon={<ShieldIcon />}
                  label="SOC 2 Compliant" 
                  sx={{ 
                    bgcolor: 'rgba(16, 185, 129, 0.25)', 
                    color: 'success.main',
                    border: '2px solid rgba(16, 185, 129, 0.5)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      bgcolor: 'rgba(16, 185, 129, 0.3)',
                    }
                  }} 
                />
                <Chip 
                  icon={<TrendingUpIcon />}
                  label="40% Cost Reduction" 
                  sx={{ 
                    bgcolor: 'rgba(245, 158, 11, 0.25)', 
                    color: 'warning.main',
                    border: '2px solid rgba(245, 158, 11, 0.5)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      bgcolor: 'rgba(245, 158, 11, 0.3)',
                    }
                  }} 
                />
                <Chip 
                  icon={<SpeedIcon />}
                  label="5-Min Setup" 
                  sx={{ 
                    bgcolor: 'rgba(6, 182, 212, 0.25)', 
                    color: '#06b6d4',
                    border: '2px solid rgba(6, 182, 212, 0.5)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      bgcolor: 'rgba(6, 182, 212, 0.3)',
                    }
                  }} 
                />
              </Stack>
            </Stack>

            {/* Dashboard Image - Large and Prominent */}
            <ProductShowcase 
              sx={{ 
                position: { lg: 'absolute' },
                right: { lg: '-100px' },
                top: { lg: '50%' },
                transform: { lg: 'translateY(-50%)' },
                width: { xs: '100%', lg: '70%' },
                maxWidth: { xs: '100%', lg: 'none' },
                zIndex: 1
              }}
            >
              <Box
                component="img"
                src="https://storage.googleapis.com/msgsndr/DAtfpo4N8FjMGcV3dUSg/media/6892a13f4f8b90a982de9a64.png"
                alt="Asset Tracker Dashboard - Real-time overview showing 1,247 tracked assets worth $2.4M, 98.5% compliance score, and recent asset activity with detailed tracking information"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: { xs: 600, lg: 1200 },
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 40px 80px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  }
                }}
              />
            </ProductShowcase>
          </Box>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
        <Stack spacing={8}>
          <Stack spacing={3} textAlign="center">
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Trusted by Industry Leaders
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Join thousands of companies that have transformed their asset management with our platform
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="center"
          >
            {stats.map((stat, index) => (
              <StatsContainer key={index} sx={{ flex: 1, minWidth: 200 }}>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  variant="h3"
                  sx={{ 
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                  }}
                />
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </StatsContainer>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 12, position: 'relative' }}>
        <Container maxWidth="lg">
          <Stack spacing={8}>
            <Stack spacing={3} textAlign="center">
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                Everything You Need to Succeed
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Comprehensive asset management platform designed for modern enterprises
              </Typography>
            </Stack>

            <FeatureGrid>
              {features.map((feature, index) => (
                <GlassCard key={index} sx={{ height: feature.highlight ? 'auto' : 300 }}>
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </GlassCard>
              ))}
            </FeatureGrid>
          </Stack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Stack spacing={8}>
          <Stack spacing={3} textAlign="center">
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Loved by Teams Worldwide
            </Typography>
            <Typography variant="h6" color="text.secondary">
              See what our customers are saying about their experience
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <Stack spacing={3}>
                  <Rating value={testimonial.rating} readOnly size="small" />
                  <Typography variant="body1" sx={{ fontStyle: 'italic', flexGrow: 1 }}>
                    "{testimonial.text}"
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={testimonial.avatar} sx={{ width: 48, height: 48 }} />
                    <Stack>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </TestimonialCard>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #06b6d4 100%)',
          color: 'white', 
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                Ready to Transform Your Asset Management?
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Join 15,000+ companies that have revolutionized their operations with Asset Tracker. 
                Start your free trial today and see results in minutes.
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  minWidth: 220,
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
                  }
                }}
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderColor: 'white', 
                  color: 'white',
                  minWidth: 220,
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': { 
                    borderWidth: 2,
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
                onClick={() => navigate('/contact')}
              >
                Schedule Demo
              </Button>
            </Stack>

            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              No credit card required • 14-day free trial • Cancel anytime
            </Typography>
          </Stack>
        </Container>

        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
            opacity: 0.1,
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
