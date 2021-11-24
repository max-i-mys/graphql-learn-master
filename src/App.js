import './App.css'
import { AddUser } from './components/AddUser'
import { UsersList } from './components/UsersList'
import UserProvider from './contexts/UserContext'

function App() {
	return (
		<div className="app">
			<UserProvider>
				<AddUser />
				<UsersList />
			</UserProvider>
		</div>
	)
}

export default App
