import { IoCContainer } from '../../ioc-container'
import { XRateRepository } from '../../db/xrate-repository'
import { TcmbXRatesDownloader } from './tcmb-xrates-downloader'
import { TcmbXRateService } from './tcmb-xrates-service'

export default function registerTcmbProviders(container: IoCContainer) {
  container.service(TcmbXRatesDownloader.name, c => new TcmbXRatesDownloader())

  container.service(
    TcmbXRateService.name,
    c =>
      //
      new TcmbXRateService(
        c.getService<XRateRepository>(XRateRepository.name),
        //
        c.getService<TcmbXRatesDownloader>(TcmbXRatesDownloader.name)
      )
  )
}
