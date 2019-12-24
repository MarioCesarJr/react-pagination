import React, { useState, useEffect } from 'react';
import api from './services/api';

import ReactPaginate from 'react-paginate';

export default function App2() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get(
        `/list_movies.json?limit=8&page=${currentPage + 1}`
      );

      setMovies(response.data);

      const { movie_count } = response.data.data;

      // Page Count = movie_count / limit
      setPageCount(movie_count / 8);
      setLoading(false);
    }

    loadMovies();
  }, [currentPage]);

  function handlePageChange(data) {
    setCurrentPage(data.selected);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='container'>
      <h1 className='text-primary mb-3'>YTS Movies</h1>

      <div className='row'>
        {movies.data.movies.map(movie => (
          <div className='col-3'>
            <div
              className='card'
              style={{ marginBottom: '10px', maxWidth: '14em' }}
            >
              <img
                src={movie.medium_cover_image}
                alt={movie.medium_cover_image}
                className='card-img-top'
              />
              <div className='card-body'>
                <h5 className='card-title'>{movie.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        previousLinkClassName={'page-link'}
        activeClassName={'page-item active'}
        disabledClassName={'page-item disabled'}
        activeLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
      />
    </div>
  );
}
