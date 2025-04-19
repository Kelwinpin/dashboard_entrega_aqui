import { z } from 'zod'

const loginSchema = z.object({
  cnpj: z.string().min(18, 'CNPJ deve ter 14 dígitos').max(20, 'CNPJ deve ter 14 dígitos'),
  login: z.string(),
  password: z.string(), 
})

export default loginSchema