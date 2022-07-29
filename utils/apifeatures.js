class ApiFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr =querystr
    }
    search(){
        const keyword=this.querystr.keyword ?
          {  name:{
                $regex: this.querystr.keyword,
                $option:"i",
          },
        }
        :{};
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        /*1.35.58*/
        const queryCopy= {...this.querystr}
        //removing some field for category
        const removefields= ["keyword","page","limit"];
        removefields.forEach((key)=>delete queryCopy[key])
        //filter for price and Rating 
        let queryStr= JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$ ${key}`)

        this.query = this.query.find(JSON.parse(querystr));
        return this;

    }
    pagination(resultPerPage){
        const currentPage = Number(this.querystr.page)|| 1;
        const skip = resultPerPage* (currentPage-1)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

    }
}
module.exports= ApiFeatures;