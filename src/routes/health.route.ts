import { Request, Response, Router } from 'express'
import { logger } from '../utils/logger'

export const HealthRouter: Router = Router()

HealthRouter.get('/', (req: Request, res: Response) => {
  logger.info('Success Get Health data')
  res.status(200).send({ status: '200' })
})
