import { EndBehaviorType, type VoiceReceiver } from "@discordjs/voice";
import { OpusApplication, OpusEncoder } from "audify";

class Receiver{
    receive:VoiceReceiver
    constructor(voicereceiver:VoiceReceiver){
        this.receive = voicereceiver
        this.receive.speaking.on("start",(userID:string)=>{
            this.listen(userID)
        })
    }
    
    async listen(userID:string){
        let pcm = []
        let stream = this.receive.subscribe(userID,{
            end:{
                behavior:EndBehaviorType.Manual
            }
        })
        const encoder = new OpusEncoder( 48000, 2, OpusApplication.OPUS_APPLICATION_VOIP);
        stream.on("data",(chunk)=>{
            const encode = encoder.encode(chunk,1920)
            console.log(encode);
            pcm.push(encode)
        })
        stream.on("end",()=>{
            console.log("end");   
        })

        stream.on("close",()=>{
            console.log("close");   
        })
    }
}

export default Receiver