export class ProceduralAudio {
    ctx: AudioContext | null = null;
    isInitialized: boolean = false;
    currentType: string | null = null;
    pendingBGM: string | null = null;
    bgmAudio: HTMLAudioElement | null = null;

    constructor() {
        const init = () => {
            if (!this.ctx) {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    this.ctx = new AudioContextClass();
                    this.isInitialized = true;
                    if (this.pendingBGM) {
                        const t = this.pendingBGM;
                        this.currentType = null;
                        this.setBGM(t);
                    }
                }
            } else if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        };

        if (typeof window !== 'undefined') {
            document.addEventListener('click', init, { once: true });
            document.addEventListener('keydown', init, { once: true });

            document.addEventListener('mousedown', (e) => {
                const target = e.target as HTMLElement;
                const tag = target.tagName.toLowerCase();
                const cursor = window.getComputedStyle(target).cursor;
                if (tag === 'button' || tag === 'a' || cursor === 'pointer' || target.closest('button')) {
                    this.playClick();
                }
            });
        }
    }

    playTextBlip() {
        if (!this.isInitialized || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(800 + Math.random() * 500, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.03);

            gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch (e) {
            console.error(e);
        }
    }

    playClick() {
        if (!this.isInitialized || !this.ctx || this.ctx.state !== 'running') return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {
            console.error(e);
        }
    }

    setBGM(type: string | null) {
        if (this.currentType === type) return;
        this.currentType = type;
        this.pendingBGM = type;

        if (!this.isInitialized) return;

        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.src = '';
            this.bgmAudio = null;
        }

        if (type === 'lore') {
            this.bgmAudio = new Audio('/music/Ganga_Through_the_Machine.mp3');
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = 0.5;
            this.bgmAudio.play().catch(e => console.error('Audio play error:', e));
        } else if (type === 'game') {
            this.bgmAudio = new Audio('/music/Cold_Iron_Prayer.mp3');
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = 0.4;
            this.bgmAudio.play().catch(e => console.error('Audio play error:', e));
        }
    }

    stopBGM() {
        this.setBGM(null);
    }
}

export const audioManager = new ProceduralAudio();
