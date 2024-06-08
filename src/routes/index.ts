import { Application, Router } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './product.route'

import '../utils/connectDB'
import { AuthRouter } from './auth.route'

const _routes: [string, Router][] = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/auth', AuthRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
