import diff from '../diff';

describe('diff', () => {
    test('empty strings', () => {
        expect(diff('', '')).toEqual(
            [],
        );
    });

    test('same words', () => {
        expect(diff('Ada ma kota', 'Ada ma kota')).toEqual(
            [
                {text: 'Ada ma kota'},
            ],
        );
    });

    test('one word added', () => {
        expect(diff('Ada ma kota', 'Ada ma ma kota')).toEqual(
            [
                {text: 'Ada ma '},
                {add: 'ma ', remove: ''},
                {text: 'kota'},
            ],
        );
    });

    test('one word removed', () => {
        expect(diff('Ada ma kota', 'Ada kota')).toEqual(
            [
                {text: 'Ada '},
                {add: '', remove: 'ma '},
                {text: 'kota'},
            ],
        );
    });

    test('word replaced', () => {
        expect(diff('Ada ma kota chyba', 'Ada ma zapomniałem co kota chyba')).toEqual(
            [
                {text: 'Ada ma '},
                {add: 'zapomniałem co ', remove: ''},
                {text: 'kota chyba'},
            ],
        );
    });

    // test('start with different letter and repeat sentence', () => {
    //     expect(diff('Love me like you do la la love me like you do', 'love me like you do la la love me like you do')).toEqual(
    //         [
    //             {
    //                 text: 'Love me like you do la la love me like you do',
    //             },
    //         ],
    //     );
    // });

    // test('special characters', () => {
    //     expect(diff('.¿¡Ada "ma" kota!?.', 'Ada ma kota')).toEqual(
    //         [
    //             {text: 'Ada ma kota'},
    //         ]
    //     );
    // });

    // test('whitespaces', () => {
    //     expect(diff('Ada             ma kota.', 'Ada ma kota')).toEqual(
    //         [
    //             {text: 'Ada ma kota'},
    //         ]
    //     );
    // });

    // test('case insensitive', () => {
    //     expect(diff('ADA Ma KoTA.', 'ada ma kota')).toEqual(
    //         [
    //             {text: 'ada ma kota'},
    //         ]
    //     );
    // });
});