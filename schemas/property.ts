import { defineField, defineType } from 'sanity'

// Lista fixa de cidades disponíveis no formulário do Studio.
// Para adicionar uma nova cidade, inclua uma linha aqui no formato:
// { title: 'Nome Bonito Para Exibir', value: 'slug-usado-na-url' }
//
// Regras para o "value": tudo minúsculo, sem acento, sem espaço (use hífen).
// Esse valor vira a URL da página da cidade, ex: value 'sao-paulo' => /imoveis/sao-paulo
export const CITY_OPTIONS = [
  { title: 'Asa Sul', value: 'asa-sul' },
  { title: 'Asa Norte', value: 'asa-norte' },
  { title: 'Águas Claras', value: 'aguas-claras' },
  { title: 'Ceilandia', value: 'ceilandia' },
  { title: 'Guará', value: 'guara' },
  { title: 'Taguatinga', value: 'taguatinga' },
  { title: 'Samambaia', value: 'samambaia' },
  { title: 'Lago Sul', value: 'lago-sul' },
  { title: 'Lago Norte', value: 'lago-norte' },
  { title: 'Sudoeste/Octogonal', value: 'sudoeste' },
  { title: 'Noroeste', value: 'noroeste' },
  { title: 'Cruzeiro', value: 'cruzeiro' },
  { title: 'Riacho Fundo', value: 'riacho-fundo' },
  { title: 'Vicente Pires', value: 'vicente-pires' },
  { title: 'Jardim Botânico', value: 'jardim-botanico' },
]

export default defineType({
  name: 'property',
  title: 'Imóvel',
  type: 'document',
  groups: [
    { name: 'principal', title: 'Principal' },
    { name: 'caracteristicas', title: 'Características' },
    { name: 'midia', title: 'Mídia' },
    { name: 'extras', title: 'Extras (opcional)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Imóvel',
      type: 'string',
      group: 'principal',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'principal',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Região Administrativa',
      type: 'string',
      group: 'principal',
      description: 'Selecione a região de Brasília/DF onde fica o imóvel. Para adicionar uma nova região à lista, edite o array CITY_OPTIONS no topo deste arquivo (schemas/property.ts).',
      options: {
        list: CITY_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'neighborhood',
      title: 'Bairro',
      type: 'string',
      group: 'principal',
    }),
    defineField({
      name: 'type',
      title: 'Tipo de Negócio',
      type: 'string',
      group: 'principal',
      options: {
        list: [
          { title: 'Venda', value: 'venda' },
          { title: 'Aluguel', value: 'aluguel' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      group: 'principal',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição Completa',
      type: 'text',
      group: 'principal',
      rows: 6,
    }),
    defineField({
      name: 'featured',
      title: 'Destaque na Home?',
      type: 'boolean',
      group: 'principal',
      initialValue: false,
      description: 'Se ativado, este imóvel aparece na seção de destaques da página inicial.',
    }),

    // Características
    defineField({
      name: 'bedrooms',
      title: 'Quartos',
      type: 'number',
      group: 'caracteristicas',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Banheiros',
      type: 'number',
      group: 'caracteristicas',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'parkingSpots',
      title: 'Vagas de Garagem',
      type: 'number',
      group: 'caracteristicas',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'area',
      title: 'Área (m²)',
      type: 'number',
      group: 'caracteristicas',
      validation: (Rule) => Rule.min(0),
    }),

    // Mídia
    defineField({
      name: 'images',
      title: 'Galeria de Imagens',
      type: 'array',
      group: 'midia',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Extras — todos opcionais. Preencha só para imóveis exclusivos/lançamentos
    // que realmente tenham essas informações; imóveis de revenda podem ficar
    // sem nenhum desses campos, o site simplesmente não mostra a seção.
    defineField({
      name: 'status',
      title: 'Status do Empreendimento',
      type: 'string',
      group: 'extras',
      description: 'Deixe em branco para imóveis de revenda comuns. Use apenas para lançamentos/exclusivos.',
      options: {
        list: [
          { title: 'Lançamento', value: 'lancamento' },
          { title: 'Em construção', value: 'em_construcao' },
          { title: 'Pronto para morar', value: 'pronto' },
        ],
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL do Vídeo (opcional)',
      type: 'url',
      group: 'extras',
      description: 'Link de um vídeo do imóvel (YouTube/Vimeo). Deixe em branco se não tiver.',
    }),
    defineField({
      name: 'amenities',
      title: 'Lazer e Infraestrutura',
      type: 'array',
      group: 'extras',
      description: 'Itens de lazer do condomínio/prédio, se houver (piscina, academia, etc).',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  { title: 'Piscina', value: 'pool' },
                  { title: 'Academia', value: 'gym' },
                  { title: 'Espaço Gourmet', value: 'gourmet' },
                  { title: 'Playground', value: 'playground' },
                  { title: 'Portaria/Segurança', value: 'security' },
                  { title: 'Energia Solar', value: 'solar' },
                  { title: 'Bicicletário', value: 'bike' },
                  { title: 'Salão de Festas', value: 'party' },
                  { title: 'Elevador', value: 'elevator' },
                  { title: 'Pet Place', value: 'pet' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Nome do item',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'icon' } },
        },
      ],
    }),
    defineField({
      name: 'nearbyPlaces',
      title: 'Pontos de Interesse Próximos',
      type: 'array',
      group: 'extras',
      description: 'Distâncias reais em minutos. Só cadastre se tiver certeza da distância.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  { title: 'Metrô/Transporte', value: 'transit' },
                  { title: 'Escola', value: 'school' },
                  { title: 'Hospital', value: 'hospital' },
                  { title: 'Shopping', value: 'mall' },
                  { title: 'Via Principal', value: 'road' },
                  { title: 'Supermercado', value: 'market' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Nome do local',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'minutes',
              title: 'Distância (minutos)',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'minutes' },
            prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle} min` }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'city',
      media: 'images.0',
    },
  },
})
