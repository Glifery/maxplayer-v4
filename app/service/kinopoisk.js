class Kinopoisk {
    constructor() {
    }

    getInfoById (id) {
        // let url = encodeURIComponent(`https://www.kinopoisk.ru/film/${id}/`);
        let url = encodeURIComponent(`https://serverless.com/`);

        $
            .get(`https://drw4u0btwd.execute-api.eu-central-1.amazonaws.com/dev/corsproxy?url=${url}`)
            .done(response => {
                console.log(response);

                let $response = $($.parseHTML(response));

                // let text = $response.find('#headerFilm').find('.moviename-big').text();
                let text = $response.find('#base').find('._1OGyB').text();

                console.log(text);
                $('h1').html(text);
            })
        ;
    }
}