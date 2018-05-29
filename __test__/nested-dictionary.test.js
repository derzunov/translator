import translate from '../src/translator'

describe('translater nested dictionary', () => {
  const dictionary = {
    key_1: "First text",
    key_2: [ "$count", " ", [ "hour", "hours"] ],
    'level1.level2.value1': 'first level value',
    level1: {
      level1value: 'bla bla',
      level2: {
        value1: 'nested value 1',
        value2: 'nested value 2',
        value3: [ "$count", " ", [ "hour", "hours"] ]
      }
    }
  }

  it('should return first level value if exist', () => {
    expect( translate(dictionary, 'en', 'level1.level2.value1')).toEqual( "first level value" )
  })

  it('should return nested level value if non exist first level', () => {
    expect( translate(dictionary, 'en', 'level1.level2.value2')).toEqual( "nested value 2" )
  })

  it('should normal work with nested dict and plural', () => {
    expect( translate(dictionary, 'en', 'level1.level2.value3', 1)).toEqual( "1 hour" )
  })

  it('should throw error if key missing', () => {
    spyOn(console, 'error')
    expect( translate(dictionary, 'en', 'level1.level2.value')).toEqual( "<No level1.level2.value key for en>" )
    expect(console.error).toHaveBeenCalled()
  })

})
