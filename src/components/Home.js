import logo from '../logo.svg';

const Home = () => {
    return (
        <div>
            <div className='row text-center'>
                <h1>
                    Home
                </h1>
            </div> 
            <div className='row'>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className='row text-center'>
                <h2>
                    React examples ...
                </h2>
                <h3>
                    with Solidity and Blockchain examples to come
                </h3>
            </div>
            <div className='row text-center'>
                <a 
                href='https://github.com/nathan-websculpt/reactsolidity_frontend'
                target='_blank'>
                    View the GitHub
                </a>
            </div> 
            <div className='row text-center'>
                <a 
                href='https://twitter.com/sculpt_web'
                target='_blank'>
                    View the Twitter
                </a>
            </div> 
        </div>
    )
}

export default Home
