// Modal content database
const modalContent = {
    investment: {
        title: 'Total Investment: R508.6M',
        content: 'Strategic investment structured across infrastructure, technology, and working capital to build Africa\'s first conservation-agtech platform.',
        stats: [
            { value: 'R356M', label: 'IDC Loan (70%)' },
            { value: 'R152.6M', label: 'Government Grants (30%)' },
            { value: 'R100M', label: 'Kutlwano Equity (In-kind)' },
            { value: 'R309.6M', label: 'CAPEX Investment' }
        ]
    },
    revenue: {
        title: 'Year 5 Revenue: R1.65B',
        content: 'Diversified revenue across six integrated platforms, with strong marketplace and technology service revenues.',
        stats: [
            { value: 'R850M', label: 'Marketplace (51.4%)' },
            { value: 'R270M', label: 'Precision Ag (16.3%)' },
            { value: 'R238M', label: 'Bio-Inputs (14.4%)' },
            { value: 'R297M', label: 'Other Streams (17.9%)' }
        ]
    },
    irr: {
        title: '28.9% Internal Rate of Return',
        content: 'Exceptional returns driven by rapid revenue scaling, high margins, and strategic asset optimization.',
        stats: [
            { value: 'R3.29B', label: 'Net Present Value' },
            { value: 'R692M', label: 'Year 5 Net Income' },
            { value: 'Year 2', label: 'Break-even' },
            { value: 'R9.8B', label: 'Exit Valuation' }
        ]
    },
    npv: {
        title: 'R3.29 Billion Net Present Value',
        content: 'Substantial value creation through technology-enabled agriculture transformation and conservation integration.',
        stats: [
            { value: '28.9%', label: 'IRR' },
            { value: '159%', label: 'Gross Return (IDC)' },
            { value: '64.5x', label: 'Equity Multiple' },
            { value: 'R1.32B', label: 'Cumulative Free Cash' }
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
        title: 'R9.8B Exit Valuation',
        content: 'Year 5 strategic exit opportunity based on 6x revenue multiple, positioning for acquisition by major agtech or financial services platform.',
        stats: [
            { value: '6.0x', label: 'Revenue Multiple' },
            { value: 'R1.65B', label: 'Year 5 Revenue' },
            { value: '12.0x', label: 'EBITDA Multiple' },
            { value: 'R815M', label: 'Year 5 EBITDA' }
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
    bioinputs: {
        title: 'Bio-Inputs Manufacturing',
        content: 'Conservation Compost™ leveraging 373 hectares of wildlife habitat to produce premium organic fertilizer.',
        stats: [
            { value: '14.4%', label: 'Revenue Share' },
            { value: 'R238M', label: 'Year 5 Revenue' },
            { value: '22%', label: 'Price Premium' },
            { value: '2,373ha', label: 'Conservation Land' }
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
    b2b: {
        title: 'B2B Services Platform',
        content: 'Data services, carbon credits, and corporate partnerships leveraging platform ecosystem.',
        stats: [
            { value: '5.3%', label: 'Revenue Share' },
            { value: 'R88M', label: 'Year 5 Revenue' },
            { value: '45,000T', label: 'CO₂ Sequestered' },
            { value: '350', label: 'Data Variables' }
        ]
    },
    finance: {
        title: 'AgriFinance Platform',
        content: 'Loan-as-gateway strategy embedding technology adoption in financial products, achieving 100% uptake.',
        stats: [
            { value: '7.3%', label: 'Revenue Share' },
            { value: 'R121M', label: 'Year 5 Revenue' },
            { value: '8-12%', label: 'Default Rate' },
            { value: 'R250k', label: 'Average Loan' }
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
        title: 'Year 5: Exit Ready',
        content: 'Full ecosystem maturity with 25,000 farmers and R1.65B revenue, positioning for R9.8B exit.',
        stats: [
            { value: 'R1.65B', label: 'Revenue' },
            { value: 'R692M', label: 'Net Income' },
            { value: '25,000', label: 'Farmers' },
            { value: 'R9.8B', label: 'Exit Valuation' }
        ]
    }
};
