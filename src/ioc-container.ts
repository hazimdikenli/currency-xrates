import registerDbProviders from './db/providers'
import registerEcbProviders from './services/ecb/providers'
import registerTcmbProviders from './services/tcmb/providers'
import registerKznbProviders from './services/kznb/providers'
import registerConversionProviders from './services/currency-conversion/providers'

type ServiceCallback<T> = (container: IoCContainer) => T

export class IoCContainer {
  private services: { [key: string]: any } = {}

  public service<T>(name: string, cb: ServiceCallback<T>): this {
    Object.defineProperty(this, name, {
      get: (): T => {
        if (!this.services.hasOwnProperty(name)) {
          console.log(`registering service ${name}`)
          this.services[name] = cb(this)
        }
        return this.services[name]
      },
      configurable: true,
      enumerable: true,
    })

    return this
  }
  public get<T>(name: string): T {
    // @ts-ignore
    return this[name]
  }
}

const container = new IoCContainer()
let containerInitialised = false
export function createIoCContainer() {
  if (!containerInitialised) {
    registerDbProviders(container)
    registerEcbProviders(container)
    registerTcmbProviders(container)
    registerKznbProviders(container)
    registerConversionProviders(container)
    containerInitialised = true
  }

  return container
}
