import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Check } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('success');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-[2rem] border border-mist bg-white/92 p-6 sm:p-8 shadow-[0_18px_44px_rgba(22,21,19,0.06)] backdrop-blur-md"
    >
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-brass-dark mb-3">
          Contato direto
        </p>
        <h4 className="font-display text-2xl sm:text-[2rem] font-semibold tracking-tight text-ink leading-tight">
          Conte o que procura e recebemos sua busca com cuidado.
        </h4>
        <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate">
          Responda com o máximo de contexto possível. Isso ajuda a indicar opções mais precisas e economiza tempo no atendimento.
        </p>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate">Nome</span>
          <input
            type="text"
            placeholder="Seu nome"
            className="h-12 rounded-full border border-mist bg-paper px-4 text-sm text-ink outline-none placeholder:text-slate/60 focus:border-brass"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate">WhatsApp</span>
          <input
            type="tel"
            placeholder="(61) 9xxxx-xxxx"
            className="h-12 rounded-full border border-mist bg-paper px-4 text-sm text-ink outline-none placeholder:text-slate/60 focus:border-brass"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate">O que você procura</span>
          <textarea
            rows={5}
            placeholder="Ex.: apartamento com 3 quartos em Águas Claras, até R$ 900 mil"
            className="rounded-[1.5rem] border border-mist bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-slate/60 focus:border-brass resize-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate max-w-sm">
          Ao enviar, você autoriza o contato para retorno com opções compatíveis.
        </p>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-3 font-semibold text-ink transition-colors hover:bg-brass-dark"
        >
          {status === 'success' ? <Check size={18} /> : <Send size={18} />}
          {status === 'success' ? 'Enviado' : 'Enviar busca'}
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-[1.25rem] border border-mist bg-paper px-4 py-3 text-sm text-slate">
        <MessageCircle size={16} className="text-brass-dark" />
        Preferir rapidez? Use o WhatsApp no topo.
      </div>
    </motion.form>
  );
}