import translate from '../src/translator'

describe('translater nested dictionary', () => {
  const dictionary = {
    level1: {
      plural1: 'bla bla [ "$count", " ", [ "hour", "hours"] ] foo foo',
      level2: {
        value1: 'nested value 1',
        value2: 'nested value 2',
        value3: [ "$count", " ", [ "hour", "hours"] ]
      }
    }
  }

  it('should return plural form in string', () => {
    expect( translate(dictionary, 'en', 'level1.plural1', 1)).toEqual( "bla bla 1 hour foo foo" )
  })

})
