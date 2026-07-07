const $ = (s) => document.querySelector(s);

const {
    profile,
    typing,
    quotes,
    social,
    gaming,
    downloads
} = DATA;

/* ========= PROFILE ========= */

$("#avatar").src = profile.avatar;
$("#name").textContent = profile.name;
$("#status").textContent = profile.status;
$("#year").textContent = new Date().getFullYear();

const about = $("#about");

profile.about.forEach(item => {

    about.innerHTML += `
        <div class="aboutItem">
            <span>${item[0]}</span>
            <b>${item[1]}</b>
        </div>
    `;

});

/* ========= TYPING ========= */

const typingEl = $("#typing");

let word = 0;
let char = 0;
let deleting = false;

function typingEffect() {

    const text = typing[word];

    typingEl.textContent = text.substring(0, char);

    if (!deleting) {

        char++;

        if (char > text.length) {

            deleting = true;

            return setTimeout(typingEffect, 1400);

        }

    } else {

        char--;

        if (char === 0) {

            deleting = false;
            word = (word + 1) % typing.length;

        }

    }

    setTimeout(typingEffect, deleting ? 45 : 90);

}

typingEffect();

/* ========= QUOTE ========= */

$("#quote").textContent =
`"${quotes[Math.floor(Math.random()*quotes.length)]}"`;

/* ========= SOCIAL ========= */

const socialBox = $("#social");

social.forEach(item => {

    socialBox.innerHTML += `
    <a class="linkCard" href="${item.url}" target="_blank">

        <div class="icon">
            <i data-lucide="${item.icon}"></i>
        </div>

        <div class="info">
            <b>${item.name}</b>
            <span>${item.desc}</span>
        </div>

        <i data-lucide="chevron-right"></i>

    </a>
    `;

});

/* ========= GAMING ========= */

const gamingBox = $("#gaming");

gaming.forEach(item => {

    gamingBox.innerHTML += `
    <div class="gameCard">

        <div class="icon">
            <i data-lucide="${item.icon}"></i>
        </div>

        <div class="info">
            <b>${item.game}</b>
            <span>Username : ${item.username}</span>
            <span>ID : ${item.id}</span>
        </div>

        <button
            class="copyBtn"
            data-copy="${item.id}">
            Copy
        </button>

    </div>
    `;

});

/* ========= DOWNLOAD ========= */

const downloadBox = $("#downloads");

downloads.forEach(item => {

    downloadBox.innerHTML += `
    <a class="downloadCard"
       href="${item.url}"
       target="_blank">

        <div class="icon">
            <i data-lucide="${item.icon}"></i>
        </div>

        <div class="info">
            <b>${item.name}</b>
            <span>${item.version}</span>
        </div>

        <button class="downloadBtn">
            Download
        </button>

    </a>
    `;

});

/* ========= COPY ========= */

document.addEventListener("click", e => {

    if (!e.target.classList.contains("copyBtn")) return;

    navigator.clipboard.writeText(
        e.target.dataset.copy
    );

    e.target.textContent = "Copied ✓";

    setTimeout(() => {

        e.target.textContent = "Copy";

    }, 1500);

});

/* ========= CLOCK ========= */

function clock() {

    const now = new Date();

    $("#clock").textContent =
    now.toLocaleTimeString("id-ID");

    $("#date").textContent =
    now.toLocaleDateString("id-ID", {

        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    });

}

clock();

setInterval(clock, 1000);

/* ========= LOADER ========= */

window.addEventListener("load", () => {

    setTimeout(() => {

        $("#loader").style.opacity = "0";

        setTimeout(() => {

            $("#loader").style.display = "none";

        }, 500);

    }, 1800);

});

/* ========= SPOTLIGHT ========= */

const light = $("#spotlight");

document.addEventListener("pointermove", e => {

    light.style.left = (e.clientX - 125) + "px";
    light.style.top = (e.clientY - 125) + "px";

});

/* ========= PARTICLES ========= */

const canvas = $("#particles");
const ctx = canvas.getContext("2d");

function resize() {

    canvas.width = innerWidth;
    canvas.height = innerHeight;

}

resize();

addEventListener("resize", resize);

const stars = [];

for (let i = 0; i < 70; i++) {

    stars.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        v: .2 + Math.random() * .4

    });

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,.7)";

    stars.forEach(s => {

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.v;

        if (s.y > canvas.height) {

            s.y = -5;
            s.x = Math.random() * canvas.width;

        }

    });

    requestAnimationFrame(animate);

}

animate();

/* ========= ICON ========= */

lucide.createIcons();