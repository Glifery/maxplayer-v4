class Index {
    constructor() {
        console.log('--start--');

        this.kinopoisk = new Kinopoisk();
        this.kinopoisk.getInfoById(103507);
    }
}

$(document).ready(() => {
    let index = new Index();
});