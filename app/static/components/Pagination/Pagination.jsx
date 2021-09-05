import './Pagination.css';

const Pagination = ({pagination, onPageClick}) => {
	const { page, total, limit } = pagination;
	let range = [];
	let offset = 3;

	const totalPages = Math.ceil(total / limit);
	const pagesBefore = page - 1;
	const pagesAfter = totalPages - page;

	let offsetLeft = offset;
	let offsetRight = offset;

	if (pagesBefore < offset) {
		offsetLeft = pagesBefore;
		offsetRight += (offset - pagesBefore);
	}

	if(pagesAfter < offset){
		offsetRight = pagesAfter;
		offsetLeft += (offset - pagesAfter);
	}

	if(page > 1) {
		const calcOffset = pagesBefore < offsetLeft ? pagesBefore : offsetLeft;

		for (let i = page - calcOffset; i < page; i++)
			range.push(i);
	}
	range.push(page);

	if(page < totalPages){
		const calcOffset = pagesAfter < offsetRight ? pagesAfter : offsetRight;

		for (let i = page + 1; i <= page + calcOffset; i++)
			range.push(i);
	}

	const btns = range.map((r, i) => (
		<div
			key={i}
			className={`page-btn ${page === r ? 'selected' : ''}`}
			onClick={() => onPageClick(r)}
		>
			{r}
		</div>
	));

	return (
		<div className={'pagination-container'}>
			{btns}
		</div>
	);
};

export default Pagination;