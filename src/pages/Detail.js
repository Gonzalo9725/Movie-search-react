import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonBackToHome } from '../components/ButtonBackToHome'

const API_KEY = '7e940f8b'

export class Detail extends Component{

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }

    state = { movie: {} }

    _fetchMovie({ id }){
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
            .then(res => res.json())
            .then(movie => {
                console.log(movie)
                this.setState({ movie })
            })
    }

    componentDidMount(){
        console.log(this.props)
        const { movieId } = this.props.match.params
        this._fetchMovie({ id: movieId })
    }

    render(){
        const { Actors, Country, imdbRating, Poster, Released, Title, Type} = this.state.movie
        return(
            <div className='Movie-Container'>
                <div className='Poster'>
                    <img alt={Title} src={Poster} />
                </div>
                <div className='Info-Movie'>
                    <h1 className='title'>{Title}</h1>
                    <div className='info-tags'>
                        <p className="tag is-rounded">{Released}</p>
                        <p className="tag is-rounded">{Country}</p>
                        <p className="tag is-rounded">{Type}</p>
                    </div>
                    <p><strong>IMDB Rating: </strong><span className="tag is-warning"><i className="fas fa-star rating-star"></i>{imdbRating}</span></p>
                    <p><strong>Actors: </strong></p>
                    <p>{Actors}</p>
                    <ButtonBackToHome />
                </div>
            </div>
        )
    }
}