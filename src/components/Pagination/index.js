import './index.css'

const Pagination = props => {
  const {page, onChangePage} = props

  const onClickPrev = () => {
    if (page > 1) {
      onChangePage(page - 1)
    }
  }

  const onClickNext = () => {
    onChangePage(page + 1)
  }

  return (
    <div className="pagination-container">
      <button type="button" className="pagination-button" onClick={onClickPrev}>
        Prev
      </button>

      <p className="page-number">{page}</p>

      <button type="button" className="pagination-button" onClick={onClickNext}>
        Next
      </button>
    </div>
  )
}

export default Pagination
