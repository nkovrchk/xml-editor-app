import './RepositoryTools.css';
import fields from '../../js/fields';

const RepositoryTools = (
	{
		view,
		onSettingChange,
		onButtonClick,
	}) => {
	const sortTable = {
		'asc': 'По возрастанию',
		'desc': 'По убыванию',
	};

	const searchTable = {
		[fields.NAME]: 'По названию',
		[fields.TITLE]: 'По заголовку',
		[fields.ID]: 'По идентификатору',
	};

	const limitOptions = [5, 10, 15]
		.map((v, i) => (
			<div className={'ctrl-input'} key={i}>
				<input
					onChange={e => onSettingChange('limit', Number(e.target.value))}
					id={`limit-${v}`}
					checked={view.limit === v}
					value={v}
					type={'radio'}/>
				<label htmlFor={`limit-${v}`}>{v}</label>
			</div>
		));

	const sortOptions = ['desc', 'asc']
		.map((v, i) => (
			<div className={'ctrl-input'} key={i}>
				<input
					onChange={e => onSettingChange('sortValue', e.target.value)}
					id={`sort-val-${v}`}
					checked={view.sortValue === v}
					value={v}
					type={'radio'}/>
				<label htmlFor={`sort-val-${v}`}>{sortTable[v]}</label>
			</div>
		));

	const searchOptions = [fields.NAME, fields.TITLE, fields.ID]
		.map((v, i) => (
			<div className={'ctrl-input'} key={i}>
				<input
					onChange={e => onSettingChange('searchBy', e.target.value)}
					id={`search-by-${v}`}
					checked={view.searchBy === v}
					value={v}
					type={'radio'}/>
				<label htmlFor={`search-by-${v}`}>{searchTable[v]}</label>
			</div>
		));

	return (
		<div className={'tools-container'}>
			<div className={'container'}>
				<div className={'row'}>
					<div className={'col-3'}>
						<div className={'tools-setting-container'}>
							<div className={'tools-setting-title'}>{'Показывать'}</div>
							<div className={'tools-setting-body'}>
								<div className={'tools-ctrl-row'}>
									{limitOptions}
								</div>
							</div>
						</div>
					</div>
					<div className={'col-3'}>
						<div className={'tools-setting-container'}>
							<div className={'tools-setting-title'}>{'Сортировать'}</div>
							<div className={'tools-setting-body'}>
								<div className={'tools-ctrl-row'}>
									{sortOptions}
								</div>
							</div>
						</div>
					</div>
					<div className={'col-6'}>
						<div className={'tools-setting-container'}>
							<div className={'tools-setting-title'}>{'Поиск'}</div>
							<div className={'tools-setting-body'}>
								<div className={'tools-ctrl-row'}>
									{searchOptions}
								</div>
								<div className={'tools-ctrl-row'}>
									<div className={'ctrl-input'}>
										<input
											type="text"
											placeholder="Поиск"
											value={view.search}
											onChange={e => onSettingChange('search', e.target.value)}
										/>
									</div>
									<div className={'ctrl-input'}>
										<input
											onChange={e => onSettingChange('matchCase', e.target.checked)}
											type={'checkbox'}
											id={'search-match-case'}
											value={view.matchCase}/>
										<label htmlFor={'search-match-case'}>{'Учитывать регистр'}</label>
									</div>
									<div className={'ctrl-input'}>
										<input
											onChange={e => onSettingChange('fullMatch', e.target.checked)}
											type={'checkbox'}
											id={'search-full-match'}
											value={view.fullMatch}/>
										<label htmlFor={'search-full-match'}>{'Полное совпадение'}</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={'row'}>
					<div className={'tools-ctrl-btns'}>
						<div className={'tools-btn'}>
							<button
								className={'btn btn-primary'}
								onClick={() => onButtonClick('SEARCH')}>{'Применить'}</button>
						</div>
						<div className={'tools-btn'}>
							<button
								className={'btn btn-default'}
								onClick={() => onButtonClick('RESET')}>{'Сбросить'}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};


export default RepositoryTools;