import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Data
const powerDemandData = [
  { year: 2024, ai: 7.7, cloud: 29.7, traditional: 17.6, total: 55, aiPct: 14 },
  { year: 2026, ai: 15, cloud: 32, traditional: 18, total: 65, aiPct: 23 },
  { year: 2027, ai: 22.7, cloud: 42, traditional: 19.3, total: 84, aiPct: 27 },
  { year: 2030, ai: 40, cloud: 48, traditional: 20, total: 108, aiPct: 37 },
];

const mineralsData = [
  { mineral: 'Copper', china: 45, importance: 'CRITICAL', application: 'Data center wiring, GPU cooling, server racks', greenland: 'Disko-Nuussuaq major deposits' },
  { mineral: 'Nickel', china: 35, importance: 'CRITICAL', application: 'Battery metals, stainless steel in servers', greenland: "World's largest deposits" },
  { mineral: 'Cobalt', china: 60, importance: 'HIGH', application: 'Battery chemistry, GPU boards', greenland: 'Significant Disko-Nuussuaq deposits' },
  { mineral: 'Lithium', china: 55, importance: 'HIGH', application: 'Battery backup, UPS systems', greenland: 'Recently discovered deposits' },
  { mineral: 'Rare Earths', china: 85, importance: 'CRITICAL', application: 'Semiconductor fab, GPU chips', greenland: 'Tanbreez: 85,000 MT/year' },
  { mineral: 'Gallium', china: 95, importance: 'CRITICAL', application: 'Semiconductor wafers, AI chips', greenland: 'Tanbreez deposits' },
  { mineral: 'Tantalum', china: 70, importance: 'HIGH', application: 'Capacitors, semiconductors', greenland: 'Major untapped deposits' },
  { mineral: 'Platinum Group', china: 25, importance: 'MEDIUM', application: 'Catalysts, chip fabrication', greenland: 'Disko-Nuussuaq target' },
];

const keyPlayers = [
  { name: 'KoBold Metals', type: 'Mining', funding: '$1B+', investors: 'Gates, Bezos, Bloomberg, Altman', project: 'Disko-Nuussuaq (51% stake)', objective: 'Break Chinese mineral dominance' },
  { name: 'Critical Metals Corp', type: 'Rare Earths', funding: '$120M (EXIM)', investors: 'Trump Admin backing', project: 'Tanbreez mine', objective: 'Secure US semiconductor supply' },
  { name: 'Praxis', type: 'Network State', funding: '$525M', investors: 'Peter Thiel, Paradigm', project: 'Freedom City', objective: 'Regulatory arbitrage jurisdiction' },
  { name: 'TSMC', type: 'Semiconductor', funding: '$165B capex', investors: 'Taiwan/US Gov', project: 'Arizona expansion', objective: 'AI chip manufacturing' },
  { name: 'Nvidia', type: 'AI Chips', funding: '$3T+ market cap', investors: 'Public', project: 'H100/H200/B100 GPUs', objective: '95% AI GPU market dominance' },
];

const supplyChain = [
  { step: 1, name: 'Extraction', location: 'Greenland', resource: 'Critical Minerals', bottleneck: 'Indigenous opposition, 5-7yr timeline' },
  { step: 2, name: 'Processing', location: 'Allied Nations', resource: 'Mineral Refining', bottleneck: 'China controls 40-95% globally' },
  { step: 3, name: 'Manufacturing', location: 'Taiwan/Arizona', resource: 'Semiconductors', bottleneck: 'TSMC capacity constraints' },
  { step: 4, name: 'Energy', location: 'Venezuela/US', resource: 'Oil & Electricity', bottleneck: '$58B to restore infrastructure' },
  { step: 5, name: 'Compute', location: 'Greenland (Praxis)', resource: 'Data Centers', bottleneck: 'Greenlandic political resistance' },
];

const newsStories = [
  { date: 'Jan 14, 2026', title: 'Tech Billionaires Behind Greenland Push', source: 'Jacobin', url: 'https://jacobin.com/2026/01/trump-silicon-valley-greenland-crypto', category: 'Billionaires' },
  { date: 'Jan 6, 2026', title: 'Trump needs Venezuelan oil to power AI', source: 'New Statesman', url: 'https://www.newstatesman.com/international-politics/geopolitics/2026/01/trump-needs-venezuelan-oil-to-power-ai', category: 'Energy' },
  { date: 'Jan 15, 2026', title: "Billionaires' Dreams of a Cryptostate", source: 'Truthout', url: 'https://truthout.org/articles/billionaires-dreams-of-a-cryptostate-undergird-trumps-push-for-greenland/', category: 'Praxis' },
  { date: 'Jan 14, 2026', title: 'US Critical Minerals Security Executive Order', source: 'CSIS', url: 'https://www.csis.org/analysis/new-executive-order-ties-us-critical-minerals-security-global-partnerships', category: 'Policy' },
  { date: 'Jan 3, 2026', title: 'Trump: US taking control of Venezuela oil', source: 'CNN', url: 'https://www.cnn.com/2026/01/03/business/oil-gas-venezuela-maduro', category: 'Energy' },
  { date: 'Oct 3, 2025', title: 'Trump eyes Greenland rare earths mine stake', source: 'Reuters', url: 'https://bilyonaryo.com/2025/10/04/trump-administration-eyes-stake-in-company-developing-greenland-rare-earths-mine/mining/', category: 'Mining' },
  { date: 'Jan 9, 2026', title: 'Billionaires Bet Big on Greenland', source: 'Forbes', url: 'https://www.forbes.com/sites/martinadilicosa/2026/01/09/these-billionaires-bet-big-on-greenland-after-trump-took-interest/', category: 'Billionaires' },
  { date: 'Feb 5, 2025', title: 'Praxis Wants Freedom City in Greenland', source: 'InsideHook', url: 'https://www.insidehook.com/internet/peter-thiel-praxis-next-great-city-greenland', category: 'Praxis' },
];


const peopleData = {
  colonizers: [
    { name: 'Jeff Bezos', role: 'KoBold Investor', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Jeff_Bezos_2016.jpg', desc: 'Investing billions in Arctic mineral exploration to secure AI supply chains.', tags: ['Capital'] },
    { name: 'Bill Gates', role: 'KoBold Investor', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg', desc: 'Backing AI-driven mining to "solve" the critical minerals shortage.', tags: ['Capital'] },
    { name: 'Donald Trump', role: 'US President', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg', desc: 'Seeking control of Venezuelan oil and Greenlandic minerals for US dominance.', tags: ['Government'] },
    { name: 'Peter Thiel', role: 'Venture Capitalist', image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Peter_Thiel.jpg', desc: 'Backing "Freedom Cities" as regulatory arbitrage zones for crypto and compute.', tags: ['Ideology'] },
    { name: 'Sam Altman', role: 'OpenAI CEO', image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Sam_Altman_Flickr_2.jpg', desc: 'His demand for 7GW data centers drives the resource extraction logic.', tags: ['Tech'] },
    { name: 'Dryden Brown', role: 'Praxis Co-Founder', image: 'https://pbs.twimg.com/profile_images/1587884488390885376/GzCqFfPZ_400x400.jpg', desc: 'Lobbying for Greenlandic "independence" to build a sovereign crypto state.', tags: ['Ideology'] },
    { name: 'Ken Howery', role: 'Ambassador', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Kenneth_A._Howery_official_photo.jpg', desc: 'Thiel associate appointed to facilitate US interests in Greenland.', tags: ['Diplomacy'] },
  ],
  resistance: [
    { name: 'Múte Bourup Egede', role: 'Prime Minister', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/M%C3%BAte_Bourup_Egede_May_2021.jpg', desc: 'Explicitly opposes foreign control: "We do not want to be Americans."', tags: ['Sovereignty'] },
    { name: 'Inuit Ataqatigiit', role: 'Ruling Party', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Inuit_Ataqatigiit_logo.svg/1024px-Inuit_Ataqatigiit_logo.svg.png', desc: 'Won power on an anti-mining platform, banning uranium extracting and oil drilling.', tags: ['Politics'] },
    { name: 'Indigenous Communities', role: 'Stewards', image: null, desc: 'Fighting contamination of fishing waters from legacy mining projects.', tags: ['Justice'] },
    { name: 'Environmental Orgs', role: 'Advocates', image: null, desc: 'Highlighting the massive fossil fuel costs of "green" AI transitions.', tags: ['Climate'] },
  ]
};

// Color palette - Paper White Theme
const colors = {
  bg: '#fdfdfd',
  surface: '#ffffff',
  surfaceLight: '#f6f6f7',
  border: '#eaeaea',
  text: '#1a1a1a',
  textMuted: '#666666',
  accent: '#00a884',
  accentDim: 'rgba(0, 168, 132, 0.08)',
  danger: '#e03e5c',
  warning: '#f59e0b',
  ai: '#00a884',
  cloud: '#3b82f6',
  traditional: '#9ca3af',
  critical: '#e03e5c',
  high: '#f59e0b',
  medium: '#3b82f6',
};


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, padding: '12px 16px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ color: colors.text, fontWeight: 600, marginBottom: 8 }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: 13, margin: '4px 0' }}>
            {entry.name}: {entry.value} GW
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMineral, setSelectedMineral] = useState(null);
  const [newsFilter, setNewsFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredNews = newsFilter === 'all' ? newsStories : newsStories.filter(n => n.category === newsFilter);

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      color: colors.text,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; }
        body { margin: 0; }
        
        .tab-btn {
          padding: 10px 20px;
          background: transparent;
          border: 1px solid ${colors.border};
          color: ${colors.textMuted};
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
        }
        .tab-btn:hover { background: ${colors.surfaceLight}; color: ${colors.text}; }
        .tab-btn.active { background: ${colors.accent}; color: #ffffff; border-color: ${colors.accent}; }
        
        .card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .card:hover { border-color: ${colors.accentDim}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        
        .mineral-row {
          display: grid;
          grid-template-columns: 140px 1fr 100px 100px;
          padding: 16px 20px;
          border-bottom: 1px solid ${colors.border};
          cursor: pointer;
          transition: all 0.2s;
        }
        .mineral-row:hover { background: ${colors.surfaceLight}; }
        
        .importance-badge {
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .news-card {
          padding: 16px 20px;
          border-left: 3px solid ${colors.accent};
          background: ${colors.surfaceLight};
          margin-bottom: 12px;
          border-radius: 0 8px 8px 0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .news-card:hover { background: ${colors.surface}; transform: translateX(4px); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        
        .filter-btn {
          padding: 6px 14px;
          background: transparent;
          border: 1px solid ${colors.border};
          color: ${colors.textMuted};
          cursor: pointer;
          font-size: 12px;
          border-radius: 16px;
          transition: all 0.2s;
          margin-right: 8px;
          margin-bottom: 8px;
        }
        .filter-btn:hover, .filter-btn.active { background: ${colors.accent}; color: #ffffff; border-color: ${colors.accent}; }
        
        .supply-step {
          background: ${colors.surfaceLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: 20px;
          position: relative;
        }
        .supply-step::after {
          content: '→';
          position: absolute;
          right: -24px;
          top: 50%;
          transform: translateY(-50%);
          color: ${colors.accent};
          font-size: 20px;
        }
        .supply-step:last-child::after { display: none; }
        
        .stat-number {
          font-family: 'JetBrains Mono', monospace;
          font-size: 32px;
          font-weight: 700;
          color: ${colors.text};
        }
        
        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        a { color: ${colors.accent}; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* Header */}
      <header style={{
        borderBottom: `1px solid ${colors.border}`,
        padding: '20px 40px',
        position: 'sticky',
        top: 0,
        background: 'rgba(253, 253, 253, 0.95)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.jpg" alt="Regenera" style={{ height: 48, width: 48, borderRadius: 8, marginRight: 16, objectFit: 'contain' }} />
            <div>
              <h1 style={{
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
                letterSpacing: '-0.5px',
                color: colors.text
              }}>
                <span style={{ color: colors.accent }}>AI</span> Mineral Colonialism
              </h1>
              <p style={{ color: colors.textMuted, fontSize: 13, margin: '4px 0 0' }}>
                Investigating the resource imperialism behind the AI boom
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['overview', 'minerals', 'supply-chain', 'people', 'news'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ borderRadius: tab === 'overview' ? '8px 0 0 8px' : tab === 'news' ? '0 8px 8px 0' : 0 }}
              >
                {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '40px' }}>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Hero Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
              {[
                { label: 'AI Power Growth by 2030', value: '165%', sub: 'vs 2023 levels' },
                { label: 'China Processing Control', value: '40-95%', sub: 'of critical minerals' },
                { label: 'Billionaire Investment', value: '$1B+', sub: 'in KoBold Metals alone' },
                { label: 'Venezuela Oil Reserves', value: '303B', sub: 'barrels (20% global)' },
              ].map((stat, i) => (
                <div key={i} className="card fade-in" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                  <p style={{ color: colors.textMuted, fontSize: 13, marginBottom: 8 }}>{stat.label}</p>
                  <p className="stat-number" style={{ color: colors.accent }}>{stat.value}</p>
                  <p style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Main Chart */}
            <div className="card" style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>AI Data Center Power Demand Surge</h2>
                  <p style={{ color: colors.textMuted, fontSize: 14, marginTop: 4 }}>
                    AI workloads projected to reach 37% of total data center demand by 2030
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, background: colors.ai, borderRadius: 2 }} />
                    <span style={{ fontSize: 13, color: colors.textMuted }}>AI-Specific</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, background: colors.cloud, borderRadius: 2 }} />
                    <span style={{ fontSize: 13, color: colors.textMuted }}>Cloud</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, background: colors.traditional, borderRadius: 2 }} />
                    <span style={{ fontSize: 13, color: colors.textMuted }}>Traditional</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={powerDemandData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis dataKey="year" stroke={colors.textMuted} fontSize={12} />
                  <YAxis stroke={colors.textMuted} fontSize={12} tickFormatter={(v) => `${v} GW`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="traditional" stackId="1" stroke={colors.traditional} fill={colors.traditional} name="Traditional" />
                  <Area type="monotone" dataKey="cloud" stackId="1" stroke={colors.cloud} fill={colors.cloud} name="Cloud" />
                  <Area type="monotone" dataKey="ai" stackId="1" stroke={colors.ai} fill={colors.ai} name="AI-Specific" />
                </AreaChart>
              </ResponsiveContainer>
              <p style={{ color: colors.textMuted, fontSize: 12, marginTop: 16, textAlign: 'right' }}>
                Source: Goldman Sachs, S&P Global, AIM Multiple research
              </p>
            </div>

            {/* Key Players */}
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Key Players in the AI Supply Chain</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {keyPlayers.map((player, i) => (
                <div key={i} className="card fade-in" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{player.name}</h3>
                    <span style={{
                      fontSize: 11,
                      padding: '3px 8px',
                      background: colors.accentDim,
                      color: colors.accent,
                      borderRadius: 4,
                      fontWeight: 500,
                    }}>{player.type}</span>
                  </div>
                  <p style={{ color: colors.text, fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: '8px 0' }}>
                    {player.funding}
                  </p>
                  <p style={{ fontSize: 13, color: colors.textMuted, margin: '8px 0' }}>
                    <strong style={{ color: colors.text }}>Investors:</strong> {player.investors}
                  </p>
                  <p style={{ fontSize: 13, color: colors.textMuted, margin: '8px 0' }}>
                    <strong style={{ color: colors.text }}>Project:</strong> {player.project}
                  </p>
                  <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                    {player.objective}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Minerals Tab */}
        {activeTab === 'minerals' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Greenland's Critical Minerals for AI</h2>
                <p style={{ color: colors.textMuted, fontSize: 14, marginTop: 8 }}>
                  China dominates processing of most minerals vital to AI dominance. Greenland offers an alternative supply.
                </p>
              </div>
            </div>

            {/* China Processing Chart */}
            <div className="card" style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>China's Processing Dominance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mineralsData} layout="vertical" margin={{ left: 100, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} horizontal={false} />
                  <XAxis type="number" stroke={colors.textMuted} fontSize={12} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="mineral" stroke={colors.text} tick={{ fill: colors.text, fontWeight: 500 }} fontSize={12} width={90} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'China Processing Share']}
                    contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="china" radius={[0, 4, 4, 0]}>
                    {mineralsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.china >= 85 ? colors.critical : entry.china >= 55 ? colors.warning : colors.cloud}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 24, marginTop: 16, justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: colors.critical, borderRadius: 2 }} />
                  <span style={{ fontSize: 12, color: colors.textMuted }}>Critical (85%+)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: colors.warning, borderRadius: 2 }} />
                  <span style={{ fontSize: 12, color: colors.textMuted }}>High (55-84%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: colors.cloud, borderRadius: 2 }} />
                  <span style={{ fontSize: 12, color: colors.textMuted }}>Moderate (&lt;55%)</span>
                </div>
              </div>
            </div>

            {/* Minerals Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 100px 100px',
                padding: '14px 20px',
                background: colors.surfaceLight,
                borderBottom: `1px solid ${colors.border}`,
                fontWeight: 600,
                fontSize: 12,
                color: colors.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                <span>Mineral</span>
                <span>AI Applications</span>
                <span>China %</span>
                <span>Importance</span>
              </div>
              {mineralsData.map((m, i) => (
                <div
                  key={i}
                  className="mineral-row"
                  onClick={() => setSelectedMineral(selectedMineral === i ? null : i)}
                  style={{ background: selectedMineral === i ? colors.surfaceLight : 'transparent' }}
                >
                  <span style={{ fontWeight: 600 }}>{m.mineral}</span>
                  <span style={{ color: colors.textMuted, fontSize: 13 }}>{m.application}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: m.china >= 85 ? colors.critical : m.china >= 55 ? colors.warning : colors.text,
                    fontWeight: 600,
                  }}>{m.china}%</span>
                  <span>
                    <span className="importance-badge" style={{
                      background: m.importance === 'CRITICAL' ? `${colors.critical}22` : m.importance === 'HIGH' ? `${colors.warning}22` : `${colors.cloud}22`,
                      color: m.importance === 'CRITICAL' ? colors.critical : m.importance === 'HIGH' ? colors.warning : colors.cloud,
                    }}>{m.importance}</span>
                  </span>
                </div>
              ))}
              {selectedMineral !== null && (
                <div style={{ padding: 20, background: colors.surfaceLight, borderTop: `1px solid ${colors.border}` }}>
                  <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
                    <strong style={{ color: colors.accent }}>Greenland Status:</strong> {mineralsData[selectedMineral].greenland}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Supply Chain Tab */}
        {activeTab === 'supply-chain' && (
          <div className="fade-in">
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>The Vertically Integrated AI Supply Chain</h2>
              <p style={{ color: colors.textMuted, fontSize: 14, marginTop: 8 }}>
                From Greenlandic extraction to sovereign compute: how US oligarchs aim to bypass Chinese chokepoints
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 40, marginBottom: 40 }}>
              {supplyChain.map((step, i) => (
                <div key={i} className="supply-step fade-in" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    background: colors.accent,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: colors.surface,
                    marginBottom: 16,
                  }}>{step.step}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>{step.name}</h3>
                  <p style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    background: colors.accentDim,
                    color: colors.accent,
                    borderRadius: 4,
                    display: 'inline-block',
                    marginBottom: 12,
                  }}>{step.location}</p>
                  <p style={{ fontSize: 13, color: colors.textMuted, margin: '8px 0' }}>{step.resource}</p>
                  <p style={{ fontSize: 12, color: colors.warning, marginTop: 16, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                    ⚠ {step.bottleneck}
                  </p>
                </div>
              ))}
            </div>

            {/* Resistance Section */}
            <div className="card" style={{ borderColor: colors.accent, borderWidth: 2 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: colors.accent }}>
                🌍 The Resistance
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Indigenous Opposition</h4>
                  <p style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.6 }}>
                    In 2021, Greenland's <strong style={{ color: colors.text }}>Inuit Ataqatigiit party</strong> won power explicitly
                    on an anti-mining platform. Prime Minister Múte Bourup Egede—youngest in Greenlandic history—has stated:
                    "We do not want to be Americans."
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Infrastructure Reality</h4>
                  <p style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.6 }}>
                    Venezuela's oil infrastructure requires <strong style={{ color: colors.text }}>$58 billion</strong> to restore.
                    Arctic mining faces 5-7 year timelines. These constraints create windows for resistance and alternative paths.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* People Tab */}
        {activeTab === 'people' && (
          <div className="fade-in">
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>The Key Players</h2>
              <p style={{ color: colors.textMuted, fontSize: 14, marginTop: 8 }}>
                The <strong style={{ color: colors.text }}>Colonizers</strong> building the mineral supply chain vs. the <strong style={{ color: colors.critical }}>Resistance</strong> fighting for sovereignty
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

              {/* Colonizers Column */}
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: colors.text, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🏗️</span> The Colonizers
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {peopleData.colonizers.map((person, i) => (
                    <div key={i} className="card fade-in" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${colors.border}` }}
                          />
                        ) : (
                          <div style={{ width: 48, height: 48, borderRadius: '50%', background: colors.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `1px solid ${colors.border}` }}>
                            👤
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{person.name}</h4>
                            <span style={{ fontSize: 11, color: colors.textMuted, background: colors.surfaceLight, padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                              {person.role}
                            </span>
                          </div>
                          <p style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.5, margin: '8px 0 0' }}>
                            {person.desc}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginLeft: 64 }}>
                        {person.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: 10,
                            padding: '2px 8px',
                            background: colors.accentDim,
                            color: colors.accent,
                            borderRadius: 12,
                            fontWeight: 500
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resistance Column */}
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: colors.critical, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>✊</span> The Resistance
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {peopleData.resistance.map((person, i) => (
                    <div key={i} className="card fade-in" style={{ animationDelay: `${0.1 + i * 0.05}s`, borderColor: i === 0 ? colors.critical : colors.border }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${colors.border}` }}
                          />
                        ) : (
                          <div style={{ width: 48, height: 48, borderRadius: '50%', background: colors.surfaceLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: `1px solid ${colors.border}` }}>
                            ✊
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{person.name}</h4>
                            <span style={{ fontSize: 11, color: colors.textMuted, background: colors.surfaceLight, padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                              {person.role}
                            </span>
                          </div>
                          <p style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.5, margin: '8px 0 0' }}>
                            {person.desc}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginLeft: 64 }}>
                        {person.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: 10,
                            padding: '2px 8px',
                            background: tag === 'Sovereignty' ? `${colors.critical}22` : colors.surfaceLight,
                            color: tag === 'Sovereignty' ? colors.critical : colors.textMuted,
                            borderRadius: 12,
                            fontWeight: 500
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Source Materials & News</h2>
                <p style={{ color: colors.textMuted, fontSize: 14, marginTop: 8 }}>
                  Primary sources and investigative journalism tracking this story
                </p>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              {['all', 'Energy', 'Billionaires', 'Mining', 'Praxis', 'Policy'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${newsFilter === filter ? 'active' : ''}`}
                  onClick={() => setNewsFilter(filter)}
                >
                  {filter === 'all' ? 'All Stories' : filter}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {filteredNews.map((story, i) => (
                <a
                  key={i}
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="news-card fade-in" style={{ animationDelay: `${0.05 * i}s` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: colors.textMuted }}>{story.date}</span>
                      <span style={{
                        fontSize: 10,
                        padding: '2px 8px',
                        background: colors.accentDim,
                        color: colors.accent,
                        borderRadius: 4,
                      }}>{story.category}</span>
                    </div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 8px', color: colors.text }}>{story.title}</h4>
                    <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>{story.source} ↗</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Key Data Points */}
            <div className="card" style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Key Data Points</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                <div>
                  <h4 style={{ fontSize: 13, color: colors.textMuted, marginBottom: 12 }}>Energy & AI Demand</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.ai}` }}>
                      AI power demand: 165% increase by 2030
                    </li>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.ai}` }}>
                      US data centers: 4.4% of national electricity (2024)
                    </li>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.ai}` }}>
                      Household bills up $20-30/month from data centers
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: 13, color: colors.textMuted, marginBottom: 12 }}>Greenland Minerals</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.warning}` }}>
                      25 of 34 EU critical minerals present
                    </li>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.warning}` }}>
                      KoBold: $1B+ funding, $2.96B valuation
                    </li>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.warning}` }}>
                      Tanbreez: 85,000 MT/year rare earths
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontSize: 13, color: colors.textMuted, marginBottom: 12 }}>Venezuela & Energy</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.critical}` }}>
                      303 billion barrels (20% global reserves)
                    </li>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.critical}` }}>
                      $58B needed to restore infrastructure
                    </li>
                    <li style={{ fontSize: 13, marginBottom: 8, paddingLeft: 16, borderLeft: `2px solid ${colors.critical}` }}>
                      Years—not months—to meaningful production
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${colors.border}`,
        padding: '32px 40px',
        marginTop: 60,
        background: colors.surfaceLight
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
              Research compiled for <a href="https://regenera.substack.com" style={{ color: colors.accent }}>Regenera</a> by John Ellison
            </p>
            <p style={{ fontSize: 12, color: colors.textMuted, margin: '8px 0 0', opacity: 0.7 }}>
              Data sources: Goldman Sachs, CSIS, Reuters, Forbes, Truthout, New Statesman, AIM Multiple
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
              Building regenerative futures at the intersection of AI, climate & consciousness
            </p>
            <p style={{ color: colors.accent, fontSize: 14, margin: '8px 0 0' }}>Peace ✌️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
