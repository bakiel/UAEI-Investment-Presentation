// Modal content database
const modalContent = {
    investment: {
        title: 'Total Investment: R508.6M',
        content: 'Strategic investment structured across infrastructure, technology, and working capital to build Africa\'s first conservation-agtech platform.',
        stats: [
            { value: 'R356M', label: 'IDC Loan (70%)' },
            { value: 'R152.6M', label: 'Government Grants (30%)' },
            { value: 'R100M', label: 'Kutlwano Assets (In-kind)' },
            { value: 'R20M', label: 'Cash Equity (IRR basis)' }
        ]
    },
    revenue: {
        title: 'Year 5 Revenue: R1.654B',
        content: 'Diversified revenue across six integrated platforms, with strong marketplace and technology service revenues.',
        stats: [
            { value: 'R850M', label: 'Marketplace (51.4%)' },
            { value: 'R270M', label: 'Precision Ag (16.3%)' },
            { value: 'R238M', label: 'Bio-Inputs (14.4%)' },
            { value: 'R297M', label: 'Other Streams (17.9%)' }
        ]
    },
    irr: {
        title: '74.4% Internal Rate of Return',
        content: '10-year equity IRR representing 325x return (R20M equity → R6.5B). This is 6x development finance hurdles and 3x private equity benchmarks.',
        stats: [
            { value: 'R8.392B', label: 'Net Present Value' },
            { value: 'R692M', label: 'Year 5 Net Income' },
            { value: 'Year 2', label: 'Break-even' },
            { value: '325x', label: 'Equity Multiple' }
        ]
    },
    npv: {
        title: 'R8.392 Billion Net Present Value',
        content: 'DCF valuation @ 12% WACC over 10 years. Represents intrinsic value for investment decision-making.',
        stats: [
            { value: '74.4%', label: 'IRR (10Y Equity)' },
            { value: '325x', label: 'Equity Multiple' },
            { value: '4.0 yrs', label: 'Payback Period' },
            { value: 'R4.875B', label: 'Year 10 Cash' }
        ]
    },
    farmers: {
        title: '25,000 Farmers Transformed',
        content: 'Serving 1.1% of South Africa\'s 2.3M smallholder farmers through coordinated ecosystem approach.',
        stats: [
            { value: '300%', label: 'Income Increase' },
            { value: '18,000', label: 'Above Poverty Line' },
            { value: '95%', label: 'Retention Rate' },
            { value: '100%', label: 'Tech Adoption' }
        ]
    },
    exit: {
        title: 'R22.8B Exit Valuation',
        content: 'Year 10 strategic exit using 10x EBITDA multiple (standard market approach). Kutlwano 66% stake = R15.0B, representing 150x ROI.',
        stats: [
            { value: '10.0x', label: 'EBITDA Multiple' },
            { value: 'R2.281B', label: 'Year 10 EBITDA' },
            { value: 'R15.0B', label: 'Kutlwano Share (66%)' },
            { value: '150x', label: 'Kutlwano ROI' }
        ]
    },
    marketplace: {
        title: 'Marketplace Platform',
        content: 'Commission-based trading platform providing automatic loan repayment, premium pricing, and direct market access.',
        stats: [
            { value: '51.4%', label: 'Revenue Share' },
            { value: 'R850M', label: 'Year 5 Revenue' },
            { value: '9%', label: 'Commission Rate' },
            { value: '22%', label: 'Organic Premium' }
        ]
    },
    precision: {
        title: 'Precision Agriculture Platform',
        content: 'IoT sensors, drone monitoring, and AI analytics delivering real-time farm intelligence and early warning systems.',
        stats: [
            { value: '16.3%', label: 'Revenue Share' },
            { value: 'R270M', label: 'Year 5 Revenue' },
            { value: '25,000', label: 'Connected Farms' },
            { value: '100%', label: 'Adoption Rate' }
        ]
    },
    training: {
        title: 'Conservation Training Platform',
        content: '11-language training program delivering conservation agriculture certification and continuous farmer education.',
        stats: [
            { value: '5.3%', label: 'Revenue Share' },
            { value: 'R88M', label: 'Year 5 Revenue' },
            { value: '11', label: 'Languages' },
            { value: '25,000', label: 'Farmers Trained' }
        ]
    },
    year1: {
        title: 'Year 1: Foundation Phase',
        content: 'Initial rollout with 500 farmers, infrastructure development, and platform launch.',
        stats: [
            { value: 'R21M', label: 'Revenue' },
            { value: '-R58M', label: 'Net Income' },
            { value: '500', label: 'Farmers' },
            { value: 'Q4', label: 'Platform Launch' }
        ]
    },
    year2: {
        title: 'Year 2: Break-even & Scale',
        content: 'Rapid scaling to 1,500 farmers with platform optimization and profitability achievement.',
        stats: [
            { value: 'R196.8M', label: 'Revenue (9.4x Y1)' },
            { value: 'R13M', label: 'Net Income' },
            { value: '1,500', label: 'Farmers' },
            { value: '18mo', label: 'Break-even Point' }
        ]
    },
    year3: {
        title: 'Year 3: Geographic Expansion',
        content: 'Provincial expansion to 5,000 farmers with full ecosystem integration.',
        stats: [
            { value: 'R526.4M', label: 'Revenue (2.7x Y2)' },
            { value: 'R156M', label: 'Net Income' },
            { value: '5,000', label: 'Farmers' },
            { value: '45.8%', label: 'EBITDA Margin' }
        ]
    },
    year4: {
        title: 'Year 4: Market Leadership',
        content: 'Establishing dominance with 15,000 farmers and export-scale production.',
        stats: [
            { value: 'R873.8M', label: 'Revenue (1.7x Y3)' },
            { value: 'R315M', label: 'Net Income' },
            { value: '15,000', label: 'Farmers' },
            { value: '53.3%', label: 'EBITDA Margin' }
        ]
    },
    year5: {
        title: 'Year 5: Ecosystem Maturity',
        content: 'Full ecosystem maturity with 25,000 farmers and R1.654B revenue. Strong foundation for 10-year growth trajectory.',
        stats: [
            { value: 'R1.654B', label: 'Revenue' },
            { value: 'R692M', label: 'Net Income (41.8%)' },
            { value: '25,000', label: 'Farmers' },
            { value: 'R983M', label: 'EBITDA (59.4%)' }
        ]
    },
    year10: {
        title: 'Year 10: Exit Ready',
        content: 'R22.8B enterprise value (10x EBITDA). Kutlwano 66% stake worth R15.0B representing 150x ROI on R100M asset contribution.',
        stats: [
            { value: 'R3.515B', label: 'Revenue' },
            { value: 'R1.387B', label: 'Net Income (39.5%)' },
            { value: 'R2.281B', label: 'EBITDA (64.9%)' },
            { value: 'R22.8B', label: 'Exit Valuation' }
        ]
    },
    // WhatsApp & Language Accessibility Modals
    whatsapp: {
        title: 'WhatsApp-Based Platform',
        content: 'Farmers already use WhatsApp daily for communication. UAEI meets them where they are - no app download, no training barrier.',
        stats: [
            { value: '90%', label: 'SA Farmers Use WhatsApp' },
            { value: 'Zero', label: 'Download Friction' },
            { value: '100%', label: 'Smartphone Compatible' },
            { value: 'Instant', label: 'Onboarding Time' }
        ]
    },
    languages: {
        title: '11 Indigenous Languages',
        content: 'Full platform support for all 11 South African official languages: isiZulu, isiXhosa, Sepedi, Setswana, Sesotho, siSwati, Xitsonga, Tshivenda, isiNdebele, English, and Afrikaans. Expandable to other African languages as we grow across the continent.',
        stats: [
            { value: '11', label: 'SA Official Languages' },
            { value: 'Expandable', label: 'African Languages' },
            { value: '100%', label: 'SA Coverage' },
            { value: 'Voice + Text', label: 'Multi-modal' }
        ]
    },
    voice: {
        title: 'Voice Note Support',
        content: 'Low literacy is not a barrier. Farmers can use voice notes in their native language for all platform interactions.',
        stats: [
            { value: '67%', label: 'SA Farmers Low Literacy' },
            { value: 'Voice', label: 'Primary Interface' },
            { value: 'Native', label: 'Language Support' },
            { value: 'Zero', label: 'Reading Required' }
        ]
    },
    offline: {
        title: 'Offline Sync Capability',
        content: 'Works in low-connectivity rural areas. Data syncs automatically when connection is available.',
        stats: [
            { value: 'Offline', label: 'Core Functions Work' },
            { value: 'Auto', label: 'Sync When Online' },
            { value: 'Rural', label: 'Optimized For' },
            { value: '2G+', label: 'Network Compatible' }
        ]
    },
    stokvel: {
        title: 'Stokvel Integration',
        content: 'Leverages traditional African savings groups (stokvels) for trust-building, peer support, and collective learning.',
        stats: [
            { value: '11M', label: 'SA Stokvel Members' },
            { value: 'R50B', label: 'Annual Stokvel Value' },
            { value: 'Trust', label: 'Built-in Social Capital' },
            { value: 'Peer', label: 'Learning Model' }
        ]
    },
    moat: {
        title: '18-24 Month Competitive Barrier',
        content: 'Building 11-language WhatsApp training system with cultural trust integration requires 18-24 months. Competitors cannot replicate quickly.',
        stats: [
            { value: '18-24mo', label: 'Build Timeline' },
            { value: '11', label: 'Languages to Translate' },
            { value: 'Cultural', label: 'Trust Relationships' },
            { value: 'First Mover', label: 'UAEI Advantage' }
        ]
    },
    // Revenue Stream Integration Modals
    finance: {
        title: 'AgriFinance: 7.3% of Revenue',
        content: 'R250k loans generate interest income while creating the entire ecosystem. The loan is the gateway that enables all other revenue streams.',
        stats: [
            { value: 'R121M', label: 'Year 5 Revenue' },
            { value: 'R250k', label: 'Average Loan Size' },
            { value: '8-12%', label: 'Default Rate' },
            { value: '100%', label: 'Tech Adoption Created' }
        ]
    },
    bioinputs: {
        title: 'Bio-Inputs: 14.4% of Revenue',
        content: 'Conservation sanctuary (445ha) produces organic fertilizer from wildlife. 22% premium pricing from conservation certification.',
        stats: [
            { value: 'R238M', label: 'Year 5 Revenue' },
            { value: '445ha', label: 'Wildlife Sanctuary' },
            { value: '22%', label: 'Premium Pricing' },
            { value: '570+ tons', label: 'Annual Manure Gift' }
        ]
    },
    b2b: {
        title: 'B2B Services: 5.3% of Revenue',
        content: 'Agricultural data licensing, carbon credits, and strategic partnerships leveraging ecosystem intelligence.',
        stats: [
            { value: 'R88M', label: 'Year 5 Revenue' },
            { value: 'Data', label: 'Licensing' },
            { value: 'Carbon', label: 'Credit Sales' },
            { value: 'Partnerships', label: 'Strategic Deals' }
        ]
    },
    // Loan Package Components
    cashCapital: {
        title: 'R100,000 Cash Capital',
        content: 'Working capital that gives farmers the liquidity they desperately need. Used for seeds, fertilizer, labor, and operational expenses during the growing season.',
        stats: [
            { value: 'R100k', label: 'Per Farmer' },
            { value: '40%', label: 'Of Loan Package' },
            { value: 'Immediate', label: 'Deployment' },
            { value: '3-6 months', label: 'Harvest Cycle' }
        ]
    },
    iotSensors: {
        title: 'R30,000 IoT Sensors Package',
        content: 'Real-time monitoring system providing soil moisture, temperature, pH levels, and weather data. Enables precision irrigation and prevents crop failure.',
        stats: [
            { value: 'R30k', label: 'Hardware + Installation' },
            { value: '24/7', label: 'Real-time Monitoring' },
            { value: '30%', label: 'Water Savings' },
            { value: '25%', label: 'Yield Increase' }
        ]
    },
    droneMonitoring: {
        title: 'R40,000 Drone Monitoring',
        content: 'Weekly aerial surveillance with multispectral imaging. Identifies pest infestations, nutrient deficiencies, and irrigation issues before they become catastrophic.',
        stats: [
            { value: 'R40k', label: 'Drone Service Credit' },
            { value: 'Weekly', label: 'Flight Schedule' },
            { value: 'Early', label: 'Disease Detection' },
            { value: 'AI-Powered', label: 'Analytics' }
        ]
    },
    organicInputs: {
        title: 'R50,000 Organic Inputs',
        content: 'Conservation Compost™ produced from 445-hectare wildlife sanctuary. Premium organic fertilizer with 22% price premium and superior soil health benefits.',
        stats: [
            { value: 'R50k', label: 'Input Credit' },
            { value: '445ha', label: 'Wildlife Sanctuary' },
            { value: '22%', label: 'Price Premium' },
            { value: 'Certified', label: 'Conservation Product' }
        ]
    },
    trainingProgram: {
        title: 'R20,000 Training Program',
        content: 'Comprehensive conservation agriculture certification delivered in 11 languages via WhatsApp. Combines traditional knowledge with modern techniques.',
        stats: [
            { value: 'R20k', label: 'Training Value' },
            { value: '11', label: 'Languages' },
            { value: 'WhatsApp', label: 'Delivery Platform' },
            { value: 'Certified', label: 'Qualification' }
        ]
    },
    marketplaceAccess: {
        title: 'R10,000 Marketplace Access',
        content: 'Direct connection to premium buyers with automatic loan repayment from sales. Eliminates middlemen and guarantees payment collection.',
        stats: [
            { value: 'R10k', label: 'Platform Setup' },
            { value: 'Direct', label: 'Premium Buyers' },
            { value: 'Auto', label: 'Loan Repayment' },
            { value: '22%', label: 'Organic Premium' }
        ]
    },
    swarmIntelligence: {
        title: 'Swarm Intelligence: Collective Equipment Sharing',
        content: '300-farmer swarms share expensive equipment (drones, harvesters, IoT systems) reducing individual costs by 60× while doubling yields through coordinated precision agriculture.',
        stats: [
            { value: '2.25×', label: 'Profit per Hectare' },
            { value: '60×', label: 'Equipment Cost Savings' },
            { value: '300', label: 'Farmers per Swarm' },
            { value: 'R1.8M', label: 'Shared Equipment Pool' }
        ],
        animation: true
    }
};

// Attach to window object for global access
window.modalContent = modalContent;
console.log('✅ modalContent attached to window with', Object.keys(modalContent).length, 'items');
