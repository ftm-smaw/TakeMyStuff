export class message {
    key: string;
    sender_username: string;
    message_content: string;
 
    constructor(key: string, sender_username: string, content: string) {
        this.key = key;
        this.sender_username = sender_username;
        this.message_content = content;
    }
}

export class chat_session{
    key: string;
    allmessages: message[];

    constructor(key: string, messages: message[]){
        this.key = key;
        this.allmessages = messages;
    }
}

