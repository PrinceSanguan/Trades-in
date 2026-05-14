import { Head } from '@inertiajs/react';
import ScrollFade from '@/components/ScrollFade';
import HeroSection from '@/LandingPage/HeroSection';
import TrustSection from '@/LandingPage/TrustSection';
import VideoSection from '@/LandingPage/VideoSection';
import HowItWorksSection from '@/LandingPage/HowItWorksSection';
import WhyChorosSection from '@/LandingPage/WhyChorosSection';
import ServicesSection from '@/LandingPage/ServicesSection';
import PortfolioSection from '@/LandingPage/PortfolioSection';
import CertifiedExpertsSection from '@/LandingPage/CertifiedExpertsSection';
import PricingSection from '@/LandingPage/PricingSection';
import VideoTestimonialsSection from '@/LandingPage/VideoTestimonialsSection';
import ProblemSolutionSection from '@/LandingPage/ProblemSolutionSection';
import GuaranteesSection from '@/LandingPage/GuaranteesSection';
import ServiceDetailSection from '@/LandingPage/ServiceDetailSection';
import TestimonialsSection from '@/LandingPage/TestimonialsSection';
import FAQSection from '@/LandingPage/FAQSection';
import ServiceAreasSection from '@/LandingPage/ServiceAreasSection';
import FinalCtaSection from '@/LandingPage/FinalCtaSection';
import MobileStickyCta from '@/LandingPage/MobileStickyCta';
import LandingPageFooter from '@/LandingPage/LandingPageFooter';
import LandingPageHeader from '@/LandingPage/LandingPageHeader';

export default function Welcome() {
    const brandName = 'Choros.io';
    const phone = '07713845811';
    const phoneDisplay = '07713845811';

    const pageTitle = 'Choros.io | Professional Specialists';
    const pageDescription =
        'Professional specialists delivering expert service with full documentation. Fast response times, fixed pricing, and guaranteed results. Contact us today.';

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta name="robots" content="index,follow" />
            </Head>

            <LandingPageHeader brandName={brandName} phone={phone} phoneDisplay={phoneDisplay} />

            <main id="content" className="landing-page">
                <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }} focusable="false">
                    <defs>
                        <linearGradient id="landing-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffb347" />
                            <stop offset="48%" stopColor="#ff8c1a" />
                            <stop offset="100%" stopColor="#ff5e00" />
                        </linearGradient>
                    </defs>
                </svg>

                <HeroSection brandName={brandName} phone={phone} phoneDisplay={phoneDisplay} />

                  <ScrollFade delay={0.1}>
                    <VideoTestimonialsSection phone={phone} />
                </ScrollFade>

                <ScrollFade delay={0.1}>
                    <TrustSection />
                </ScrollFade>

                <ScrollFade delay={0.1}>
                    <ServicesSection phone={phone} />
                </ScrollFade>


                <ScrollFade delay={0.1}>
                    <VideoSection phone={phone} />
                </ScrollFade>

             {/*    <ScrollFade delay={0.1}>
                    <HowItWorksSection phone={phone} />
                </ScrollFade> */}

                <ScrollFade delay={0.1}>
                    <PortfolioSection phone={phone} />
                </ScrollFade>

                <ScrollFade delay={0.1}>
                    <WhyChorosSection phone={phone} />
                </ScrollFade>

                {/* <CertifiedExpertsSection phone={phone} /> */}

              

                <ScrollFade delay={0.1}>
                    <GuaranteesSection phone={phone} />
                </ScrollFade>

                <ScrollFade delay={0.1}>
                    <FAQSection phone={phone} />
                </ScrollFade>

                <ScrollFade delay={0.1}>
                    <FinalCtaSection
                        title="Your Pipeline Won't Build Itself."
                        subtitle="One call. A complete growth plan. A pipeline built to last."
                        description="Trade businesses across the UK are growing with Choros.io, exclusive leads, confirmed appointments, and a 10X ROI guarantee that puts the risk entirely on us. The only question is how quickly you want to start."
                        guaranteeTag="10X ROI Guaranteed or we work free for 3 months. Zero risk to you."
                        primaryCta="Get Free Quote"
                        phoneCta={phone}
                        phoneDisplay={phoneDisplay}
                        trustBadges={[
                            { label: '10X ROI', detail: 'Guaranteed in writing' },
                            { label: '100% Exclusive', detail: 'Every lead, every time' },
                            { label: 'UK-Wide', detail: 'Covering all of the UK' },
                            { label: 'Zero Risk', detail: 'Entirely on us' },
                        ]}
                    />
                </ScrollFade>
            </main>

            <LandingPageFooter brandName={brandName} phone={phone} phoneDisplay={phoneDisplay} />

            <MobileStickyCta phone={phone} />
        </>
    );
}
