import './App.css';
// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
// import components
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';


function App() {
  return (
    <ChakraProvider>
      <div className="app">
        <div className="container">
          <Header />
          <Body/>
          <Footer />
        </div>
      </div>
    </ChakraProvider>

  );
}

export default App;
