import translate from '../src/translator'

describe( 'translater nested dictionary', () => {
    const dictionary = {
        level1: {
            plural1: 'My cat kill [ "$count", " ", [ "mouse", "mice"] ] and [$count," ",["bird","birds"]] today',
            level2: {
                value1: 'nested value 1',
                value2: 'nested value 2',
                value3: [ '$count', ' ', [ 'hour', 'hours' ] ]
            }
        }
    }

    it( 'should return plural form in string', () => {
        expect( translate( dictionary, 'en', 'level1.plural1', 1, 2 ) ).toEqual( 'My cat kill 1 mouse and 2 birds today' )
    } )

} )
