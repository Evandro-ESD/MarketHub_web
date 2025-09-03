// Dados mocados para desenvolvimento sem backend de vendas
export const MOCK_RESUMO = {
  totalGeral: 58240.55,
  totalHoje: 1240.90,
  pedidosHoje: 7,
  totalMes: 17890.30,
  totalAno: 58240.55
};

// Últimos 7 dias
export const MOCK_DIARIO = Array.from({length:7}).map((_,i)=>{
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return { dia: d.toISOString().substring(0,10), total: Math.round(400 + Math.random()*1200) };
});

// Mensal (12 meses)
export const MOCK_MENSAL = Array.from({length:12}).map((_,i)=>({ mes: i+1, total: Math.round(2000 + Math.random()*6000) }));

// Últimos 5 anos
export const MOCK_ANUAL = (()=>{
  const anoAtual = new Date().getFullYear();
  return Array.from({length:5}).map((_,i)=>({ ano: anoAtual - (4 - i), total: Math.round(15000 + Math.random()*45000) }));
})();

// Top produtos
export const MOCK_TOP = [
  { id_produto: 1, nome_produto: 'Teclado Mecânico', quantidade: 320, faturamento: 96000 },
  { id_produto: 2, nome_produto: 'Mouse Gamer', quantidade: 510, faturamento: 76500 },
  { id_produto: 3, nome_produto: 'Headset Pro', quantidade: 210, faturamento: 63000 },
  { id_produto: 4, nome_produto: 'Monitor 27"', quantidade: 95, faturamento: 142500 },
  { id_produto: 5, nome_produto: 'Webcam HD', quantidade: 180, faturamento: 36000 },
];