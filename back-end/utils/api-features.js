
class ApiFeatures {
    constructor(query, queryStr, searchInput) {
        this.query = query
        this.queryStr = queryStr
        this.searchInput = searchInput ? searchInput : "name"
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            [this.searchInput]: {
                $regex: this.queryStr.keyword,
                $options: "i"
            },
        } : {}
        this.query = this.query.find({...keyword})
        return this
    }

    filter() {
        const queryCopy = {...this.queryStr}

        const removeFields = ["keyword", "limit"]
        removeFields.forEach(key => delete queryCopy[key])

        let queryStr = JSON.stringify(queryCopy)
        console.log(queryStr)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }
}

module.exports = ApiFeatures