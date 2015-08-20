var net = require('net');

console.log('Server started\n');


var server = net.createServer(function(socket){	
	console.log('Client connected');
	socket.on('data', function(data){
		data = data.toString();
		var input = data.split('\r\n');
		
		for (var idx in input){
			var val = input[idx];
			if (val.length > 0){
				console.log('Data Received: ' + val + ' - Sending echo\n');
				if (val=='end'){
					socket.end();
					return null;
				}
				socket.write(val +'\r\n');
			}	
		}
		
		
	})
	socket.on('end', function(){
		socket.end();
	})
}).listen(5000);