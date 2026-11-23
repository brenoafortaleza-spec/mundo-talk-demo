(()=>{'use strict';const modules={"a1":function(require,exports){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordById = exports.words = exports.wordKey = void 0;
exports.lookup = lookup;
// Original examples and contextual glosses. Groups follow the existing beginner path.
// A few useful workplace senses are taught as fixed expressions, not assigned a CEFR rating.
const groups = [
    ['Cumprimentos', `hello|olá|interjeição|Hello, Mia!|Olá, Mia!
hi|oi|interjeição|Hi, I’m Leo.|Oi, eu sou Leo.
good morning|bom dia|expressão|Good morning, Ana.|Bom dia, Ana.
good afternoon|boa tarde|expressão|Good afternoon, everyone.|Boa tarde, pessoal.
good evening|boa noite (ao chegar)|expressão|Good evening. Come in.|Boa noite. Pode entrar.
good night|boa noite (ao se despedir)|expressão|Good night, Dad.|Boa noite, pai.
goodbye|tchau; até logo|interjeição|Goodbye, see you on Monday.|Tchau, até segunda.
see you|até mais|expressão|See you tomorrow!|Até amanhã!
thank you|obrigado; obrigada|expressão|Thank you for your help.|Obrigado pela ajuda.
please|por favor|advérbio|Water, please.|Água, por favor.`],
    ['Apresentações', `name|nome|substantivo|My name is Bia.|Meu nome é Bia.
first name|primeiro nome|expressão|My first name is Ana.|Meu primeiro nome é Ana.
last name|sobrenome|expressão|My last name is Lima.|Meu sobrenome é Lima.
I am|eu sou; eu estou|expressão|I am here.|Estou aqui.
nice to meet you|prazer em conhecer você|expressão|Hi, nice to meet you.|Oi, prazer em conhecer você.
from|de; vindo de|preposição|I’m from Brazil.|Sou do Brasil.
live|morar; viver|verbo|I live in Recife.|Moro no Recife.
Brazil|Brasil|nome próprio|We live in Brazil.|Moramos no Brasil.
city|cidade|substantivo|This is my city.|Esta é minha cidade.
English|inglês|substantivo|I speak English.|Eu falo inglês.`],
    ['Primeiro diálogo', `how are you|como você está?|expressão|Hi, how are you?|Oi, como você está?
fine|bem; tudo bem|adjetivo|I’m fine, thanks.|Estou bem, obrigado.
good|bom; boa|adjetivo|This is a good idea.|Esta é uma boa ideia.
tired|cansado; cansada|adjetivo|I’m tired today.|Estou cansado hoje.
yes|sim|advérbio|Yes, I can help.|Sim, posso ajudar.
no|não|advérbio|No, thank you.|Não, obrigado.
sorry|desculpe; sinto muito|expressão|Sorry, I’m late.|Desculpe, cheguei atrasado.
excuse me|com licença|expressão|Excuse me, is this your bag?|Com licença, esta é sua bolsa?
you’re welcome|de nada|expressão|You’re welcome, Ana.|De nada, Ana.
and you|e você?|expressão|I’m fine. And you?|Estou bem. E você?`],
    ['Pessoas e família', `family|família|substantivo|This is my family.|Esta é minha família.
mother|mãe|substantivo|My mother is here.|Minha mãe está aqui.
father|pai|substantivo|My father works at home.|Meu pai trabalha em casa.
sister|irmã|substantivo|My sister is a teacher.|Minha irmã é professora.
brother|irmão|substantivo|I have one brother.|Eu tenho um irmão.
child|criança; filho ou filha|substantivo|They have one child.|Eles têm um filho.
friend|amigo; amiga|substantivo|Ana is my friend.|Ana é minha amiga.
people|pessoas|substantivo|Two people are here.|Duas pessoas estão aqui.
teacher|professor; professora|substantivo|She is my teacher.|Ela é minha professora.
team|equipe; time|substantivo|Our team is small.|Nossa equipe é pequena.`],
    ['Rotina', `wake up|acordar|verbo|I wake up at seven.|Eu acordo às sete.
eat|comer|verbo|I eat at home.|Eu como em casa.
drink|beber|verbo|I drink water.|Eu bebo água.
go|ir|verbo|I go to work at eight.|Vou para o trabalho às oito.
start|começar; iniciar|verbo|We start at nine.|Começamos às nove.
finish|terminar|verbo|I finish at five.|Termino às cinco.
work|trabalhar|verbo|I work from home.|Trabalho de casa.
study|estudar|verbo|We study English.|Estudamos inglês.
breakfast|café da manhã|substantivo|Breakfast is ready.|O café da manhã está pronto.
home|casa; lar|substantivo|I’m at home today.|Estou em casa hoje.`],
    ['Objetos e lugares', `bag|bolsa; sacola|substantivo|This is my bag.|Esta é minha bolsa.
phone|telefone; celular|substantivo|Where is my phone?|Onde está meu celular?
key|chave|substantivo|The key is on the desk.|A chave está sobre a mesa.
pen|caneta|substantivo|I need a pen.|Preciso de uma caneta.
book|livro|substantivo|Open your book, please.|Abra seu livro, por favor.
desk|mesa de trabalho; escrivaninha|substantivo|My phone is on my desk.|Meu celular está na minha mesa.
door|porta|substantivo|Please close the door.|Por favor, feche a porta.
room|sala; quarto|substantivo|The room is on the left.|A sala fica à esquerda.
water|água|substantivo|Can I have some water?|Posso pegar um pouco de água?
office|escritório|substantivo|I’m at the office.|Estou no escritório.`],
    ['Números', `one|um; uma|numeral|I have one key.|Tenho uma chave.
two|dois; duas|numeral|Two cups, please.|Duas xícaras, por favor.
three|três|numeral|We have three desks.|Temos três mesas.
four|quatro|numeral|There are four people.|Há quatro pessoas.
five|cinco|numeral|I finish at five.|Termino às cinco.
six|seis|numeral|The shop opens at six.|A loja abre às seis.
seven|sete|numeral|I wake up at seven.|Acordo às sete.
eight|oito|numeral|We start at eight.|Começamos às oito.
nine|nove|numeral|The call is at nine.|A ligação é às nove.
ten|dez|numeral|I need ten minutes.|Preciso de dez minutos.`],
    ['Datas e horários', `today|hoje|advérbio|Are you free today?|Você está livre hoje?
tomorrow|amanhã|advérbio|See you tomorrow.|Até amanhã.
Monday|segunda-feira|substantivo|We start on Monday.|Começamos na segunda-feira.
Friday|sexta-feira|substantivo|I’m free on Friday.|Estou livre na sexta-feira.
morning|manhã|substantivo|I work in the morning.|Trabalho de manhã.
afternoon|tarde|substantivo|The class is in the afternoon.|A aula é à tarde.
time|hora; horário|substantivo|What time is your class?|Que horas é sua aula?
hour|hora (duração)|substantivo|The class is one hour long.|A aula dura uma hora.
minute|minuto|substantivo|Wait one minute, please.|Espere um minuto, por favor.
date|data|substantivo|What’s the date today?|Qual é a data de hoje?`],
    ['Ajuda e esclarecimento', `help|ajudar|verbo|Can you help me?|Você pode me ajudar?
repeat|repetir|verbo|Can you repeat that?|Você pode repetir isso?
again|de novo; novamente|advérbio|Can we try again?|Podemos tentar de novo?
slowly|devagar|advérbio|Please speak slowly.|Por favor, fale devagar.
speak|falar|verbo|Do you speak English?|Você fala inglês?
understand|entender|verbo|I don’t understand.|Não entendo.
question|pergunta|substantivo|I have a question.|Tenho uma pergunta.
answer|resposta|substantivo|I know the answer.|Eu sei a resposta.
wait|esperar|verbo|Wait here, please.|Espere aqui, por favor.
mean|significar; querer dizer|verbo|What does this word mean?|O que esta palavra significa?`],
    ['Trabalho e atendimento', `job|emprego; trabalho|substantivo|I have a new job.|Tenho um emprego novo.
customer|cliente|substantivo|The customer is here.|O cliente está aqui.
shop|loja|substantivo|I work in a shop.|Trabalho em uma loja.
open|abrir|verbo|We open at nine.|Abrimos às nove.
close|fechar|verbo|Please close the door.|Por favor, feche a porta.
order|pedido|substantivo|Your order is ready.|Seu pedido está pronto.
ready|pronto; pronta|adjetivo|Are you ready?|Você está pronto?
need|precisar|verbo|I need your name.|Preciso do seu nome.
available|disponível|adjetivo|I’m available at ten.|Estou disponível às dez.
shift|turno|substantivo|My shift starts at nine.|Meu turno começa às nove.`],
    ['Reuniões e mensagens', `meeting|reunião|substantivo|Our meeting is at ten.|Nossa reunião é às dez.
call|ligação|substantivo|I have a call at two.|Tenho uma ligação às duas.
message|mensagem|substantivo|I got your message.|Recebi sua mensagem.
email|e-mail|substantivo|Please check your email.|Por favor, confira seu e-mail.
send|enviar|verbo|Send me the link, please.|Envie o link para mim, por favor.
receive|receber|verbo|Did you receive my message?|Você recebeu minha mensagem?
link|link|substantivo|Open the link, please.|Abra o link, por favor.
join|participar de; entrar em|verbo|Can you join the call?|Você pode participar da chamada?
online|on-line; pela internet|adjetivo / advérbio|The meeting is online.|A reunião é on-line.
appointment|compromisso marcado; consulta|substantivo|I have an appointment at three.|Tenho um compromisso marcado às três.`],
    ['Instruções simples', `read|ler|verbo|Read the message first.|Leia a mensagem primeiro.
write|escrever|verbo|Write your name here.|Escreva seu nome aqui.
listen|escutar|verbo|Listen to the question.|Escute a pergunta.
choose|escolher|verbo|Choose one answer.|Escolha uma resposta.
check|verificar; conferir|verbo|Check the date, please.|Confira a data, por favor.
click|clicar|verbo|Click the link.|Clique no link.
left|esquerda|substantivo|The door is on the left.|A porta fica à esquerda.
right|direita|substantivo|The desk is on the right.|A mesa fica à direita.
here|aqui|advérbio|Please sit here.|Por favor, sente-se aqui.
address|endereço|substantivo|What’s your address?|Qual é seu endereço?`],
];
const otherSenses = {
    work: [{ pt: 'trabalho', kind: 'substantivo', enExample: 'I’m at work now.', ptExample: 'Estou no trabalho agora.' }],
    book: [{ pt: 'reservar; marcar', kind: 'verbo', enExample: 'Can I book a room?', ptExample: 'Posso reservar um quarto?' }],
    right: [{ pt: 'correto; certa', kind: 'adjetivo', enExample: 'That’s the right answer.', ptExample: 'Essa é a resposta certa.' }],
    call: [{ pt: 'ligar para; telefonar', kind: 'verbo', enExample: 'Please call me at six.', ptExample: 'Por favor, me ligue às seis.' }],
    order: [{ pt: 'pedir (comida ou produto)', kind: 'verbo', enExample: 'Can I order now?', ptExample: 'Posso fazer o pedido agora?' }],
    open: [{ pt: 'aberto; aberta', kind: 'adjetivo', enExample: 'The shop is open.', ptExample: 'A loja está aberta.' }],
    help: [{ pt: 'ajuda', kind: 'substantivo', enExample: 'I need help.', ptExample: 'Preciso de ajuda.' }],
    answer: [{ pt: 'responder', kind: 'verbo', enExample: 'Can you answer the phone?', ptExample: 'Você pode atender o telefone?' }],
    time: [{ pt: 'tempo', kind: 'substantivo', enExample: 'I don’t have time today.', ptExample: 'Não tenho tempo hoje.' }],
};
const wordKey = (s) => s.toLowerCase().trim().replace(/[’‘]/g, "'").replace(/[?!.,:;]+$/g, '').replace(/\s+/g, ' ');
exports.wordKey = wordKey;
exports.words = groups.flatMap(([group, block]) => block.split('\n').map(line => {
    const [en, pt, kind, enExample, ptExample] = line.split('|');
    const id = (0, exports.wordKey)(en).replace(/'/g, '').replace(/ /g, '-');
    return { id, en, group, senses: [{ pt, kind, enExample, ptExample }, ...(otherSenses[id] ?? [])] };
}));
exports.wordById = new Map(exports.words.map(w => [w.id, w]));
function lookup(query, only = null) {
    const key = (0, exports.wordKey)(query);
    const saved = only && new Set(only);
    return exports.words.filter(w => (!saved || saved.has(w.id)) && (!key || (0, exports.wordKey)(w.en).includes(key)))
        .sort((a, b) => Number((0, exports.wordKey)(b.en) === key) - Number((0, exports.wordKey)(a.en) === key) || Number((0, exports.wordKey)(b.en).startsWith(key)) - Number((0, exports.wordKey)(a.en).startsWith(key)))
        .slice(0, only ? exports.words.length : 14);
}
},"study":function(require,exports){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyStorageKey = exports.freshVocabulary = void 0;
exports.dateKey = dateKey;
exports.readVocabulary = readVocabulary;
exports.toggleSaved = toggleSaved;
exports.toggleOptIn = toggleOptIn;
exports.configure = configure;
exports.startVocabulary = startVocabulary;
exports.finishCard = finishCard;
const a1_ts_1 = require("./a1.ts");
const freshVocabulary = () => ({ saved: [], optIn: [], reviews: {}, newGoal: 10, reviewGoal: 5, session: null });
exports.freshVocabulary = freshVocabulary;
const vocabularyStorageKey = (scope) => 'mundo-talk-vocabulary-v1:' + scope;
exports.vocabularyStorageKey = vocabularyStorageKey;
function dateKey(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
const limits = (n, max, fallback) => typeof n === 'number' && Number.isInteger(n) && n >= 0 && n <= max ? n : fallback;
const ids = (v) => Array.isArray(v) ? [...new Set(v.filter((id) => typeof id === 'string' && a1_ts_1.wordById.has(id)))] : [];
const validDay = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
function readVocabulary(raw) {
    try {
        const v = JSON.parse(raw ?? 'null');
        if (!v || typeof v !== 'object')
            return (0, exports.freshVocabulary)();
        const saved = ids(v.saved), optIn = ids(v.optIn).filter(id => saved.includes(id));
        const reviews = {};
        for (const { id } of a1_ts_1.words) {
            const r = v.reviews?.[id];
            if (r && validDay(r.due))
                reviews[id] = { due: r.due, step: limits(r.step, 4, 0), lapses: limits(r.lapses, 1000, 0) };
        }
        const s = v.session, valid = Array.isArray(s?.cards) && s.cards.length <= 30 && s.cards.every((c) => c && a1_ts_1.wordById.has(c.id) && typeof c.learn === 'boolean');
        const session = valid && validDay(s.day) ? { day: s.day, cards: s.cards, cursor: limits(s.cursor, s.cards.length, 0) } : null;
        return { saved, optIn, reviews, session, newGoal: limits(v.newGoal, 10, 10), reviewGoal: limits(v.reviewGoal, 10, 5) };
    }
    catch {
        return (0, exports.freshVocabulary)();
    }
}
function toggleSaved(s, id) {
    if (!a1_ts_1.wordById.has(id))
        return s;
    return s.saved.includes(id) ? { ...s, saved: s.saved.filter(x => x !== id), optIn: s.optIn.filter(x => x !== id) } : { ...s, saved: [...s.saved, id] };
}
function toggleOptIn(s, id) {
    if (!s.saved.includes(id))
        return s;
    return { ...s, optIn: s.optIn.includes(id) ? s.optIn.filter(x => x !== id) : [...s.optIn, id] };
}
function configure(s, newGoal, reviewGoal) {
    return { ...s, newGoal: limits(newGoal, 10, s.newGoal), reviewGoal: limits(reviewGoal, 10, s.reviewGoal) };
}
function startVocabulary(s, now = new Date()) {
    const today = dateKey(now);
    if (s.session?.cards.length && (s.session.day === today || s.session.cursor < s.session.cards.length))
        return s;
    const due = Object.entries(s.reviews).filter(([, r]) => r.due <= today).sort(([, a], [, b]) => b.lapses - a.lapses || a.due.localeCompare(b.due)).slice(0, s.reviewGoal);
    const cards = due.map(([id]) => ({ id, learn: false }));
    const newIds = [...new Set([...s.optIn, ...a1_ts_1.words.map(w => w.id)])].filter(id => !s.reviews[id]).slice(0, (now.getDay() === 0 || now.getDay() === 6) && due.length ? 0 : s.newGoal);
    for (let i = 0; i < newIds.length; i += 3) {
        const batch = newIds.slice(i, i + 3);
        cards.push(...batch.map(id => ({ id, learn: true })), ...batch.map(id => ({ id, learn: false })));
    }
    return { ...s, session: { day: today, cards, cursor: 0 } };
}
const intervals = [1, 3, 7, 14, 30];
function finishCard(s, id, remembered, now = new Date()) {
    const session = s.session, card = session?.cards[session.cursor];
    if (!session || card?.id !== id || card.learn !== (remembered === undefined))
        return s;
    const next = { ...s, session: { ...session, cursor: session.cursor + 1 } };
    if (card.learn)
        return next;
    const old = s.reviews[id];
    const step = remembered ? old ? Math.min(4, old.step + 1) : 1 : 0;
    const due = new Date(now);
    due.setDate(due.getDate() + intervals[step]);
    const lapses = remembered ? Math.max(0, (old?.lapses ?? 0) - 1) : Math.min(1000, (old?.lapses ?? 0) + 1);
    return { ...next, reviews: { ...s.reviews, [id]: { due: dateKey(due), step, lapses } } };
}
},"audio":function(require,exports){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyAudio = vocabularyAudio;
function vocabularyAudio(report) {
    let current;
    let player;
    const stop = () => { current?.abort(); current = undefined; };
    const start = () => { stop(); current = new AbortController(); report('Preparando áudio…'); return current.signal; };
    function clip(media, signal) {
        return new Promise(resolve => {
            const finish = (result) => {
                if (done)
                    return;
                done = true;
                clearTimeout(timer);
                media.onended = null;
                media.onerror = null;
                signal.removeEventListener('abort', abort);
                if (result !== 'ok')
                    media.pause();
                resolve(result);
            };
            let done = false;
            const abort = () => finish('unavailable');
            const rejected = (error) => finish(error instanceof Error && error.name === 'NotAllowedError' ? 'blocked' : 'unavailable');
            const timer = setTimeout(abort, 16000);
            signal.addEventListener('abort', abort, { once: true });
            media.onended = () => finish('ok');
            media.onerror = abort;
            try {
                media.currentTime = 0;
                void media.play().catch(rejected);
            }
            catch (error) {
                rejected(error);
            }
        });
    }
    async function play(word, rate, bilingual) {
        const signal = start();
        // One tap starts one complete file; no device speech engine or autoplay is needed.
        const media = player ??= new Audio();
        const path = (bilingual ? './audio-neural/' : './audio/') + encodeURIComponent(word.id) + '.mp3';
        if (media.getAttribute('src') !== path)
            media.src = path;
        media.playbackRate = rate;
        media.preservesPitch = true;
        const result = await clip(media, signal);
        if (signal.aborted)
            return;
        report(result === 'blocked' ? 'O navegador bloqueou a reprodução. Toque no botão de áudio para tentar novamente.' :
            result === 'unavailable' ? 'O áudio não carregou. Confira a conexão e toque para tentar novamente.' :
                'Áudio concluído. Você pode ouvir de novo.');
    }
    return { stop, play };
}
},"daily":function(require,exports){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyPracticeMessage = emptyPracticeMessage;
const a1_ts_1 = require("./a1.ts");
const study_ts_1 = require("./study.ts");
function emptyPracticeMessage(state) {
    const today = (0, study_ts_1.dateKey)();
    const hasNew = a1_ts_1.words.some(({ id }) => !state.reviews[id]);
    const dates = Object.values(state.reviews).map(r => r.due).sort();
    if (state.newGoal === 0 && state.reviewGoal === 0)
        return 'Suas duas metas estão em zero. Ajuste a meta e verifique as palavras disponíveis.';
    if (state.newGoal === 0 && hasNew)
        return 'Não há revisão na sessão. Sua meta de palavras novas está em zero. Ajuste a meta para praticar palavras novas.';
    if (state.reviewGoal === 0 && dates.length)
        return 'Todas as palavras já foram apresentadas. Ajuste sua meta de revisões para praticá-las novamente.';
    const next = dates.find(d => d > today);
    return next ? 'Nenhuma revisão está prevista para hoje. Próxima revisão: ' + next.split('-').reverse().join('/') + '.' : 'Não há palavras disponíveis agora. Volte mais tarde para revisar.';
}
},"listening":function(require,exports){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markHeard = markHeard;
exports.openListening = openListening;
const a1_ts_1 = require("./a1.ts");
const study_ts_1 = require("./study.ts");
const daily_ts_1 = require("./daily.ts");
const PAUSE_MS = 1200;
const esc = (s) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const b = (action, label, extra = '') => `<button type="button" data-listen="${action}" ${extra}>${label}</button>`;
function markHeard(s, index, mark, now = new Date()) {
    const card = s.session?.cards[index];
    if (!card || index !== s.session?.cursor)
        return s;
    if (card.learn)
        return (0, study_ts_1.finishCard)(s, card.id, undefined, now);
    if (mark !== 'heard')
        return (0, study_ts_1.finishCard)(s, card.id, mark === 'remember', now);
    // An ungraded listen is practice, never proof the learner recalled the word.
    const next = (0, study_ts_1.finishCard)(s, card.id, false, now), old = s.reviews[card.id];
    return { ...next, reviews: { ...next.reviews, [card.id]: { ...next.reviews[card.id], step: old?.step ?? 0, lapses: old?.lapses ?? 0 } } };
}
function readQueue(raw, s) {
    const session = s.session;
    const key = session ? JSON.stringify([session.day, session.cards]) : '';
    const cursor = session?.cursor ?? 0, max = session?.cards.length ?? 0;
    const clean = { key, current: cursor, heard: {} };
    try {
        const old = JSON.parse(raw ?? 'null');
        if (old?.key !== key)
            return clean;
        if (Number.isInteger(old.current) && old.current >= 0 && old.current < max && cursor < max)
            clean.current = old.current;
        for (let i = cursor; i < max; i++)
            if (['heard', 'remember', 'again'].includes(old.heard?.[i]))
                clean.heard[i] = old.heard[i];
    }
    catch { }
    return clean;
}
function openListening(parent, scope, onClose = () => { }) {
    const title = 'Escute e Memorize';
    const target = document.createElement('dialog');
    target.className = 'mt-vocabulary mt-listen';
    target.setAttribute('aria-labelledby', 'mt-listen-title');
    const initiator = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    parent.append(target);
    const key = (0, study_ts_1.vocabularyStorageKey)(scope), queueKey = key + ':player';
    let raw = null, qRaw = null, canSave = true;
    try {
        raw = localStorage.getItem(key);
        qRaw = localStorage.getItem(queueKey);
    }
    catch {
        canSave = false;
    }
    let state = raw === null ? (0, study_ts_1.freshVocabulary)() : (0, study_ts_1.readVocabulary)(raw), queue = readQueue(qRaw, state);
    let begun = false, running = false, gap = false, slow = false, error = '', rating = 'heard', turn = 0;
    let timer, player;
    const card = () => begun ? state.session?.cards[queue.current] : undefined;
    const pending = () => !!state.session && state.session.cursor < state.session.cards.length;
    function save() {
        try {
            localStorage.setItem(queueKey, JSON.stringify(queue));
            localStorage.setItem(key, JSON.stringify(state));
        }
        catch {
            canSave = false;
        }
    }
    function flush() {
        while (state.session && queue.heard[state.session.cursor]) {
            const cursor = state.session.cursor;
            state = markHeard(state, cursor, queue.heard[cursor]);
            delete queue.heard[cursor];
        }
    }
    function stop(keepClip = false) {
        turn++;
        if (timer !== undefined)
            clearTimeout(timer);
        timer = undefined;
        running = false;
        if (player) {
            player.onended = null;
            player.onerror = null;
            player.pause();
            if (!keepClip && player.currentTime)
                player.currentTime = 0;
        }
        if (!keepClip) {
            gap = false;
            rating = 'heard';
        }
    }
    const header = `<header class="mt-v-heading"><h2 id="mt-listen-title" tabindex="-1">${title}</h2>${b('close', 'Fechar')}</header>`;
    function settings() {
        return `<details class="mt-listen-settings"><summary>Configurações</summary><div class="mt-v-row"><label>Novas por dia<input type="number" inputmode="numeric" min="0" max="10" data-l-goal="new" value="${state.newGoal}"></label><label>Revisões por dia<input type="number" inputmode="numeric" min="0" max="10" data-l-goal="review" value="${state.reviewGoal}"></label></div>${b('goals', 'Salvar meta')}<p data-l-goal-status role="status"></p></details>`;
    }
    function render(focus) {
        const previous = target.contains(document.activeElement) ? document.activeElement?.dataset?.listen : undefined;
        const warning = canSave ? '' : '<p role="alert">Não foi possível salvar o progresso neste navegador.</p>';
        const c = card(), s = state.session;
        if (!c || !s) {
            const message = begun ? (s?.cards.length ? 'Sessão concluída. Até a próxima!' : (0, daily_ts_1.emptyPracticeMessage)(state)) : 'Dê o play e pratique no seu ritmo.';
            target.innerHTML = header + `<div class="mt-listen-intro"><span class="c-lesson-emily" role="img" aria-label="Emily"></span><p role="status">${message}</p>${!begun || !s?.cards.length ? b('start', pending() ? '▶ Retomar sessão' : begun ? '▶ Verificar palavras disponíveis' : '▶ Começar sessão', 'class="mt-listen-start"') : ''}</div>` + warning + settings();
        }
        else {
            const w = a1_ts_1.wordById.get(c.id), sense = w.senses[0];
            const done = s.cursor + Object.keys(queue.heard).length;
            const label = running ? 'Pausar' : error ? 'Tentar novamente' : 'Reproduzir';
            const reveal = c.learn || gap;
            target.innerHTML = header + `<section class="mt-listen-track" aria-label="Palavra da vez">
   <div class="mt-listen-count"><span>${c.learn ? 'Aprender' : 'Revisar'} · ${queue.current + 1} de ${s.cards.length}</span><span>${done}/${s.cards.length} ouvidas</span></div>
   <progress value="${done}" max="${s.cards.length}" aria-label="Progresso da sessão"></progress>
   <div class="mt-listen-card"><span class="c-lesson-emily" role="img" aria-label="Emily"></span><h3 lang="en" tabindex="-1">${esc(w.en)}</h3>
   ${reveal ? `<p class="mt-listen-translation" lang="pt-BR">${esc(sense.pt)}</p>${sense.enExample ? `<p class="mt-listen-example" lang="en">${esc(sense.enExample)}</p>` : ''}` : '<p class="mt-listen-translation">Lembra o significado?</p>'}</div>
   <div class="mt-listen-controls">${b('previous', '‹', 'aria-label="Palavra anterior" ' + (queue.current === 0 ? 'disabled' : ''))}
   ${b('toggle', running ? '❚❚' : '▶', `class="mt-listen-play" aria-label="${label}"`)}
   ${b('next', '›', 'aria-label="Próxima palavra" ' + (queue.current + 1 >= s.cards.length ? 'disabled' : ''))}</div>
   <div class="mt-listen-options">${b('repeat', '↻ Repetir', 'aria-label="Repetir palavra"')}${b('speed', slow ? '0,75×' : '1×', `aria-label="Velocidade: ${slow ? 'lenta' : 'normal'}" aria-pressed="${slow}"`)}</div>
   ${!c.learn && queue.current >= s.cursor && queue.heard[queue.current] === undefined && !gap ? `<details class="mt-listen-selfcheck"><summary>Como foi a revisão?</summary><div class="mt-v-row">${b('remember', 'Lembrei', `aria-pressed="${rating === 'remember'}"`)}${b('again', 'Rever amanhã', `aria-pressed="${rating === 'again'}"`)}</div></details>` : ''}
   <p class="mt-listen-status" role="status">${error || ''}</p></section>` + warning + settings();
        }
        const want = focus || previous;
        if (want)
            (target.querySelector(`[data-listen="${want}"]:not(:disabled)`) ?? target.querySelector('[data-listen="toggle"],[data-listen="start"],h2'))?.focus({ preventScroll: true });
    }
    function advance(autoplay) {
        const s = state.session;
        if (!s)
            return;
        stop();
        error = '';
        if (autoplay && s.cursor >= s.cards.length) {
            queue.current = s.cursor;
            save();
            render();
            return;
        }
        if (queue.current + 1 < s.cards.length) {
            queue.current++;
            save();
            if (autoplay)
                play();
            else
                render();
        }
        else if (pending()) {
            queue.current = s.cursor;
            error = 'Ainda há palavras para ouvir. Toque para continuar.';
            save();
            render();
        }
        else {
            queue.current = s.cursor;
            save();
            render();
        }
    }
    function play(focus) {
        const c = card();
        if (!c)
            return;
        if (gap) {
            advance(true);
            return;
        }
        const media = player ??= new Audio();
        const path = './audio-neural/' + encodeURIComponent(c.id) + '.mp3';
        if (media.getAttribute('src') !== path) {
            media.src = path;
        }
        media.playbackRate = slow ? .75 : 1;
        media.preservesPitch = true;
        const ticket = ++turn;
        running = true;
        error = '';
        const fail = (reason) => {
            if (ticket !== turn || !running || gap)
                return;
            stop(false);
            error = reason instanceof Error && reason.name === 'NotAllowedError' ? 'Toque em reproduzir para continuar.' : 'Não foi possível tocar. Toque para tentar novamente.';
            render();
        };
        media.onerror = fail;
        media.onended = () => {
            if (ticket !== turn || !running || gap)
                return;
            gap = true;
            if (state.session && queue.current >= state.session.cursor && queue.heard[queue.current] === undefined) {
                queue.heard[queue.current] = rating;
                flush();
                save();
            }
            render();
            timer = setTimeout(() => { if (ticket === turn && running)
                advance(true); }, PAUSE_MS);
        };
        try {
            void media.play().catch(fail);
        }
        catch (reason) {
            fail(reason);
        }
        render(focus);
    }
    function start() {
        const next = (0, study_ts_1.startVocabulary)(state);
        if (next.session !== state.session) {
            state = next;
            queue = readQueue(null, state);
        }
        flush();
        begun = true;
        save();
        if (card())
            play('toggle');
        else
            render();
    }
    const hidden = () => { if (document.hidden && running) {
        stop(true);
        render();
    } };
    document.addEventListener('visibilitychange', hidden);
    target.addEventListener('close', () => { stop(); document.removeEventListener('visibilitychange', hidden); target.remove(); if (initiator?.isConnected)
        initiator.focus({ preventScroll: true }); onClose(); }, { once: true });
    target.addEventListener('click', event => {
        const action = event.target.closest('[data-listen]')?.dataset.listen;
        if (!action)
            return;
        if (action === 'close') {
            target.close();
            return;
        }
        if (action === 'goals') {
            const n = target.querySelector('[data-l-goal="new"]'), r = target.querySelector('[data-l-goal="review"]'), note = target.querySelector('[data-l-goal-status]');
            if (!n?.value || !r?.value || !n.checkValidity() || !r.checkValidity()) {
                if (note)
                    note.textContent = 'Escolha números inteiros de 0 a 10.';
                return;
            }
            state = (0, study_ts_1.configure)(state, n.valueAsNumber, r.valueAsNumber);
            save();
            if (note)
                note.textContent = canSave ? 'Meta salva para a próxima sessão.' : 'Meta válida só nesta janela.';
            return;
        }
        if (action === 'start') {
            start();
            return;
        }
        if (action === 'speed') {
            slow = !slow;
            if (player)
                player.playbackRate = slow ? .75 : 1;
            render('speed');
            return;
        }
        if (action === 'remember' || action === 'again') {
            if (gap)
                return;
            rating = action;
            for (const k of ['remember', 'again'])
                target.querySelector(`[data-listen="${k}"]`)?.setAttribute('aria-pressed', String(k === rating));
            return;
        }
        if (action === 'toggle') {
            if (running) {
                stop(true);
                render('toggle');
            }
            else
                play('toggle');
            return;
        }
        if (action === 'repeat') {
            stop();
            error = '';
            play('repeat');
            return;
        }
        if (action === 'previous' && queue.current > 0) {
            const autoplay = running;
            stop();
            error = '';
            queue.current--;
            save();
            if (autoplay)
                play('previous');
            else
                render('previous');
            return;
        }
        if (action === 'next' && state.session && queue.current + 1 < state.session.cards.length)
            advance(running);
    });
    target.addEventListener('toggle', event => {
        const details = event.target;
        if (details.open && details.classList?.contains('mt-listen-settings') && running) {
            stop(true);
            const control = target.querySelector('[data-listen="toggle"]');
            if (control) {
                control.textContent = '▶';
                control.setAttribute('aria-label', 'Reproduzir');
            }
        }
    }, true);
    render();
    target.showModal();
    target.querySelector('h2')?.focus();
    return () => { if (target.open)
        target.close(); };
}
},"browser":function(require,exports){"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openVocabulary = openVocabulary;
const a1_ts_1 = require("./a1.ts");
const study_ts_1 = require("./study.ts");
const audio_ts_1 = require("./audio.ts");
const esc = (s) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const button = (label, action, id = '', extra = '') => `<button type="button" data-v-action="${action}" data-v-id="${esc(id)}" ${extra}>${label}</button>`;
function openVocabulary(parent, scope, view, query = '', onClose = () => { }, onListen) {
    const target = document.createElement('dialog');
    target.className = 'mt-vocabulary';
    target.setAttribute('aria-labelledby', 'mt-v-title');
    parent.append(target);
    const key = (0, study_ts_1.vocabularyStorageKey)(scope);
    let state = (0, study_ts_1.freshVocabulary)(), available = true;
    const pendingSession = () => !!state.session && state.session.cursor < state.session.cards.length;
    let savedOnly = false, showCard = false, revealed = false, slow = false, initiator = null;
    const audio = (0, audio_ts_1.vocabularyAudio)(message => { const status = target.querySelector('[data-v-audio]'); if (status)
        status.textContent = message; const stop = target.querySelector('[data-v-action=stop]'); if (stop)
        stop.hidden = message !== 'Preparando áudio…'; });
    function reload() { try {
        state = (0, study_ts_1.readVocabulary)(localStorage.getItem(key));
    }
    catch {
        available = false;
    } }
    reload();
    const save = (next) => { state = next; try {
        localStorage.setItem(key, JSON.stringify(state));
    }
    catch {
        available = false;
    } };
    const warning = () => available ? '' : '<p role="alert">O navegador não está salvando esta prática. Seus dados podem se perder ao fechar.</p>';
    const status = `<p class="mt-v-audio" data-v-audio role="status"></p>${button('Parar áudio', 'stop', '', 'hidden')}`;
    const controls = (id, bilingual = false) => `<div class="mt-v-row">${button(bilingual ? 'Ouvir inglês → português → inglês' : 'Ouvir pronúncia', 'audio', id, bilingual ? 'data-v-bilingual' : '')}${button('Velocidade: ' + (slow ? 'devagar' : 'normal'), 'speed', '', `aria-pressed="${slow}"`)}</div>`;
    function results() {
        const terms = (0, a1_ts_1.lookup)(query, savedOnly ? state.saved : null);
        return `${warning()}<p role="status">${terms.length ? `${terms.length} ${terms.length === 1 ? 'resultado' : 'resultados'} nesta lista.` : 'Não encontrei essa palavra no piloto.'}</p>${terms.map(w => `<section class="c-panel mt-v-entry"><h3 lang="en" tabindex="-1">${esc(w.en)}</h3><p class="c-muted">${esc(w.group)}</p><ul>${w.senses.map(s => `<li><strong>${esc(s.pt)}</strong> <small>· ${esc(s.kind)}</small><br><span lang="en">${esc(s.enExample)}</span><br><span class="c-muted">${esc(s.ptExample)}</span></li>`).join('')}</ul><div class="mt-v-row">${button('Ouvir pronúncia', 'audio', w.id, 'aria-label="Ouvir ' + esc(w.en) + '"')}${button(state.saved.includes(w.id) ? 'Remover de Minhas Palavras' : 'Salvar em Minhas Palavras', 'save', w.id, `aria-pressed="${state.saved.includes(w.id)}"`)}${state.saved.includes(w.id) ? button('Incluir na revisão diária', 'opt-in', w.id, `aria-pressed="${state.optIn.includes(w.id)}"`) : ''}</div></section>`).join('')}`;
    }
    function daily() {
        const session = state.session, card = showCard ? session?.cards[session.cursor] : undefined;
        if (card && session) {
            const w = a1_ts_1.wordById.get(card.id), sense = w.senses[0];
            return `<p class="c-muted">Etapa ${session.cursor + 1} de ${session.cards.length} · ${esc(w.group)}</p><progress max="${session.cards.length}" value="${session.cursor}" aria-label="Etapas do vocabulário"></progress><section class="c-panel"><h3 lang="en" tabindex="-1">${esc(w.en)}</h3>${card.learn || revealed ? `<p><strong>${esc(sense.pt)}</strong><br><span lang="en">${esc(sense.enExample)}</span><br><span class="c-muted">${esc(sense.ptExample)}</span></p>` : '<p>Faça uma pausa. Você lembra o significado?</p>'}${controls(w.id, card.learn)}${status}<div class="mt-v-row">${card.learn ? button('Próxima palavra', 'next', w.id) : revealed ? button('Ainda não lembrei', 'again', w.id) + button('Lembrei', 'remember', w.id) : button('Mostrar significado', 'reveal', w.id)}</div></section>`;
        }
        const finished = showCard && !!session, empty = finished && !session.cards.length;
        return `${finished ? `<p role="status">${empty ? 'Nenhuma palavra para praticar nesta sessão.' : 'Sessão concluída. Volte quando quiser; as revisões serão programadas.'}</p>` : ''}${warning()}<p>Meta padrão: 10 palavras novas e 5 revisões em cerca de cinco minutos. No sábado e domingo, só revisões. Se perder um dia, continue de onde parou.</p>${!finished ? button(pendingSession() ? 'Retomar sessão' : 'Começar sessão', 'start') : ''}<details><summary>Ajustar minha meta</summary><div class="mt-v-row"><label>Novas por dia<input type="number" inputmode="numeric" min="0" max="10" data-v-goal="new" value="${state.newGoal}"></label><label>Revisões por dia<input type="number" inputmode="numeric" min="0" max="10" data-v-goal="review" value="${state.reviewGoal}"></label></div>${button('Salvar meta', 'goals')}<p class="c-muted">As metas valem para a próxima sessão. As palavras salvas que você escolher entram primeiro, dentro da meta de novidades.</p><p data-v-goal-status role="status"></p></details>`;
    }
    function render() {
        const dictionary = view === 'dictionary';
        target.innerHTML = `<header class="mt-v-heading"><h2 id="mt-v-title" tabindex="-1">${dictionary ? 'Dicionário' : 'Escute e Memorize'}</h2>${button('Fechar', 'close')}</header><aside class="c-teacher"><span class="c-lesson-emily" role="img" aria-label="Emily, sua tutora virtual"></span><p>${dictionary ? 'Procure uma palavra em inglês. Use o exemplo para entender o sentido.' : 'Escute, repita em voz alta e tente lembrar antes de conferir.'}</p></aside><div role="group" class="mt-v-tabs" aria-label="Ferramentas de vocabulário">${button('Dicionário', 'dictionary', '', `aria-current="${dictionary ? 'page' : 'false'}"`)}${button('Escute e Memorize', 'listen', '', `aria-current="${dictionary ? 'false' : 'page'}"`)}</div>${dictionary ? `<p class="c-muted">${a1_ts_1.words.length} palavras e expressões para iniciantes. A voz em inglês é sintetizada.</p><label>Palavra em inglês<input type="search" maxlength="100" autocomplete="off" spellcheck="false" data-v-query value="${esc(query)}"></label><div class="mt-v-row">${button('Minhas Palavras', 'saved-only', '', `aria-pressed="${savedOnly}"`)}${button('Velocidade: ' + (slow ? 'devagar' : 'normal'), 'speed', '', `aria-pressed="${slow}"`)}</div>${status}<div data-v-results>${results()}</div>` : daily()}`;
    }
    const shutdown = () => { audio.stop(); document.removeEventListener('visibilitychange', hidden); target.remove(); onClose(); };
    const hidden = () => { if (document.hidden)
        stopPlayback(); };
    function stopPlayback() { audio.stop(); const stop = target.querySelector('[data-v-action=stop]'); if (stop && !stop.hidden) {
        stop.hidden = true;
        const notice = target.querySelector('[data-v-audio]');
        if (notice)
            notice.textContent = 'Áudio pausado. Toque para ouvir novamente.';
    } }
    document.addEventListener('visibilitychange', hidden);
    target.addEventListener('close', shutdown, { once: true });
    target.addEventListener('input', e => { const input = e.target; if (!input.hasAttribute('data-v-query'))
        return; query = input.value; const list = target.querySelector('[data-v-results]'); if (list)
        list.innerHTML = results(); });
    target.addEventListener('click', e => {
        const b = e.target.closest('[data-v-action]');
        if (!b)
            return;
        const { vAction: a, vId: id = '' } = b.dataset;
        const focusAction = () => Array.from(target.querySelectorAll('button[data-v-action]')).find(x => x.dataset.vAction === a && x.dataset.vId === id)?.focus({ preventScroll: true });
        if (a === 'close') {
            target.close();
            return;
        }
        if (a === 'stop') {
            stopPlayback();
            target.querySelector('[data-v-action=audio]')?.focus({ preventScroll: true });
            return;
        }
        if (a === 'audio') {
            const w = a1_ts_1.wordById.get(id);
            if (w)
                void audio.play(w, slow ? .72 : 1, b.hasAttribute('data-v-bilingual'));
            return;
        }
        if (a === 'speed') {
            slow = !slow;
            b.setAttribute('aria-pressed', String(slow));
            b.textContent = 'Velocidade: ' + (slow ? 'devagar' : 'normal');
            return;
        }
        audio.stop();
        if (a === 'goals') {
            const n = target.querySelector('[data-v-goal="new"]'), r = target.querySelector('[data-v-goal="review"]'), notice = target.querySelector('[data-v-goal-status]');
            if (!n?.value || !r?.value || !n.checkValidity() || !r.checkValidity()) {
                if (notice)
                    notice.textContent = 'Escolha números inteiros de 0 a 10.';
                return;
            }
            save((0, study_ts_1.configure)(state, n.valueAsNumber, r.valueAsNumber));
            if (notice)
                notice.textContent = available ? 'Meta salva para a próxima sessão.' : 'Meta válida só até fechar esta janela.';
            return;
        }
        if (a === 'listen' && onListen) {
            target.close();
            onListen();
            return;
        }
        if (a === 'dictionary' || a === 'listen') {
            view = a;
            render();
            target.querySelector('h2')?.focus();
            return;
        }
        if (a === 'saved-only') {
            savedOnly = !savedOnly;
            render();
            focusAction();
            return;
        }
        if (a === 'save' || a === 'opt-in') {
            save(a === 'save' ? (0, study_ts_1.toggleSaved)(state, id) : (0, study_ts_1.toggleOptIn)(state, id));
            render();
            focusAction();
            if (!target.contains(document.activeElement))
                target.querySelector('[data-v-query]')?.focus();
            return;
        }
        if (a === 'start') {
            save((0, study_ts_1.startVocabulary)(state));
            showCard = true;
            revealed = false;
        }
        if (a === 'reveal')
            revealed = true;
        if (a === 'next' || revealed && (a === 'remember' || a === 'again')) {
            save((0, study_ts_1.finishCard)(state, id, a === 'next' ? undefined : a === 'remember'));
            revealed = false;
        }
        render();
        (target.querySelector(a === 'reveal' ? '[data-v-action="again"]' : 'h3') ?? target.querySelector('h2'))?.focus({ preventScroll: true });
    });
    initiator = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    target.addEventListener('close', () => { if (initiator?.isConnected)
        initiator.focus({ preventScroll: true }); }, { once: true });
    render();
    target.showModal();
    target.querySelector('h2')?.focus();
    return () => { audio.stop(); if (target.open)
        target.close();
    else
        target.remove(); };
}
}},cache=new Map();const require=path=>{const id=path.replace(/^\.\//,'').replace(/\.ts$/,'');if(cache.has(id))return cache.get(id);const exports={};cache.set(id,exports);modules[id](require,exports);return exports;};const {openVocabulary}=require('browser');const {openListening}=require('listening');// Public demonstration only. Personal details are neither requested nor transmitted.
const mount=document.querySelector('[data-public-tools]');
let closePanel;
const openPanel=view=>{
 const parent=document.querySelector('.course-app'),scope='a1-public-pages-v1';
 const closed=()=>{if(closePanel===handle)closePanel=undefined;};
 const handle=view==='listen'?openListening(parent,scope,closed):openVocabulary(parent,scope,view,'',closed,()=>{
  closePanel=undefined;openPanel('listen');
 });
 closePanel=handle;
};
mount.addEventListener('click',event=>{
 const button=event.target.closest('[data-open-vocabulary]');
 if(!button||closePanel)return;
 document.dispatchEvent(new Event('mt-preview-vocab'));
 openPanel(button.dataset.openVocabulary);
});
const writing=document.querySelector('[data-writing]');
if(writing){
 const box=writing.querySelector('textarea'),notice=writing.querySelector('[role=status]'),check=writing.querySelector('button'),feedback=writing.querySelector('[data-writing-feedback]');
 const key='mundotalk-public-writing-v1:'+writing.dataset.writing;
 try{box.value=(localStorage.getItem(key)||'').slice(0,500);}catch{notice.textContent='Armazenamento indisponível.';}
 box.addEventListener('input',()=>{
  feedback.hidden=true;
  try{localStorage.setItem(key,box.value);notice.textContent='Rascunho guardado neste navegador.';}catch{notice.textContent='Não foi possível guardar o rascunho.';}
 });
 check.addEventListener('click',()=>{
  if(!box.value.trim()){box.focus();return;}
  feedback.hidden=false;feedback.focus();
 });
}
 })();