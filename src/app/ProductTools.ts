export class ProductTools {
    static addToCollection(collection: string, productId: number): String {
      let ids =  JSON.parse(localStorage.getItem(collection) !) || []

      for(let id of ids) {
        if(id.id === productId) {
          return `Already in ${collection}!`
        }
      }

      ids.push({
        id: productId
      })

      localStorage.setItem(collection, JSON.stringify(ids))

      return `Successfully added to ${collection}!`
    }

    static getCollection(collection: string) {
      return JSON.parse(localStorage.getItem(collection) !) || []
    }
}
