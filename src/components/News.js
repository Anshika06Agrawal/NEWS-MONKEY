import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News =(props)=> {
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)
    // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`
    
    const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
   const updateNews= async()=> {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=47d7d7ee5eec42c7aba6fb44a73d981e&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json() 
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }
    
    useEffect(()=>{
        updateNews();
    },[])
    
    

    const handlePrevClick = async () => {
        setPage( page - 1 )
        updateNews();
    }

    const handleNextClick = async () => {
        setPage( page+1)
        updateNews()
    }

    // const fetchMoreData = asyn() => {
        
    //     const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=47d7d7ee5eec42c7aba6fb44a73d981e&page=${state.page}&pageSize=${props.pageSize}`
    //     setPage(page+1)
    //     let data=await fetch(url);
    //     let parsedData = await data.json()
    //     setArticles(articles.concat(parsedData.articles))
    //     setTotalResults(parsedData.totalResults)
    // };

    
    return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'75px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <div className="row" style={{margin:'30px'}}>
                    {!loading && articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div>
    )
    
}
 

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News