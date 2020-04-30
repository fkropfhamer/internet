import Ufo from './ufo';

function main() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const speed = 2;

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    const ufos = [];

    for(let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const angle = Math.random() * 2 * Math.PI;

        const ufo = new Ufo(x, y, angle);

        ufos.push(ufo);
    }

    function animation() {
        window.requestAnimationFrame(animation);

        context.clearRect(0, 0, width, height);

        ufos.forEach((ufo) => {
            const otherUfos = ufos.filter(u => !Object.is(u, ufo));

            ufo.update(speed, width, height, otherUfos);
            ufo.render(context);
        });
    }

    window.requestAnimationFrame(animation);
}

main();
