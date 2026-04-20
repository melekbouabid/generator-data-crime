import { useState, useMemo, useCallback } from 'react';
import { generateDataset, toCSV, toJSON } from './dataGenerator';

const COLUMNS = [
  'id','first_name','last_name','gender','age','origin','cin_card','phone_number',
  'country','city','neighborhood','neighborhood_quality','neighborhood_safety_rating',
  'frequent_neighborhood_visited','distance_from_home_km','academic_level',
  'field_of_study','primary_school_type','parental_education','legal_knowledge_level',
  'financial_situation','monthly_income_tnd','monthly_expenses_tnd','debt_level',
  'income_source','property_ownership','family_situation','number_of_children',
  'number_of_siblings','parental_marital_status','family_criminal_history',
  'family_psychological_issues','friend_in_jail','employment_status','job',
  'daily_commute_method','has_psychological_problem','psychological_condition',
  'mental_health_treatment','physical_health_status','chronic_diseases','addiction_type',
  'crime','criminal_record','number_of_previous_arrests','juvenile_record','weapon_used',
  'crime_time_of_day','crime_location_type','number_of_accomplices',
  'investigation_behavior','arrest_method','legal_article_reference',
  'current_legal_status','pre_trial_detention_days','last_sentence_duration',
  'victim_relationship',
];

const PAGE_SIZE = 50;

const SECTION_COLORS = {
  Identité: '#6366f1',
  Géographie: '#0ea5e9',
  Éducation: '#10b981',
  Finance: '#f59e0b',
  Famille: '#ec4899',
  Emploi: '#8b5cf6',
  Santé: '#ef4444',
  Crime: '#f97316',
};

const COLUMN_SECTIONS = {
  id: 'Identité', first_name: 'Identité', last_name: 'Identité', gender: 'Identité',
  age: 'Identité', origin: 'Identité', cin_card: 'Identité', phone_number: 'Identité',
  country: 'Géographie', city: 'Géographie', neighborhood: 'Géographie',
  neighborhood_quality: 'Géographie', neighborhood_safety_rating: 'Géographie',
  frequent_neighborhood_visited: 'Géographie', distance_from_home_km: 'Géographie',
  academic_level: 'Éducation', field_of_study: 'Éducation', primary_school_type: 'Éducation',
  parental_education: 'Éducation', legal_knowledge_level: 'Éducation',
  financial_situation: 'Finance', monthly_income_tnd: 'Finance', monthly_expenses_tnd: 'Finance',
  debt_level: 'Finance', income_source: 'Finance', property_ownership: 'Finance',
  family_situation: 'Famille', number_of_children: 'Famille', number_of_siblings: 'Famille',
  parental_marital_status: 'Famille', family_criminal_history: 'Famille',
  family_psychological_issues: 'Famille', friend_in_jail: 'Famille',
  employment_status: 'Emploi', job: 'Emploi', daily_commute_method: 'Emploi',
  has_psychological_problem: 'Santé', psychological_condition: 'Santé',
  mental_health_treatment: 'Santé', physical_health_status: 'Santé',
  chronic_diseases: 'Santé', addiction_type: 'Santé',
  crime: 'Crime', criminal_record: 'Crime', number_of_previous_arrests: 'Crime',
  juvenile_record: 'Crime', weapon_used: 'Crime', crime_time_of_day: 'Crime',
  crime_location_type: 'Crime', number_of_accomplices: 'Crime',
  investigation_behavior: 'Crime', arrest_method: 'Crime', legal_article_reference: 'Crime',
  current_legal_status: 'Crime', pre_trial_detention_days: 'Crime',
  last_sentence_duration: 'Crime', victim_relationship: 'Crime',
};

export default function App() {
  const [count, setCount] = useState(100);
  const [data, setData] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('All');
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleGenerate = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const d = generateDataset(count);
      setData(d);
      setGenerated(true);
      setPage(0);
      setSearch('');
      setSelectedRow(null);
      setLoading(false);
    }, 50);
  }, [count]);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(q))
    );
  }, [data, search]);

  const visibleCols = useMemo(() => {
    if (activeSection === 'All') return COLUMNS;
    return COLUMNS.filter(c => COLUMN_SECTIONS[c] === activeSection);
  }, [activeSection]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const pageData = filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const downloadCSV = () => {
    const blob = new Blob([toCSV(data)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `criminals_dataset_${data.length}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const blob = new Blob([toJSON(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `criminals_dataset_${data.length}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const sections = ['All', ...Object.keys(SECTION_COLORS)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e2030 0%, #252a3d 100%)',
        borderBottom: '1px solid #2d3148',
        padding: '16px 24px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
              Criminal Dataset Generator
            </h1>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              Tunisian Criminal Records — {COLUMNS.length} champs
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8, padding: '6px 12px' }}>
              <label style={{ fontSize: 13, color: '#94a3b8' }}>Nombre :</label>
              <input
                type="number" min="1" max="10000" value={count}
                onChange={e => setCount(Math.max(1, Math.min(10000, parseInt(e.target.value) || 1)))}
                style={{
                  width: 80, background: 'transparent', border: 'none', outline: 'none',
                  color: '#f1f5f9', fontSize: 14, fontWeight: 600,
                }}
              />
            </div>
            <button onClick={handleGenerate} disabled={loading} style={{
              background: loading ? '#374151' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px',
              fontSize: 13, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}>
              {loading ? 'Génération...' : 'Générer'}
            </button>
            {generated && (
              <>
                <button onClick={downloadCSV} style={{
                  background: '#1a2e1a', color: '#4ade80', border: '1px solid #166534',
                  borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>
                  CSV
                </button>
                <button onClick={downloadJSON} style={{
                  background: '#1a2332', color: '#60a5fa', border: '1px solid #1d4ed8',
                  borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>
                  JSON
                </button>
              </>
            )}
          </div>
        </div>

        {generated && (
          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              placeholder="Rechercher..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0); }}
              style={{
                background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8,
                padding: '6px 12px', color: '#e2e8f0', fontSize: 13, outline: 'none', width: 200,
              }}
            />
            <span style={{ fontSize: 12, color: '#64748b' }}>
              {filteredData.length} / {data.length} enregistrements
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {sections.map(s => (
                <button key={s} onClick={() => setActiveSection(s)} style={{
                  background: activeSection === s
                    ? (s === 'All' ? '#374151' : SECTION_COLORS[s] + '33')
                    : 'transparent',
                  color: s === 'All' ? '#e2e8f0' : (SECTION_COLORS[s] || '#e2e8f0'),
                  border: `1px solid ${s === 'All' ? '#374151' : (SECTION_COLORS[s] || '#374151')}`,
                  borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 500,
                  cursor: 'pointer',
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {!generated ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36,
            }}>🔍</div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>Générateur de Dataset Criminel</p>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>
                {COLUMNS.length} champs · Données tunisiennes réalistes · Export CSV / JSON
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {Object.entries(SECTION_COLORS).map(([s, c]) => (
                <div key={s} style={{
                  background: '#1e2030', border: `1px solid ${c}44`, borderRadius: 8,
                  padding: '6px 14px', fontSize: 12, color: c,
                }}>
                  {s}
                </div>
              ))}
            </div>
            <button onClick={handleGenerate} style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff', border: 'none', borderRadius: 10, padding: '12px 32px',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              Générer {count} enregistrements
            </button>
          </div>
        ) : (
          <>
            {/* Table */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#1a1d27', position: 'sticky', top: 0, zIndex: 10 }}>
                    {visibleCols.map(col => {
                      const sec = COLUMN_SECTIONS[col];
                      const color = SECTION_COLORS[sec] || '#94a3b8';
                      return (
                        <th key={col} style={{
                          padding: '8px 10px', textAlign: 'left', whiteSpace: 'nowrap',
                          color, borderBottom: `2px solid ${color}44`,
                          fontWeight: 600, fontSize: 11, letterSpacing: '0.3px',
                        }}>
                          {col.replace(/_/g, ' ')}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {pageData.map((row, i) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedRow(selectedRow?.id === row.id ? null : row)}
                      style={{
                        background: selectedRow?.id === row.id
                          ? '#1e2540'
                          : i % 2 === 0 ? '#12141f' : '#0f1117',
                        cursor: 'pointer',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => { if (selectedRow?.id !== row.id) e.currentTarget.style.background = '#1a1d2a'; }}
                      onMouseLeave={e => { if (selectedRow?.id !== row.id) e.currentTarget.style.background = i % 2 === 0 ? '#12141f' : '#0f1117'; }}
                    >
                      {visibleCols.map(col => (
                        <td key={col} style={{
                          padding: '6px 10px', whiteSpace: 'nowrap',
                          borderBottom: '1px solid #1a1d27', color: '#cbd5e1',
                          maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {String(row[col] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{
              background: '#1a1d27', borderTop: '1px solid #2d3148',
              padding: '10px 20px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', flexShrink: 0,
            }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                Page {page + 1} / {totalPages} · {filteredData.length} résultats
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setPage(0)} disabled={page === 0} style={paginBtn}>«</button>
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={paginBtn}>‹</button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.min(Math.max(page - 2, 0), Math.max(totalPages - 5, 0)) + i;
                  return (
                    <button key={p} onClick={() => setPage(p)} style={{
                      ...paginBtn,
                      background: p === page ? '#6366f1' : '#1a1d27',
                      color: p === page ? '#fff' : '#94a3b8',
                    }}>
                      {p + 1}
                    </button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} style={paginBtn}>›</button>
                <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} style={paginBtn}>»</button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Detail Panel */}
      {selectedRow && (
        <div style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: 360,
          background: '#1a1d27', borderLeft: '1px solid #2d3148',
          overflowY: 'auto', zIndex: 100, padding: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>
              {selectedRow.first_name} {selectedRow.last_name}
            </h2>
            <button onClick={() => setSelectedRow(null)} style={{
              background: 'none', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer',
            }}>×</button>
          </div>
          {Object.keys(SECTION_COLORS).map(section => {
            const cols = COLUMNS.filter(c => COLUMN_SECTIONS[c] === section);
            const color = SECTION_COLORS[section];
            return (
              <div key={section} style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                  {section}
                </h3>
                <div style={{ background: '#12141f', borderRadius: 8, overflow: 'hidden' }}>
                  {cols.map((col, i) => (
                    <div key={col} style={{
                      display: 'flex', justifyContent: 'space-between', gap: 8,
                      padding: '6px 10px',
                      borderBottom: i < cols.length - 1 ? '1px solid #1e2030' : 'none',
                    }}>
                      <span style={{ fontSize: 11, color: '#64748b', flexShrink: 0 }}>{col.replace(/_/g, ' ')}</span>
                      <span style={{ fontSize: 11, color: '#e2e8f0', textAlign: 'right', wordBreak: 'break-word' }}>
                        {String(selectedRow[col] ?? '')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const paginBtn = {
  background: '#12141f', color: '#94a3b8', border: '1px solid #2d3148',
  borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer',
  minWidth: 28,
};
