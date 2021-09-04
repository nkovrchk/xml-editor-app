import './SelectInput.css';

const SelectInput = ({name, label, value, options, errors = [], onValueChange}) => (
	<div className='input-container'>
		<label htmlFor={name} className='input-label'>{label}</label>
		<select
			className={`input-field select-input ${errors.length > 0 ? 'bg-error' : ''}`}
			value={value}
			name={name}
			id={name}
			onChange={e => onValueChange(e, errors)}
		>
			<option disabled={true}>{''}</option>
			{options.map((opt, i) => <option key={i}>{opt}</option>)}
		</select>
		{errors.map((err, i) => (
			<div key={i} className='input-error'>{err}</div>
		))}
	</div>
);

export default SelectInput;