import translate from '../src/translator'

describe('translater Russian', () => {

  const dictionaryRU = {
    key_1: "Первый текст",
    key_2: [ "$count", " ", [ "кошка", "кошки", "кошек" ] ]
  }

  it('should translate simple form', () => {
      expect( translate(dictionaryRU, 'ru', 'key_1')).toEqual( "Первый текст" )
  })

  it('should translate plural form with count 1', () => {
      expect( translate(dictionaryRU, 'ru', 'key_2', 1)).toEqual( "1 кошка" )
  })

  it('should translate plural form with count 3', () => {
      expect( translate(dictionaryRU, 'ru', 'key_2', 3)).toEqual( "3 кошки" )
  })

  it('should translate plural form with count 7', () => {
      expect( translate(dictionaryRU, 'ru', 'key_2', 7)).toEqual( "7 кошек" )
  })
})

describe('translater Polish', () => {

  const dictionaryPL = {
    key_1: "Prosze, dwa bilety drugiej klasy do Warszawy.",
    key_2: [ "$count", " ", [ "godzina", "godziny", "godzin" ] ]
  }

  it('should translate simple form', () => {
      expect( translate(dictionaryPL, 'pl', 'key_1')).toEqual( "Prosze, dwa bilety drugiej klasy do Warszawy." )
  })

  it('should translate plural form with count 1', () => {
      expect( translate(dictionaryPL, 'pl', 'key_2', 1)).toEqual( "1 godzina" )
  })

  it('should translate plural form with count 3', () => {
      expect( translate(dictionaryPL, 'pl', 'key_2', 3)).toEqual( "3 godziny" )
  })

  it('should translate plural form with count 31', () => {
      expect( translate(dictionaryPL, 'pl', 'key_2', 31)).toEqual( "31 godzin" )
  })
})

describe('translater English', () => {

  const dictionaryEN = {
    key_1: "First text",
    key_2: [ "$count", " ", [ "hour", "hours"] ]
  }

  it('should translate simple form', () => {
      expect( translate(dictionaryEN, 'en', 'key_1')).toEqual( "First text" )
  })

  it('should translate plural form with count 0', () => {
      expect( translate(dictionaryEN, 'en', 'key_2', 0)).toEqual( "0 hours" )
  })

  it('should translate plural form with count 1', () => {
      expect( translate(dictionaryEN, 'en', 'key_2', 1)).toEqual( "1 hour" )
  })

  it('should translate plural form with count 7', () => {
      expect( translate(dictionaryEN, 'en', 'key_2', 7)).toEqual( "7 hours" )
  })
})

describe('translater French', () => {

  const dictionaryFR = {
    key_1: "Ayant risqué une fois-on peut rester heureux toute la vie",
    key_2: [ "$count", " ", [ "heure", "heures"] ]
  }

  it('should translate simple form', () => {
      expect( translate(dictionaryFR, 'fr', 'key_1')).toEqual( "Ayant risqué une fois-on peut rester heureux toute la vie" )
  })

  it('should translate plural form with count 0', () => {
      expect( translate(dictionaryFR, 'fr', 'key_2', 0)).toEqual( "0 heure" )
  })

  it('should translate plural form with count 1', () => {
      expect( translate(dictionaryFR, 'fr', 'key_2', 1)).toEqual( "1 heure" )
  })

  it('should translate plural form with count 7', () => {
      expect( translate(dictionaryFR, 'fr', 'key_2', 7)).toEqual( "7 heures" )
  })
})
