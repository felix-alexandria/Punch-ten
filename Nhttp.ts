import http, { IncomingMessage, ServerResponse } from "http"
import event from "events"

const port : number = 2005;

interface iData {
    id: number;
    name: string;
    phone: number;
    stack: string;
}

interface iMessage {
    message: string;
    success: boolean;
    data: null | {} | {}[]
}

const class08:iData[] = [
    {
        id: 1,
        name: "Jessica",
        phone: 9034526732,
        stack: "full-stack"
    },
    {
        id: 2,
        name: "Jemimah",
        phone: 98503456823,
        stack: "back-end"
    },
    {
        id: 3,
        name: "John",
        phone: 70948576234,
        stack: "half-stack"
    },
    {
        id: 4,
        name: "Luciana",
        phone: 9145628476,
        stack: "full-stack"
    },
    {
        id: 5,
        name: "Joanna",
        phone: 8076459034,
        stack: "full-stack"
    },
];

const server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) =>{
    res.setHeader("Content-Type", "Application/Json");
    const{method, url} = req;
    let status: number = 404;
    let response: iMessage = {
        message: "failed",
        success: false,
        data: null,
    };
    const container: any = []
    req.on("data", (chunk: any) =>{
        container.push(chunk);
    }).on("end", ()=>{
        //Get Method
        if(url === "/" && method === "GET"){
            status= 200;
            response.message="All class08 data gotten"
            response.success = true;
            response.data = class08;
            res.write(JSON.stringify({response, status}))
            res.end()
        }
        //POST Method
        if(url === "/" && method === "POST"){
            status = 201;
            const Body = JSON.parse(container);
            class08.push(Body);
            response.message = "Added successfully";
            response.success = true;
            response.data = class08;
            res.write(JSON.stringify({response, status}))
            res.end()
        }
    })
})

server.listen(port, () => {
    console.log("Server is up and running");
    
});