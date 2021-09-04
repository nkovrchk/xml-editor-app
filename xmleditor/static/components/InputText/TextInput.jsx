const TextInput = ({name, label, value, errors = [], onValueChange}) => (
	<div className='input-container'>
		<label htmlFor={name} className='input-label'>{label}</label>
		<input
			className={`input-field text-input ${errors.length > 0 ? 'bg-error' : ''}`}
			id={name}
			type='text'
			name={name}
			value={value}
			onChange={e => onValueChange(e)}
		/>
		{errors.map((err, i) => (
			<div key={i} className='input-error'>{err}</div>
		))}
	</div>
);

export default TextInput;