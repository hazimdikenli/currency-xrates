import { IoCContainer } from '../../ioc-container'
import { XRateRepository } from '../../db/xrate-repository'
import { EcbXRatesDownloader } from './ecb-xrates-downloader'
import { EcbXRateService } from './ecb-xrates-service'

export default function registerEcbProviders(container: IoCContainer) {
  container.service(EcbXRatesDownloader.name, c => new EcbXRatesDownloader())

  container.service(
    EcbXRateService.name,
    c =>
      //
      new EcbXRateService(
        c.getService<XRateRepository>(XRateRepository.name),
        //
        c.getService<EcbXRatesDownloader>(EcbXRatesDownloader.name)
      )
  )
}
