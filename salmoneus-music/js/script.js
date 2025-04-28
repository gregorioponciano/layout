            // Elementos do DOM
            const modal = document.getElementById('player-modal');
            const miniPlayer = document.getElementById('mini-player');
            let isModalOpen = false;
            
            // Função para abrir o modal
            function openModal() {
                modal.style.display = 'flex';
                isModalOpen = true;
            }
            
            // Função para fechar o modal
            function closeModal() {
                modal.style.display = 'none';
                isModalOpen = false;
            }
            
            // Adiciona evento ao botão de fechar no modal
            document.querySelector('.close-btn').addEventListener('click', closeModal);
            
            // Adiciona evento ao mini player para reabrir o modal
            miniPlayer.addEventListener('click', () => {
                if (!isModalOpen) {
                    openModal();
                }
            });

document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const miniPlayBtn = document.getElementById('mini-play-btn');
    const miniNextBtn = document.getElementById('mini-next-btn');
    const miniPlayer = document.getElementById('mini-player');

    
    // Estado do player
    let currentPlaylist = [];
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isRepeat = false;
    let isShuffle = false;
    let currentArtist = '';
    let isModalOpen = false;
    
    // Biblioteca de músicas
    const musicLibrary = {
        'Racionais': {
            artist: 'Racionais',
            cover: 'images/rap/album-racionais.jpg',
            tracks: [
                { name: 'Eu Sou 157', src: 'music/rap/racionais/eusou157.mp3', duration: '3:45' },
                { name: 'Capítulo 4, Versículo 3', src: 'music/rap/racionais/capitulo4.mp3', duration: '4:20' },
                { name: 'Diário de Um Detento', src: 'music/rap/racionais/diario.mp3', duration: '5:12' }
            ]
        },
        'Realidade Cruel': {
            artist: 'Realidade Cruel',
            cover: 'images/rap/album-realidade-cruel.jpg',
            tracks: [
                { name: 'Quem Sabe Um Dia', src: 'music/rap/realidade-cruel/quem-sabe-um-dia.mp3', duration: '6:04' },
                { name: 'Depoimento De Um Viciado', src: 'music/rap/realidade-cruel/depoimento-de-um-viciado.mp3', duration: '6:39' },
                { name: 'O Resgate', src: 'music/rap/realidade-cruel/o-resgate.mp3', duration: '6:55' },
                { name: 'Vale Da Escuridâo 2', src: 'music/rap/realidade-cruel/vale-da-escuridao.mp3', duration: '6:53' }
            ]
        },
        'Faccao-Central': {
            artist: 'Facção Central',
            cover: 'images/rap/album-facçao-central.jpg',
            tracks: [
                { name: 'Assalto A Banco', src: 'music/rap/facçao/assalto-a-banco.mp3', duration: '6:10' },
                { name: 'Desculpa Mãe', src: 'music/rap/facçao/desculpa-mae.mp3', duration: '5:56' },
                { name: '12 De Outubro', src: 'music/rap/facçao/12-de-outubro.mp3', duration: '5:23' }
            ]
        },
        'Dexter': {
            artist: 'Dexter',
            cover: 'images/rap/album-dexter.jpg',
            tracks: [
                { name: 'Saudades Mil', src: 'music/rap/dexter/saudades-mil.mp3', duration: '8:44' },
                { name: 'Oitavo Anjo', src: 'music/rap/dexter/oitavo-anjo.mp3', duration: '5:27' }
            ]
        },
        'Sabotage': {
            artist: 'Sabotage',
            cover: 'images/rap/album-sabotage.jpg',
            tracks: [
                { name: 'Um Bom Lugar', src: 'music/rap/sabotage/um-bom-lugar.mp3', duration: '5:38' },
                { name: 'Rap É Compromisso', src: 'music/rap/sabotage/rap-e-compromisso.mp3', duration: '4:23' },
                { name: 'Zona Sul', src: 'music/rap/sabotage/zona-sul.mp3', duration: '5:14' },
                { name: 'Respeito É Pra Quem Tem', src: 'music/rap/sabotage/respeito-e-pra-quem-tem.mp3', duration: '5:29' },
                { name: 'No Brooklin', src: 'music/rap/sabotage/no-brooklin.mp3', duration: '5:46' },
                { name: 'Cocaina', src: 'music/rap/sabotage/cocaina.mp3', duration: '4:58' }
            ]
        },
        'Mv Bill': {
            artist: 'Mv Bill',
            cover: 'images/rap/album-mv-bill.jpg',
            tracks: [
                { name: 'Falcao', src: 'music/rap/mv-bill/falcao.mp3', duration: '4:27' },
                { name: 'Estilo Vagabundo', src: 'music/rap/mv-bill/estilo-vagabundo.mp3', duration: '5:00' }
            ]
        }
    };

    // Carrega artistas e álbuns
    const artistaGrid = document.querySelector('.artista-grid');
    const albumGrid = document.querySelector('.album-grid');
    
    for (const [key, artist] of Object.entries(musicLibrary)) {
        // Card do artista
        const artistCard = document.createElement('div');
        artistCard.classList.add('artista-card');
        artistCard.innerHTML = `
            <img src="${artist.cover}" alt="${artist.artist}">
            <h3>${artist.artist}</h3>
            <p>${artist.artist}</p>
             <p>${artist.tracks.length} músicas</p>
        `;
        artistCard.addEventListener('click', () => loadArtist(key));
        artistaGrid.appendChild(artistCard);

        // Card do álbum
        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card');
        albumCard.innerHTML = `
            <img src="${artist.cover}" alt="${artist.artist}">
            <h3>${artist.artist} - Hits</h3>
            <p>${artist.artist}</p>
        `;
        albumCard.addEventListener('click', () => loadArtist(key));
        albumGrid.appendChild(albumCard);
    }

    // Funções principais
    function loadArtist(artistKey) {
        currentArtist = artistKey;
        currentPlaylist = [...musicLibrary[artistKey].tracks];
        currentTrackIndex = 0;
        loadTrack(currentTrackIndex);
        if (!isModalOpen) openModal();
    }

    function loadTrack(index) {
        const track = currentPlaylist[index];
        const artist = musicLibrary[currentArtist];
        
        // Atualiza modal
        document.getElementById('modal-cover').src = artist.cover;
        document.getElementById('modal-title').textContent = track.name;
        document.getElementById('modal-artist').textContent = artist.artist;
        durationEl.textContent = track.duration;
        
        // Atualiza mini player
        document.getElementById('mini-cover').src = artist.cover;
        document.getElementById('mini-title').textContent = track.name;
        document.getElementById('mini-artist').textContent = artist.artist;
        miniPlayer.style.display = 'flex';
        
        // Carrega áudio
        audioPlayer.src = track.src;
        audioPlayer.load();
        
        if (isPlaying) {
            audioPlayer.play()
                .then(() => updatePlayButton())
                .catch(e => console.error("Erro ao reproduzir:", e));
        }
    }

    function playTrack() {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                updatePlayButton();
            })
            .catch(e => console.error("Erro ao reproduzir:", e));
    }

    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayButton();
    }

    function togglePlay() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }

    function updatePlayButton() {
        const icon = isPlaying ? 'pause' : 'play_arrow';
        playBtn.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
        miniPlayBtn.innerHTML = icon;
    }

    function nextTrack() {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * currentPlaylist.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
        }
        loadTrack(currentTrackIndex);
        if (isPlaying) playTrack();
    }

    function prevTrack() {
        if (audioPlayer.currentTime > 3) {
            // Se já passou 3 segundos, volta para início da mesma música
            audioPlayer.currentTime = 0;
        } else {
            // Senão, vai para música anterior
            currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
            loadTrack(currentTrackIndex);
            if (isPlaying) playTrack();
        }
    }

    function toggleRepeat() {
        isRepeat = !isRepeat;
        audioPlayer.loop = isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
    }

    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    }

    function openModal() {
        isModalOpen = true;
        document.getElementById('player-modal').style.display = 'flex';
    }

    function closeModal() {
        isModalOpen = false;
        document.getElementById('player-modal').style.display = 'none';
    }

    function updateProgress() {
        const { duration, currentTime } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Formata o tempo
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Atualiza a duração se ainda não estiver definida
        if (durationEl.textContent === '0:00' && !isNaN(duration)) {
            durationEl.textContent = formatTime(duration);
        }
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    repeatBtn.addEventListener('click', toggleRepeat);
    shuffleBtn.addEventListener('click', toggleShuffle);
    miniPlayBtn.addEventListener('click', togglePlay);
    miniNextBtn.addEventListener('click', nextTrack);
    progressBar.addEventListener('click', setProgress);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        if (!isRepeat) nextTrack();
    });
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    // Controles globais
    window.toggleSidebar = function() {
        const sidebar = document.querySelector('.blibliotecas');
        sidebar.style.marginLeft = sidebar.style.marginLeft === '-100vw' ? '0' : '-100vw';
    };
});