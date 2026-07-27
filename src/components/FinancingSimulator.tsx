import { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';

interface FinancingSimulatorProps {
  price: number;
}

const ANNUAL_RATE = 0.105; // 10,5% a.a. — taxa de referência genérica, apenas estimativa

export default function FinancingSimulator({ price }: FinancingSimulatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [years, setYears] = useState(30);

  const { downPayment, financedAmount, monthlyPayment } = useMemo(() => {
    const downPayment = (price * downPaymentPct) / 100;
    const financedAmount = price - downPayment;
    const monthlyRate = Math.pow(1 + ANNUAL_RATE, 1 / 12) - 1;
    const months = years * 12;

    // Tabela Price (parcelas fixas)
    const monthlyPayment =
      monthlyRate === 0
        ? financedAmount / months
        : (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    return { downPayment, financedAmount, monthlyPayment };
  }, [price, downPaymentPct, years]);

  return (
    <div className="bg-white border border-mist rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator size={18} className="text-brass-dark" />
        <h2 className="font-display text-lg font-bold text-ink">Simule seu financiamento</h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-ink">Entrada</label>
            <span className="text-sm font-mono text-brass-dark font-semibold">
              {downPaymentPct}% · R$ {downPayment.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={downPaymentPct}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-brass"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-ink">Prazo</label>
            <span className="text-sm font-mono text-brass-dark font-semibold">{years} anos</span>
          </div>
          <input
            type="range"
            min={5}
            max={35}
            step={1}
            value={years}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYears(Number(e.target.value))}
            className="w-full accent-brass"
          />
        </div>

        <div className="bg-brass-soft/40 rounded-2xl p-5 text-center">
          <p className="text-xs text-slate mb-1">Parcela mensal estimada</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-ink">
            R$ {monthlyPayment.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </p>
        </div>

        <p className="text-xs text-slate leading-relaxed">
          Valor financiado estimado: R$ {financedAmount.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}.
          Simulação aproximada (taxa de referência de {(ANNUAL_RATE * 100).toFixed(1)}% a.a., sistema Price),
          não considera seguros, taxas do banco ou análise de crédito. Consulte um correspondente bancário
          para valores exatos.
        </p>
      </div>
    </div>
  );
}
