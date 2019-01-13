import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter} from 'react-router-dom';
import * as Redux from 'redux';
import *as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuizz from './AuthorQuizz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The adventures of Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing It',
        ],
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Oliver Twist', 'David CopperField', 'A Tale of Two Cities'],
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Harry Potter saga'],
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness'],
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Carrie', 'The Shining', 'IT'],
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo And Juliet'],
    },
];

function getTurnData(authors) {
    const allBooks = authors.reduce((p, c, i) => {
        return p.concat(c.books);
    } ,[]);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);
    return {
        books:fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    };
}


function reducer(state= { authors, turnData: getTurnData(authors), highlight:''}, action) {
    switch(action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong' });
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors),
            });
        case 'ADD_AUTHOR':
            console.log(action.author);
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author]),
            });
        default: return state;
    }
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <BrowserRouter basename={'/'}>
        <ReactRedux.Provider store= {store}>
            <React.Fragment>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={AuthorQuizz} />
                <Route path={`${process.env.PUBLIC_URL}/add`} component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
