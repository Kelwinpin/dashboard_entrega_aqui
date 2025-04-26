import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(3).max(100),
  amount: z.string(),
  price: z.string(),
});

export default productSchema;