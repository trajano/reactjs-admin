export class FakeServer {
    constructor() {
        this.delayInMillis = 250
        this.data = {}
    }

    init(initialData) {
        this.data = initialData
    }
    /**
     * Returns a promise to get the data.
     */
    get() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data)
            }, this.delayInMillis)
        })
    }
    /**
     * Returns a promise to set the data.  The promise will return the new data.
     * @param path path to the data to update.  It could be null to replace the whole data structure.
     */
    set(path, newData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (path) {
                    let anchor = this.data
                    let lastSegment = null
                    path.split('.').forEach((segment) => {
                        if (lastSegment != null) {
                            anchor = anchor[lastSegment]
                        }
                        lastSegment = segment
                    })
                    anchor[lastSegment] = newData
                } else {
                    this.data = newData;
                }
                resolve(this.data)
            }, this.delayInMillis)
        })
    }
}

/**
 *  Export a singleton instance.
 */
export default new FakeServer()