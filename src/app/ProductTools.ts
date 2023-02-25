import deviceData from 'src/assets/data/devices.json'
export class ProductTools {
    static addToCollection(collection: string, productId: number): String {
      let ids = this.getCollection(collection) || []

      for(let id of ids) {
        if(id.id === productId) {
          return `Already in ${collection}!`
        }
      }

      if(collection == 'favorites') {
        ids.push({
          id: productId,
        })
      } else {
        ids.push({
          id: productId,
          quantity: 1
        })
      }

      localStorage.setItem(collection, JSON.stringify(ids))

      return `Successfully added to ${collection}!`
    }

    static getCollection(collection: string = 'cart') {
      return JSON.parse(localStorage.getItem(collection) !) || []
    }

    /**
     * Fetch ids from local storage by keyword,
     * find corresponding devices and return them.
     *
     * @param string collection name of the collection to look for
     *
     * @return Array<any>
    */
    static assignCollection(collection: string): Array<any> {
      let returnCollection: any[] = []

      deviceData.forEach(device => {
        this.getCollection(collection).forEach((instance: any) => {
          if(device.id == instance.id) returnCollection.push({ ...device, quantity: instance.quantity })
        })
      })

      return returnCollection
    }

    static removeFromCollection(instanceId: number, collection: string) {
      let collectionArray = this.getCollection(collection)

      for(let index in collectionArray) {
        if(collectionArray[index].id == instanceId) {
          collectionArray.splice(index, 1)
        }
      }

      localStorage.setItem(collection, JSON.stringify(collectionArray))

      return this.assignCollection(collection)
    }

    static updateQuantity(instanceId: number, byValue: number) {
      let collection = this.getCollection()

      for(let index in collection) {
        if(collection[index].id == instanceId) {
          collection[index].quantity = byValue
        }
      }

      localStorage.setItem('cart', JSON.stringify(collection))

      return this.assignCollection('cart')
    }

    static emptyCart() {
      localStorage.removeItem('cart')
    }

    static count(collection: string) {
      return this.getCollection(collection).length
    }
}
