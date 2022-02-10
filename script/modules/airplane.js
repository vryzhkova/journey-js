import createElement from "./createElement.js";
import declOfNum from "./declOfNum.js";

const createCockpit = (titleText) => {
    const cockpit = createElement('div', {
        clasName: 'cockpit',
    });

    const title = createElement('h1', {
        clasName: 'cockpit-title',
        textContent: titleText,
    });

    const button = createElement('button', {
        clasName: 'cockpit-confirm',
        type: 'submit',
        textContent: 'Подтвердить',
    });

    cockpit.append(title, button);

    return cockpit;
};

const createExit = () => {
    const fuselage = createElement('div', {
        className: 'exit fuselage'
    })

    return fuselage;
}

const createBlockSeat = (n, count) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    const fuselage = createElement('ol', {
        className: 'fuselage',
    });

    for(let i = n; i < count + n; i++) {
        const wrapperRow = createElement('li');
        const seats = createElement('ol', {
            className: 'seats',
        });

        const seatsRow = letters.map((letter) => {
            const seat = createElement('li', {
                className: 'seat',
            });

            const wrapperCheck = createElement('label');

            const check = createElement('input', {
                name: 'seat',
                type: 'checkbox',
                value: `${i}${letter}`,
            });

            wrapperCheck.append(check);
            seat.append(wrapperCheck)
            return seat;
        })

        seats.append(...seatsRow);
        wrapperRow.append(seats);

        fuselage.append(wrapperRow);
    }

    return fuselage;
}

const createAirplane = (title, tourData) => {
    const scheme = tourData.scheme;
    const choisesSeat = createElement('form', {
        clasName: 'choises-seat',
    });

    const plane = createElement('fieldset', {
        clasName: 'plane',
        name: 'plane',
    });

    const cockpit = createCockpit(title);

    let n = 1;

    const elements = scheme.map((type) => {
        if(type === 'exit') {
            return createExit();
        }

        if(typeof type === 'number') {
            const blockSeat = createBlockSeat(n, type);
            n = n + type;
            return blockSeat;
        }

    });

    plane.append(cockpit, ...elements);
    choisesSeat.append(plane);

    return choisesSeat;
};

const checkSeat = (form, data) => {
    form.addEventListener('change', () => {
        const formData = new FormData(form);
        const checked = [...formData].map(([, value]) => value);

        if(checked.length === data.length) {
            [...form].forEach(item => {
                if(item.checked === false && item.name === 'seat') {
                    item.disabled === true;
                }
            })
        }
    });

    form.addEventListener('submit', () => {
        event.preventDefault();
        const formData = new FormData(form);

        const booking = [...formData].map(([, value]) => value);

        for(let i = 0; i < data.length; i++) {
            data[i].seat = booking[i];
        }
        console.log(data);
    });
};

const airplane = (main, data, tourData) => {
    const title = `Выберите ${declOfNum(data.length, ['место','места', 'мест'])}`;

    const choiseForm = createAirplane(title, tourData);

    checkSeat(choiseForm, data);

    main.append(choiseForm);
};

export default airplane;