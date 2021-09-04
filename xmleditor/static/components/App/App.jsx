import './App.css';
import Header from '../Header/Header';
import Repository from '../Repository/Repository';
import Editor from '../Editor/Editor';
import action from '../../js/action';
import RepositoryTools from '../RepositoryTools/RepositoryTools';
import Pagination from '../Pagination/Pagination';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			files: {
				total: 0,
				result: [],
				all: [],
			},
			action: action.NONE,
			editor: {},
			view: {
				searchBy: 'name',
				search: '',
				sortBy: 'name',
				sortValue: 'desc',
				page: 1,
				limit: 5,
				fullMatch: false,
				matchCase: false,
			},
			pagination: {
				page: 1,
				total: 0,
				limit: 5,
			},
			message: {},
			data: {},
		};

		this.handleFileClick = this.handleFileClick.bind(this);
		this.handleEditorClose = this.handleEditorClose.bind(this);
		this.handleSettingChange = this.handleSettingChange.bind(this);
		this.handleFileAdd = this.handleFileAdd.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.handleToolsButtonClick = this.handleToolsButtonClick.bind(this);
		this.showMessage = this.showMessage.bind(this);
		this.handleFileAdded = this.handleFileAdded.bind(this);
		this.handleFileDeleted = this.handleFileDeleted.bind(this);
		this.handleFormSubmited = this.handleFormSubmited.bind(this);

		this.searchFiles();
	}

	searchFiles() {
		const {
			page,
			limit,
			search,
			sortBy,
			sortValue,
			fullMatch,
			matchCase,
			searchBy,
		} = this.state.view;

		function encodeParams(params) {
			return '?' + Object
				.keys(params)
				.map(function (key) {
					return key + '=' + encodeURIComponent(params[key]);
				})
				.join('&');
		}

		const url = `/api/files${encodeParams(
			{
				page,
				search,
				limit,
				sort_by: sortBy,
				sort_val: sortValue,
				full_match: fullMatch,
				match_case: matchCase,
				search_by: searchBy,
			}
		)}`;

		fetch(url)
			.then(res => res.json())
			.then(res => {
				const view = this.state.view;
				const files = this.state.files;
				const pagination = this.state.pagination;

				view.page = res.page;
				pagination.page = res.page;

				files.total = res.total;
				pagination.total = res.total;

				files.result = res.records.map(r => ({name: r, isSelected: false}));
				pagination.limit = res.limit;

				files.all = res.all;

				this.setState({files, view});
			});
	}

	handleSettingChange(prop, val) {
		const view = {...this.state.view};
		view[prop] = val;
		this.setState({view});
	}

	handleFileAdd() {
		if (this.state.action === action.ADD)
			return;

		const files = this.state.files;

		files.result.forEach(f => f.isSelected = false);

		this.setState({action: action.ADD, files, editor: {}});
	}

	handleFileClick(name) {
		const files = this.state.files;

		const selectedFile = files.result.find(f => f.name === name);

		files.result.forEach((f) => f.isSelected = false);
		selectedFile.isSelected = true;

		this.setState({editor: {name: name}, action: action.DATA, files});
	}

	handleEditorClose(source, data) {
		const isEqual = _.isEqual(source, data);
		const files = this.state.files;

		if (!isEqual) {
			const isExit = confirm('Данные не сохранены. Закрыть редактор?');

			if (!isExit)
				return;
		}

		files.result.forEach(f => f.isSelected = false);

		this.setState({editor: {}, action: action.NONE, files});
	}

	handlePageClick(page) {
		if(this.state.action !== action.NONE)
			return;

		const view = this.state.view;
		view.page = page;

		this.setState({view});

		this.searchFiles();
	}

	handleFileAdded() {
		this.setState({editor: {}, action: action.NONE});
		this.searchFiles();
	}

	handleFileDeleted(){
		this.setState({editor: {}, action: action.NONE});
		this.searchFiles();
	}

	handleToolsButtonClick(btnAction) {
		if(this.state.action !== action.NONE)
			return;

		if (btnAction === 'SEARCH')
			this.searchFiles();
		else if (btnAction === 'RESET') {
			let view = this.state.view;
			view = {...view, ...{limit: 5, sortBy: 'name', sortValue: 'desc', search: ''}};
			this.setState({view});
		}
	}

	handleFormSubmited(srcName, newName){
		const files = this.state.files;
		const openedFile = files.result.find(f => f.name === srcName);

		if(openedFile){
			openedFile.name = newName;
			this.setState({files});
		}
	}

	showMessage(text, type){
		this.setState({message: {text, type}});
		document.getElementById('app-header').scrollIntoView();

		let clearMessage = () => {this.setState({message: {}});};

		clearMessage = clearMessage.bind(this);

		setTimeout(clearMessage, 5000);
	}

	render() {
		return (
			<div className="app-container">
				{<Header/>}
				<div className="app-body">
					<div className={`message-container ${this.state.message.text ? 'shown' : 'hidden'}`}>
						<span className={`message ${this.state.message.type ?? ''}`}>
							{this.state.message.text}
						</span>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<RepositoryTools
									view={this.state.view}
									onSettingChange={this.handleSettingChange}
									onButtonClick={this.handleToolsButtonClick}
								/>
							</div>
							<div className={'col-3'}>
								<div className={'repository'}>
									<Repository
										files={this.state.files.result}
										onFileClick={this.handleFileClick}
										onFileAdd={this.handleFileAdd}
										appAction={this.state.action}
									/>
									{this.state.files.result.length > 0 ?
										<Pagination
											pagination={this.state.pagination}
											onPageClick={this.handlePageClick}
										/> : ''
									}
								</div>
							</div>
							<div className="col-9">
								{[action.DATA, action.ADD].includes(this.state.action) ?
									<Editor
										name={this.state.editor.name}
										allFiles={this.state.files.all}
										onEditorClose={this.handleEditorClose}
										action={this.state.action}
										showMessage={this.showMessage}
										onFileAdded={this.handleFileAdded}
										onFileDeleted={this.handleFileDeleted}
										onFormSubmited={this.handleFormSubmited}
									/> : ''}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;