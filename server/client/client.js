const   net     =   require('net'),
        prompt  =   require('prompt');

const   PORT    = 1723,
        ID      = Math.floor(Math.random()*50);

var position={x: 0, y: 0, dir: Math.floor(Math.random()*4)};
var pathToNextTask=[]; 

prompt.start();

var client = net.connect(PORT, 'localhost', ()=>{
    console.log('connected to server');
    client.setNoDelay();
    //sendSth();
});

client.setEncoding('utf8');

client.on('error', ()=>{
    console.log("Something went wrong with the server. Quitting.");
})

function moveForward(){
    switch(position.dir){
        case 0: position.x--; break;
        case 1: position.y++; break;
        case 2: position.x++; break;
        case 3: position.y--;
    }
}

client.on('data', (data)=>{
    let msg=data.toString().trim();
    console.log("Received:"+msg);
    /* if(msg==='ALIVE'){
        client.write("yes I am "+ID+"\n", ()=>{
            console.log('response sent');
        });
    }
    else{
        console.log(data.toString().trim()+' is != ALIVE');
    } */
    // client.end();

    switch(msg){
        case "HELLO": 
            client.write('Hello'); break;
        case "ALIVE": 
            client.write("POS,"+position.x+','+position.y+','+position.dir+';', ()=>{
                if(pathToNextTask.length==0){
                    client.write("PATH;");
                }
            });
            break;
        // case "MAP":
        // COMANDO:V1,V2,V3;PATH:X1,Y2,X2,Y2

            
        default: 
            console.log("Unrecognized message from server");
    }
    /* if(pathToNextTask.length==0){
        client.write("PATH;");
    } */

    client.write("\n", ()=>{
        console.log('response sent');
        moveForward();
    });
});
 
 client.on('end', ()=>{ 
    console.log('disconnected from server');
});

client.on('close', ()=>{
    console.log('Socket is fully closed now.');
})

/* setInterval(function() {
  console.log("Writing....")
  var ret = client.write('Hello from node.js\n');
  console.log("Wrote", ret)
}, 1000); */

function sendSth(){
    prompt.get(['first', 'last'], (err, res)=>{
        if (err) { return onErr(err); }
        //console.log('Command-line input received:');
        //console.log('  Username: ' + result.username);
        //console.log('  Email: ' + result.email);
        client.write(res.first+" "+res.last+'\n');
    });    
}

function onErr(err) {
    console.log(err);
    return 1;
}
