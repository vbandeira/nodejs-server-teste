function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function sendMessage(message){
	var net = require('net');
	
	var client = net.createConnection(5000, 'localhost', function(){
		console.log('==========\nConnected!\n==========\n');
		client.write(message);
		//client.write('Message 1\r\n');
		// sleepFor(1000);
		// client.write('Message 2\r\n');
		// sleepFor(1000);
		// client.write('Message 3\r\n');
		// //client.write('end\r\n');
		// sleepFor(1000);
		client.end();
	});
	
	client.on('data', function(data){
		data = data.toString();
		var results = data.split('\r\n');
		for (var idx in results){
			var value = results[idx];
			if (value.length > 0 )
				console.log('Received: ' + value);	
		}
		
	})
	
	client.on('end', function(){
		console.log('\n============\nDisconnected\n============\n');
	})
}

for (var i=1; i<=3; ++i){
	sendMessage('Message ' + i + '\r\n');
	sleepFor(2000);
}