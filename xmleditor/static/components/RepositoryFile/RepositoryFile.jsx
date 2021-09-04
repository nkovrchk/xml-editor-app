import './RepositoryFile.css';

const RepositoryFile = (
	{
		name,
		isSelected,
		onFileClick,
	}
) => (
	<div className={'repository-file-container'}>
		<div className={`repository-file-wrap ${isSelected ? 'selected' : ''}`}>
			<div
				className={'repository-file-title'}
				onClick={() => onFileClick(name)}>{name}
			</div>
		</div>
	</div>
);

export default RepositoryFile;