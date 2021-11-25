import './App.css'
import { AddUser } from './components/AddUser'
import { UsersList } from './components/UsersList'

function App() {
	return (
		<div className="app">
			<AddUser />
			<UsersList />
		</div>
	)
}

export default App
