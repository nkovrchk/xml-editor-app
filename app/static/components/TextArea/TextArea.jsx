import './TextArea.css';

const TextArea = ({name, label, value, errors = [], onValueChange}) => (
	<div className='input-container'>
		<label htmlFor={name} className='input-label'>{label}</label>
		<textarea
			className={`input-field text-area ${errors.length > 0 ? 'bg-error' : ''}`}
			id={name}
			rows='5'
			name={name}
			value={value}
			onChange={e => onValueChange(e, errors)}
		>
		</textarea>
		{errors.map((err, i) => (
			<div key={i} className='input-error'>{err}</div>
		))}
	</div>
);

export default TextArea;