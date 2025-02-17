import registerDbProviders from './db/providers'
import registerEcbProviders from './services/ecb/providers'
import registerTcmbProviders from './services/tcmb/providers'
import registerKznbProviders from './services/kznb/providers'
import registerConversionProviders from './services/currency-conversion/providers'

type ServiceCallback<T> = (container: IoCContainer) => T

export class IoCContainer {
  private services: Record<string, unknown> = {}

  public service<T>(name: string, cb: ServiceCallback<T>): this {
    Object.defineProperty(this, name, {
      get: (): T => {
        if (!Object.prototype.hasOwnProperty.call(this.services, name)) {
          console.log(`registering service ${name}`)
          this.services[name] = cb(this)
        }
        return this.services[name] as T
      },
      configurable: true,
      enumerable: true,
    })

    return this
  }
  public get<T>(name: string): T {
    // @ts-expect-error returns the registered service
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
