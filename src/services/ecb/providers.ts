import { IoCContainer } from '../../ioc-container'
import { XRateRepository } from '../../db/xrate-repository'
import { EcbXRatesDownloader } from './ecb-xrates-downloader'
import { EcbXRateService } from './ecb-xrates-service'

export default function registerEcbProviders(container: IoCContainer) {
  container.service(EcbXRatesDownloader.name, () => new EcbXRatesDownloader())

  container.service(
    EcbXRateService.name,
    c =>
      //
      new EcbXRateService(
        c.get<XRateRepository>(XRateRepository.name),
        //
        c.get<EcbXRatesDownloader>(EcbXRatesDownloader.name)
      )
  )
}
