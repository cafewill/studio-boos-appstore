export function createAudio() {
 let context=null,enabled=false,players=[],generation=0;
 function stop(){generation++;for(const node of players){try{node.stop();}catch{}}players=[];}
 return {
  setEnabled(value){enabled=value;if(!value)stop();}, stop,
  async play(notes=[{pitch:0,step:0}]){
   if(!enabled||globalThis.document?.hidden)return;
   stop();const started=generation;
   try{const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Audio)return;context??=new Audio();await context.resume();if(!enabled||document.hidden||started!==generation)return;
    const base=context.currentTime+.03;for(const note of notes.slice(0,64)){
     const o=context.createOscillator(),g=context.createGain();o.type=['sine','triangle','sine','triangle'][note.pitch%4];o.frequency.value=[262,330,392,523][note.pitch%4];o.connect(g);g.connect(context.destination);const t=base+Math.min(31,note.step)*.22;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.04,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.start(t);o.stop(t+.22);players.push(o);
    }
   }catch{/* 소리 없이 활동을 계속한다. */}
  }, destroy(){stop();context?.close().catch(()=>{});context=null;}
 };
}
