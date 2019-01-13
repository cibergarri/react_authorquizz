import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuizz from './AuthorQuizz';
import moment from 'moment'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['The shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Oliver Twist', 'David CopperField', 'A Tale of Two Cities'],
    },
  },
  highlight: 'none',
};
const onAnswerSelected = () => {};

describe('Author Quizz', () => {
  let result;
    beforeAll(() => {
      result = new AuthorQuizz({ ...state, now: moment().toISOString(), onAnswerSelected }).render();
    });
  it('is a div', () => {
    expect(result.type).toBe('div');
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuizz {...state} onAnswerSelected />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  describe('When no answer', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuizz {...state} onAnswerSelected />)
    })
    it('should have no background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('');
    });
  });
  describe('When the wrong answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuizz {...(Object.assign({}, state, { highlight: 'wrong' }))} onAnswerSelected />);
    });
    it('should have a red background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
    });
  });
  describe('When the correct answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuizz {...(Object.assign({}, state, { highlight: 'correct' }))} onAnswerSelected />);
    });
    it('should have a red background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green');
    });
  });
  describe('When the first answer is slected', () => {
    let wrapper;
    const handleAnswerSelected= jest.fn(); //mock function
    beforeAll(() => {
      wrapper = mount(<AuthorQuizz {...state} onAnswerSelected={handleAnswerSelected} />);
      wrapper.find('.answer').first().simulate('click');
    })
    it('onAnswerSelected should be called', () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });
    it('selected answer should be the first book', () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith(state.turnData.books[0]);
    });
  });
});

describe('Testing tests :)', () => {
  describe('When testing directly', () => {
    let result;
    beforeAll(() => {
      result = new AuthorQuizz({ now: moment().toISOString(), ...state, onAnswerSelected }).render();
    });
    it('should return a value', () => {
      expect(result).not.toBeNull();
    });
    it('is a div', () => {
      expect(result.type).toBe('div');
    });
    it('has children', () => {
      expect(result.props.children).toBeTruthy();
    });
  });
  
  describe('When setting up testing', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<AuthorQuizz {...state} onAnswerSelected/>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('should pass', () => {
      expect(1+1).toBe(2);
    });
  });

  describe('When testing with Enzyme', () => {
      it('renders a div', () => {
        const wrapper = shallow(<AuthorQuizz now = {moment().toISOString()} {...state} onAnswerSelected/>);
        expect(wrapper.find('div').length).toBe(1);
      });
      it('contains Date: ', () => {
        const date = moment().toISOString();
        const wrapper = mount(<AuthorQuizz now ={date} {...state} onAnswerSelected />);
        expect(wrapper.contains(<h1>Author Quizz. Date: {date}</h1>)).toBe(true);
      });
  });
});

