import { XRateRepository } from '../../db/xrate-repository'
import { IoCContainer } from '../../ioc-container'
import { CurrencyConversionService } from './currency-conversion.service'

export default function registerConversionProviders(container: IoCContainer) {
  container.service(
    CurrencyConversionService.name,
    c => new CurrencyConversionService(c.getService<XRateRepository>(XRateRepository.name))
  )
}
