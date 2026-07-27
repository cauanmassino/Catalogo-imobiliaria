import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Imobiliária - Painel de Administração',

  // Preencha com os dados do seu projeto (criados em sanity.io/manage)
  projectId: '2q1xdqym',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})
