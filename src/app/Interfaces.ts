export interface BrandInterface {
  readonly id: Number,
  title: String,
  logo: {
    image: String,
    alternative: String
  }
}

export interface CategoryInterface {
  readonly id: Number,
  title: String,
}

export interface DeviceInterface {
  readonly id: Number,
  brand: Number,
  model: String,
  categories: number[],
  code: String,
  quantity?: number,
  prices: {
    value: number,
    discount: number | 0
  },
  specs: {
    storage: Number | 0,
    ram: Number | 0,
    battery: Number,
    display: Number | 0,
    camera: Number | 0,
    system: String | '',
    simTray: Boolean | 0
  },
  description: String,
  preview: {
    image: String,
    alternative: String
  },
  colors_available: String[],
  stock?: Number | null
}
