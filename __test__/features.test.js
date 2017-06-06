import translate from '../src/translator'

describe('translater basic features', () => {
  const dictionary = {
    key_1: "First text",
    key_2: [ "$count", " ", [ "hour", "hours"] ]
  }

  beforeEach(function(){
    spyOn(console, 'error')
  })

  it('should return key If we want to see keys without translate', () => {
    expect( translate(dictionary, 'keys', 'key_1')).toEqual( "key_1" )
  })

  it('should throw error if dictionary is null', () => {
    expect( translate(null, 'en', 'key_1')).toEqual( "<i18n Error>" )
    expect(console.error).toHaveBeenCalled()
  })

  it('should throw error if dictionary have not key', () => {
    expect( translate(dictionary, 'en', 'non_key')).toEqual( "<No non_key key for en>" )
    expect(console.error).toHaveBeenCalled()
  })

  it('should return full value without number', () => {
    expect( translate(dictionary, 'en', 'key_2')).toEqual( [ "$count", " ", [ "hour", "hours"] ] )
  })

  it('should return plural form with number', () => {
    expect( translate(dictionary, 'en', 'key_2', 1)).toEqual( "1 hour" )
  })

})

describe('translater stress features', () => {

  beforeEach(function(){
    spyOn(console, 'error')
  })

  it('should throw error with bad dictionary', () => {
    let dictionary = {
      key_1: 'First text',
      key_2: 123
    }
    expect( translate(dictionary, 'en', 'key_2', 1)).toEqual( "<i18n Error: en | 123>" )
    expect(console.error).toHaveBeenCalled()
  })

  it('should return value If no need in forms, but we want to replace "$Count" with number, but $Count have no', () => {
    let dictionary = {
      key_1: 'First text',
      key_2: '123'
    }
    expect( translate(dictionary, 'en', 'key_2', 1)).toEqual( "123" )
  })

  it('should return number If no need in forms, but we want to replace "$Count" with number', () => {
    let dictionary = {
      key_1: 'First text',
      key_2: '$Count true'
    }
    expect( translate(dictionary, 'en', 'key_2', 1)).toEqual( "1 true" )
  })

})
