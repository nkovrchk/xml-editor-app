import './Editor.css';
import TextInput from '../InputText/TextInput';
import TextArea from '../TextArea/TextArea';
import SelectInput from '../SelectInput/SelectInput';
import options from '../../js/options';
import fields from '../../js/fields';
import action from '../../js/action';

class Editor extends React.Component {
	constructor(props) {
		super(props);

		this.handleValueChange = this.handleValueChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.getData = this.getData.bind(this);
		this.resetData = this.resetData.bind(this);
		this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
		this.saveFileData = this.saveFileData.bind(this);
		this.getValidations = this.getValidations.bind(this);

		const init = {
			name: '',
			id: '',
			source: '',
			title: '',
			category: '',
			text: '',
		};
		this.state = {
			isSaved: false,
			source: _.cloneDeep(init),
			data: init,
			validation: this.getValidations(),
			allFiles: this.props.allFiles,
		};

		if(this.props.action === action.DATA)
			this.getData();
	}

	getValidations (){
		return {
			category: {
				func: this.validateCategory,
				result: [],
			},
			title: {
				func: this.validateTitle,
				result: [],
			},
			id: {
				func: this.validateId,
				result: [],
			},
			text: {
				func: this.validateText,
				result: [],
			},
			source: {
				func: this.validateSource,
				result: [],
			},
			name: {
				func: this.validateName,
				result: [],
			},
		};
	}

	fetchData(fileName) {
		return fetch(`api/file/${fileName}`)
			.then(res => res.json());
	}

	getData() {
		this.fetchData(this.props.name)
			.then(res => {
				const data = {
					id: res.id ?? '',
					title: res.title ?? '',
					source: res.source ?? '',
					category: res.category ?? '',
					text: res.text ?? '',
				};

				const calcData = {
					...data,
					name: this.props.name,
				};

				this.setState({
					source: _.cloneDeep(calcData),
					data: calcData,
				});
			});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.name !== this.props.name) {
			const initialData = {
				name: '',
				id: '',
				source: '',
				title: '',
				category: '',
				text: '',
			};
			this.setState({
				data: initialData,
				source: _.cloneDeep(initialData),
				validation: this.getValidations(),
			});

			if(this.props.action === action.DATA)
				this.getData();
		}
	}

	onFormSubmit() {
		let hasErrors = false;
		const data = this.state.data;
		const validation = this.state.validation;
		const source = this.state.source;
		const validateField = prop => {
			const result = validation[prop].func(data[prop], this);

			if (result.length > 0)
				hasErrors = true;

			validation[prop].result = result;
		};

		if(this.props.action === action.ADD){
			const name = data.name;

			validateField('name');

			if(hasErrors){
				this.setState({validation});
				return;
			}

			fetch(`/file/add/${name}`)
				.then(res => {
					if (res.status !== 200)
						throw new Error(res.statusText);
				})
				.then(() => {
					this.props.showMessage('Файл успешно создан', 'Success');
					this.props.onFileAdded();
				})
				.catch(e => this.props.showMessage(e.message, 'Error'));
		}
		else if(this.props.action === action.DATA) {
			const dataFields = [
				'id',
				'title',
				'category',
				'source',
				'text',
			];

			if(source.name !== data.name)
				validateField('name');

			dataFields.forEach(v => {
				validateField(v);
			});

			if (hasErrors) {
				this.setState({validation});
				return;
			}

			this.saveFileData(source.name)
				.then(() => {
					this.props.showMessage('Данные успешно сохранены', 'Success');
					this.setState({source: _.cloneDeep(data)});
					this.props.onFormSubmited(source.name, data.name);
				})
				.catch(err => this.props.showMessage(err.message, 'Error'));
		}
	}

	saveFileData(name) {
		return fetch(`file/save/${name}`, {
			method: 'POST',
			headers: {'Content-Type': 'text/json'},
			body: JSON.stringify(this.state.data),
		})
			.then(res => {
				if (res.status !== 200)
					throw new Error(res.statusText);

				return res;
			});
	}

	handleValueChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		const data = this.state.data;
		const validation = this.state.validation;

		data[name] = value;

		if (validation[name])
			validation[name].result = [];

		this.setState({
			data,
			validation,
			message: undefined,
		});
	}

	validateCategory(value) {
		const errors = [];

		if (!value)
			errors.push('Необходимо заполнить поле Категория');

		return errors;
	}

	validateTitle(value) {
		const errors = [];

		if (!value)
			errors.push('Необходимо заполнить поле Заголовок');

		return errors;
	}

	validateId(value) {
		const errors = [];

		if (!value)
			errors.push('Необходимо заполнить поле Идентификатор');

		if(value && !value.match(/^\d+$/))
			errors.push('Идентификатор должен содержать только цифры');

		return errors;
	}

	validateName(value, self) {
		const errors = [];

		if (!value)
			errors.push('Необходимо заполнить поле Название файла');

		if(value && !value.match(/^[A-Za-zА-Яа-яёЁ\d]+$/))
			errors.push('Допускаются только цифры и буквы русского или латинского алфавита');

		if(self.state.allFiles.some(f => f === value))
			errors.push('Файл с таким названием уже существует');

		return errors;
	}

	validateSource(value) {
		const errors = [];

		if (!value)
			errors.push('Необходимо заполнить поле Ресурс');

		if (value && !value.match(/^https:\/\/kgd\.ru\/\w+x/))
			errors.push('Ресурс должен иметь формат: https://kgd.ru/<-источник->');

		return errors;
	}

	validateText(value) {
		const errors = [];

		if (!value)
			errors.push('Необходимо заполнить Текст');

		return errors;
	}

	resetData() {
		this.setState({data: _.cloneDeep(this.state.source)});
	}

	handleDeleteButtonClick (){
		const toDelete = confirm('Вы уверены, что хотите удалить файл?');

		if(toDelete)
			fetch(`/file/delete/${this.state.source.name}`)
				.then(res => {
					if(res.status !== 200)
						throw new Error(res.statusText);
				})
				.then(() => {
					this.props.showMessage('Файл успешно удален', 'Success');
					this.props.onFileDeleted();
				})
				.catch(e => this.props.showMessage(e, 'Error'));
	}

	render() {
		return (
			<div className="editor-container">
				<div className="editor-header">
					<div
						className="editor-btn"
						onClick={() => this.props.onEditorClose(this.state.source, this.state.data)}>
						<img src={'/static/icons/close.svg'} alt={'Сбросить'}/>
					</div>
					<div
						className={'editor-btn'}
						onClick={this.resetData}>
						<img src={'/static/icons/reset.svg'} alt={'Закрыть'}/>
					</div>
				</div>
				{this.state.message ?
					<div
						className={`editor-msg ${this.state.message ? this.state.message.type : ''}`}
					>
						{this.state.message.text}
					</div>
					: ''
				}
				<form className="editor-form" method={'POST'} onSubmit={e => {
					e.preventDefault();
					this.onFormSubmit();
				}}>

					{this.props.action === action.DATA ?
						<div>
							<TextInput
								label={'Название файла'}
								name={fields.NAME}
								value={this.state.data.name}
								onValueChange={this.handleValueChange}
								errors={this.state.validation?.name?.result}
							/>
							<TextInput
								label={'Идентификатор'}
								name={fields.ID}
								value={this.state.data.id}
								onValueChange={this.handleValueChange}
								errors={this.state.validation?.id?.result}
							/>
							<TextInput
								label={'Заголовок'}
								name={fields.TITLE}
								value={this.state.data.title}
								onValueChange={this.handleValueChange}
								errors={this.state.validation?.title?.result}
							/>
							<TextInput
								label={'Ссылка'}
								name={fields.SOURCE}
								value={this.state.data.source}
								onValueChange={this.handleValueChange}
								errors={this.state.validation?.source?.result}
							/>
							<SelectInput
								label={'Категория'}
								name={fields.CATEGORY}
								value={this.state.data.category}
								onValueChange={this.handleValueChange}
								errors={this.state.validation?.category?.result}
								options={options}
							/>
							<TextArea
								label={'Текст'}
								name={fields.TEXT}
								value={this.state.data.text}
								onValueChange={this.handleValueChange}
								errors={this.state.validation?.text?.result || []}
							/>
						</div> :
						<div>
							<TextInput
								label={'Название файла'}
								name={fields.NAME}
								value={this.state.data.name}
								onValueChange={this.handleValueChange}
								errors={this.state.validation?.name?.result}
							/>
						</div>
					}

					<div className="editor-form-btn">
						<button
							className={'btn btn-primary'}
							type={'submit'}
							disabled={_.isEqual(this.state.data, this.state.source)}
						>
							{'Сохранить'}
						</button>
						{
							this.props.action === action.DATA ?
								<button
									className={'btn btn-danger'}
									type={'button'}
									onClick={this.handleDeleteButtonClick}>
									{'Удалить'}
								</button> : ''
						}
					</div>
				</form>
			</div>
		);
	}
}

export default Editor;