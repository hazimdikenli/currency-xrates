import { IoCContainer } from '../ioc-container';
import { pgDB } from './db';
import { XRateRepository } from './xrate-repository';

export default function registerDbProviders(container: IoCContainer) {
  container.service('db', (c: IoCContainer) => pgDB);

  container.service(XRateRepository.name, (c) => new XRateRepository(c.getService('db')));
}
