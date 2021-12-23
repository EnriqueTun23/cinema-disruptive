import { CardPeli } from "../components/CardPeli/CardPeli";
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'

describe('Pruebas', () => {
    test('debe de renderizar la informacion correctame', () => {
        const item = {
            Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
            Title: 'Prueba',
            Year: '2020',
            Type: 'Article'
        }
        const wrapper = shallow(<CardPeli item={item} />)

        expect(wrapper).toMatchSnapshot();
    })
})