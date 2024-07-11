import { IoCContainer } from '../../ioc-container';
import { XRateRepository } from '../../db/xrate-repository';
import { KznbXRatesDownloader } from './kznb-xrates-downloader';
import { KznbXRateService } from './kznb-xrates-service';

export default function registerTcmbProviders(container: IoCContainer) {
  container.service(KznbXRatesDownloader.name, (c) => new KznbXRatesDownloader());

  container.service(KznbXRateService.name, (c) => new KznbXRateService(c.getService<XRateRepository>(XRateRepository.name), c.getService<KznbXRatesDownloader>(KznbXRatesDownloader.name)));
}
