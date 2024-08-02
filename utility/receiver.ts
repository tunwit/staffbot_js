import { OpusEncoder } from "@discordjs/opus";
import { EndBehaviorType, type VoiceReceiver } from "@discordjs/voice";

class Receiver{
    receive:VoiceReceiver
    constructor(voicereceiver:VoiceReceiver){
        this.receive = voicereceiver
        this.receive.speaking.on("start",(userID:string)=>{
            console.log(userID);
            console.log(this.receive.speaking.users);
            

            
            if (!(userID in this.receive.speaking.users
            )){
                this.listen(userID)
                console.log("add listener");
                
            }   
        })
    }
    
    async listen(userID:string){
        let pcm = []
        let stream = this.receive.subscribe(userID,{
            end:{
                behavior:EndBehaviorType.Manual
            }
        })
        const encoder = new OpusEncoder( 48000, 2);
        stream.on("data",(chunk:Buffer)=>{
            // const encode = encoder.encode(chunk)
            // console.log(encode);
            // pcm.push(encode)
            // console.log(chunk);
            
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